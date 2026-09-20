# 🚀 DevOps Microservices & Kubernetes Autoscaling — Lab Guide
*(நம்ம பாணியில் எளிமையான, Friendly தமிழ் வழிகாட்டி! 😎)*

---

## 🎯 1. சுருக்கமா சொல்லணும்னா... நாம என்ன பண்ணோம்?
இந்த லேப்ல நாம சாதிச்ச முக்கியமான விஷயம்:
* **4 Node.js மைக்ரோசர்வீஸ்களை** Docker container-ஆ மாத்தினோம்.
* அவற்றை **Kubernetes (K8s) கிளஸ்டர்ல** ஏற்றி வெற்றிகரமா Deploy பண்ணோம்.
* திடீர்னு அதிகமான டிராஃபிக் (High Load) வரும்போது, **HPA (Autoscaler)** எப்படி தானாகவே **1 Pod-ஐ 5 Pods-ஆ பெருக்குது (Scale Up)**, அப்புறம் டிராஃபிக் நின்னதும் எப்படி அமைதியா **பழையபடி 1 Pod-க்கு குறையுது (Scale Down)**-னு Live-ஆ டெஸ்ட் பண்ணி பார்த்தோம்!

---

## 🏛️ 2. சிஸ்டம் கட்டமைப்பு (Architecture)

```text
       [ டிராஃபிக் அனுப்பிய k6 லோட் டெஸ்ட் ]
                       │
                       ▼ (Port 8080)
            ┌─────────────────────┐
            │     API Gateway     │  <-- வெளி உலகத்துக்கு இது மட்டும்தான் தெரியும்!
            └──────────┬──────────┘
                       │
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
   ┌───────────┐ ┌───────────┐ ┌───────────┐
   │   Users   │ │  Orders   │ │ Inventory │
   │ (Port 3001)│ │ (Port 3002)│ │ (Port 3003)│
   └───────────┘ └───────────┘ └───────────┘
```

* **API Gateway:** மெயின் கேட் மாதிரி. வெளியில இருந்து வர்ற எல்லா requests-ஐயும் வாங்கி கரெக்டான மைக்ரோசர்வீஸுக்கு (`/api/users`, `/api/orders`, `/api/inventory`) அனுப்பி வைக்கும்.
* **Users, Orders, Inventory:** தங்களுக்கு ஒதுக்கப்பட்ட வேலையை மட்டும் அமைதியா செய்யுற தனித்தனி மைக்ரோசர்வீஸ்கள்.

---

## 🛠️ 3. ஸ்டெப்-பை-ஸ்டெப் நாம பண்ணின வேலைகள்

### Step 1: Docker Compose வச்சு லோக்கல்ல ஓட வச்சோம்
முதல்ல எல்லா சர்வீஸும் ஒழுங்கா வேலை செய்யுதான்னு பார்க்க Docker Compose-ஐ run பண்ணோம்:
```bash
docker compose up --build
```
பிரவுசர்ல `http://localhost:8080/health` போய் பார்த்ததும் `{"service":"gateway","status":"ok"}`-னு பக்காவா பதில் வந்துச்சு!

---

### Step 2: K8s-க்காக Docker Images பில்ட் பண்ணோம்
Docker Desktop உள்ளே இருக்கிற Kubernetes கிளஸ்டருக்கு புரியுற மாதிரி, 4 சர்வீஸுக்கும் `:local` டேக் வச்சு இமேஜ் பில்ட் பண்ணோம்:
```powershell
docker build -t gateway:local services/gateway
docker build -t users:local services/users
docker build -t orders:local services/orders
docker build -t inventory:local services/inventory
```

---

### Step 3: K8s YAML ஃபைல்ஸ் மாத்தி Deploy பண்ணோம்
`k8s/` ஃபோல்டர்ல இருந்த YAML ஃபைல்ஸ்ல `REPLACE_*_IMAGE`-ஐ எடுத்துட்டு:
* `image: <service>:local`
* `imagePullPolicy: IfNotPresent` (இணையத்துல தேடாம லோக்கல் இமேஜையே எடுத்துக்கோன்னு சொன்னோம்)

அப்புறம் கிளஸ்டர்ல deploy பண்ணோம்:
```powershell
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/users.yaml -f k8s/orders.yaml -f k8s/inventory.yaml -f k8s/gateway.yaml
```
Deployments, Services, HPA எல்லாமே `Running` ஆகிடுச்சு!

---

### Step 4: Metrics Server போட்டு CPU பிரச்சனைய சரி பண்ணோம்
HPA-ல `cpu: <unknown>/50%`-னு வந்து நின்னுச்சு. ஏன்னா K8s-க்கு Pods எவ்வளவு CPU யூஸ் பண்ணுதுன்னு அளக்க **Metrics Server** தேவைப்பட்டுச்சு.

1. **Metrics Server போட்டோம்:**
   ```powershell
   kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
   ```
2. **லோக்கல் TLS Patch போட்டோம் (CMD வழியா):**
   ```cmd
   kubectl patch deployment metrics-server -n kube-system --type="json" -p "[{\"op\":\"add\",\"path\":\"/spec/template/spec/containers/0/args/-\",\"value\":\"--kubelet-insecure-tls\"}]"
   ```
அவ்வளவுதான்! `<unknown>` போயிட்டு **`cpu: 1%/50%`**-னு live CPU ரீடிங் வர ஆரம்பிச்சிருச்சு!

---

### Step 5: k6 லோட் டெஸ்ட் & Live Autoscaling மேஜிக்! 🔥

3 Terminal-ஐ திறந்து வச்சு செமயா டெஸ்ட் பண்ணோம்:

1. **Terminal 1 (Port-Forward):** Gateway-ஐ நம்ம லேப்டாப்போட இணைச்சோம்:
   ```powershell
   kubectl port-forward -n microservices svc/gateway 8080:80
   ```
2. **Terminal 2 (HPA Live Watch):** HPA என்ன பண்ணுதுன்னு வேடிக்கை பார்த்தோம்:
   ```powershell
   kubectl get hpa -n microservices -w
   ```
3. **Terminal 3 (k6 Traffic Blast):** டிராஃபிக்கை உள்ளே பாய்ச்சினோம்:
   ```powershell
   k6 run loadtest/k6.js
   ```

---

## 📊 4. லைவா நாம் பார்த்த மரண மாஸ் ரிசல்ட்ஸ்!

| ஸ்டேஜ் (Stage) | என்ன நிலைமை? | CPU பயன்பாடு | Pods Replicas எண்ணிக்கை | பின்னணியில் என்ன நடந்துச்சு? |
| :--- | :--- | :--- | :--- | :--- |
| **ஆரம்பத்துல** | டிராஃபிக் இல்ல (Idle) | `0% - 1%` | **1 Pod** per service | எல்லாம் அமைதியா இயங்கிட்டு இருந்துச்சு (மொத்தம் 4 Pods). |
| **Peak Load போது** | k6 வழியா 60 பேர் உள்ளே நுழைஞ்சாங்க | **`96% ➔ 220%`** 💥 | **5 Pods** per service 🚀 | **Scale Up:** CPU 50%-ஐ தாண்டியதும் K8s டக்குனு Pods-ஐ 5-க்கு ஏத்திருச்சு (மொத்தம் 12 Pods)! |
| **டெஸ்ட் முடிஞ்சதும்** | டிராஃபிக் 0 ஆச்சு | **`0%`** 📉 | **1 Pod** per service | **Scale Down:** வேலை முடிஞ்சதும் தேவையில்லாத 8 Pods-ஐ K8s தானா Terminate பண்ணிடுச்சு! |

---

## 💡 5. எப்பவும் ஞாபகம் வச்சுக்க வேண்டிய Commands (Cheat Sheet)

* **Pods நிலைமையை பார்க்க:** `kubectl get pods -n microservices`
* **Services & Ports பார்க்க:** `kubectl get svc -n microservices`
* **HPA Live-ஆ வாட்ச் பண்ண:** `kubectl get hpa -n microservices -w`
* **Pod-ஓட CPU/RAM அளவை பார்க்க:** `kubectl top pods -n microservices`
* **லோட் டெஸ்ட் ஆரம்பிக்க:** `k6 run loadtest/k6.js`
* **லேப் முடிஞ்சதும் Clean-up பண்ண:** `kubectl delete -f k8s/`
