# 🛠️ DevOps Tools, Softwares & Files Reference
*(இந்த லேப்ல நமக்கு உதவி பண்ணின Softwares & Files-ஓட ஜாலி Reference! 😎)*

---

## 💻 1. நாம் பயன்படுத்திய Softwares & Tools (Tools Table)

| Software / Tool | எதுக்காக இந்த Tool? (Category) | Version | இந்த லேப்ல இது என்ன வேலை பாத்துச்சு? (Role) | இது ஏன் கண்டிப்பா வேணும்? (Why do we need it?) |
| :--- | :--- | :--- | :--- | :--- |
| **Docker Desktop** | Container Engine | v4.91 / v29.8 | 4 மைக்ரோசர்வீஸ்களையும் தனித்தனி Docker images-ஆ build பண்ணி container-ஆ ஓட வச்சது. | எந்த computer-லயும் dependency பிரச்சனை இல்லாம code ரன் ஆக Containerization ரொம்ப முக்கியம். |
| **Kubernetes (kind)** | Container Orchestrator | v1.36.1 | நம்ம Pods-ஐ manage பண்ணி, டிராஃபிக் வந்ததும் தானா scale up/down பண்ணின **முக்கியமான Boss** இதுதான்! | 100 கணக்கான containers-ஐ மனுஷனால மேனுவலா manage பண்ண முடியாது, K8s-தான் அதை தானா பாத்துக்கும். |
| **kubectl** | K8s Remote Control (CLI) | v1.36.1 | நம்ம Terminal-ல இருந்து K8s கிளஸ்டருக்கு command போட்டு வேலை வாங்குன **ரிமோட் கண்ட்ரோல்**. | `kubectl` இல்லாம நம்மளால K8s கிளஸ்டர் கூட பேசவே முடியாது. |
| **Node.js & Express** | App Runtime & Framework | Node v20 (Alpine) | Gateway, Users, Orders, Inventory சர்வீஸ்களோட API logic-ஐ ரன் பண்ணின இன்ஜின். | மைக்ரோசர்வீஸ் கோடை எழுதவும், REST API endpoints உருவாக்கவும் இது பயன்பட்டது. |
| **Metrics Server** | K8s-ஓட கண் (Monitoring Addon)| v0.7+ | ஒவ்வொரு Pod-ம் எவ்வளவு CPU, RAM யூஸ் பண்ணுதுன்னு அளந்துட்டே இருந்துச்சு. | இது இல்லைன்னா HPA குருடாயிடும் (`<unknown>`-னே காட்டும்). Autoscaling நடக்கவே நடக்காது! |
| **k6 (Grafana Labs)** | Traffic Generator (Load Tester)| v2.2.0 | குறுகிய நேரத்துல 60 விர்ச்சுவல் யூசர்ஸை உள்ளே அனுப்பி **டிராஃபிக் ஜாமை உருவாக்கிச்சு**. | HPA நிஜமாவே தானா scale ஆகுதான்னு செக் பண்ண டிராஃபிக்கை ஏத்துற வில்லன் டூல் இது! |
| **CMD / PowerShell** | Windows Command Line | 5.1 / CMD | நாம commands தட்டவும், live logs-ஐ 3 screens-ல வச்சு வேடிக்கை பார்க்கவும் உதவுச்சு. | DevOps Engineer-ஓட மெயின் ஆயுதமே Terminal தான். |
| **Visual Studio Code** | Code Editor | v1.90+ | YAML ஃபைல்ஸ்ல இமேஜ் பெயர்களை மாத்தவும், கோடுகளைப் பார்க்கவும் பயன்பட்டது. | Config ஃபைல்களை சுலபமா திருத்த உதவுச்சு. |

---

## 📁 2. நம்ம Project Files என்னென்ன வேலை பாத்துச்சு? (Files Table)

| கோப்பின் பெயர் (File Path) | ஃபைல் வகை | இந்த ஃபைலோட வேலை என்ன? | ஒருவேளை இந்த ஃபைல் இல்லன்னா என்ன ஆகும்? |
| :--- | :--- | :--- | :--- |
| [docker-compose.yml](file:///c:/Users/aaron/Downloads/devops-microservices-lab/docker-compose.yml) | Docker Compose | ஒரே ஒரு command-ல 4 சர்வீஸையும் ஒண்ணா லோக்கல்ல ஓட வச்சது. | ஒவ்வொரு சர்வீஸையும் தனித்தனியா build பண்ணி, network create பண்ணி ரொம்ப கஷ்டப்பட வேண்டியிருக்கும். |
| [services/gateway/Dockerfile](file:///c:/Users/aaron/Downloads/devops-microservices-lab/services/gateway/Dockerfile) | Dockerfile | Gateway-க்கான Node.js alpine இமேஜை உருவாக்கின ரெசிபி. | Gateway-வை container-ஆ மாத்தவே முடியாது. |
| [services/gateway/src/server.js](file:///c:/Users/aaron/Downloads/devops-microservices-lab/services/gateway/src/server.js) | Node.js Code | வெளியில இருந்து வர்ற டிராஃபிக்கை மத்த 3 சர்வீஸுக்கு பிரிச்சு அனுப்புற டிராஃபிக் போலீஸ்! | மைக்ரோசர்வீஸ்கள் தங்களுக்குள்ள மட்டும் பேசும், வெளி உலகத்துக்கு ஒரு பொதுவான entry point இருக்காது. |
| [services/orders/src/server.js](file:///c:/Users/aaron/Downloads/devops-microservices-lab/services/orders/src/server.js) | Node.js Code | ஆர்டர் விவரங்களை தர்ற சர்வீஸ். லோட் டெஸ்ட்ல **அடி வாங்குன ஹீரோ** இவர்தான்! | லோட் டெஸ்ட் பண்ணும்போது டிராஃபிக்கை வாங்கி CPU ஏத்த சர்வீஸ் இருக்காது. |
| [services/users/src/server.js](file:///c:/Users/aaron/Downloads/devops-microservices-lab/services/users/src/server.js) | Node.js Code | யூசர் விவரங்களை தர்ற மைக்ரோசர்வீஸ். | User data endpoint வேலை செய்யாது. |
| [services/inventory/src/server.js](file:///c:/Users/aaron/Downloads/devops-microservices-lab/services/inventory/src/server.js) | Node.js Code | சரக்கு ஸ்டாக் விவரங்களை தர்ற மைக்ரோசர்வீஸ். | Inventory data endpoint வேலை செய்யாது. |
| [k8s/namespace.yaml](file:///c:/Users/aaron/Downloads/devops-microservices-lab/k8s/namespace.yaml) | K8s Config | நம்ம மைக்ரோசர்வீஸ்களுக்கு `microservices`னு ஒரு தனி ஏரியாவை ஒதுக்கி தந்துச்சு. | மத்த system pods கூட நம்ம pods கலந்து போய் குழப்பம் உண்டாகும். |
| [k8s/gateway.yaml](file:///c:/Users/aaron/Downloads/devops-microservices-lab/k8s/gateway.yaml) | K8s Manifest | Gateway Pod, LoadBalancer Service, அப்புறம் **HPA Autoscaler (50% CPU)** விதிகளை செட் பண்ணுச்சு. | கேட்வே K8s-ல ஓடாது; டிராஃபிக் வரும்போது தானா 5 போட்ஸா எகிறாது! |
| [k8s/orders.yaml](file:///c:/Users/aaron/Downloads/devops-microservices-lab/k8s/orders.yaml) | K8s Manifest | Orders Pod, Service மற்றும் Orders **HPA Autoscaler**-ஐ செட் பண்ணுச்சு. | ஆர்டர் சர்வீஸும் ஆட்டோஸ்கேல் ஆகாம 1 போட்லயே நின்று crash ஆகிடும். |
| [k8s/users.yaml](file:///c:/Users/aaron/Downloads/devops-microservices-lab/k8s/users.yaml) | K8s Manifest | Users Deployment & Service-ஐ செட் பண்ணுச்சு. | Users சர்வீஸ் K8s-ல இயங்காது. |
| [k8s/inventory.yaml](file:///c:/Users/aaron/Downloads/devops-microservices-lab/k8s/inventory.yaml) | K8s Manifest | Inventory Deployment & Service-ஐ செட் பண்ணுச்சு. | Inventory சர்வீஸ் K8s-ல இயங்காது. |
| [loadtest/k6.js](file:///c:/Users/aaron/Downloads/devops-microservices-lab/loadtest/k6.js) | k6 Script | 5 ➔ 30 ➔ 60-னு படிப்படியா ஆட்களை ஏத்தி ஆர்டர் சர்வீஸ் CPU-வை 220%-க்கு எகிற வச்ச ஸ்கிரிப்ட்! | ஆட்டோஸ்கேலிங்கை டெஸ்ட் பண்ண டிராஃபிக்கை அனுப்பவே முடியாது. |

---

## 🔄 3. எந்தெந்த டூல்ஸ், எந்தெந்த ஃபைல்ஸ் கூட சேர்ந்து வேலை செஞ்சுச்சு? (Workflow Flow)

| ஸ்டேஜ் (Stage) | களத்தில் இறங்கிய Software | பயன்படுத்திய Files | கிடைத்த லைவ் ரிசல்ட் (Outcome) |
| :--- | :--- | :--- | :--- |
| **1. Docker Build** | Docker Engine | `Dockerfile`, `docker-compose.yml` | 4 மைக்ரோசர்வீஸ்களும் லோக்கல் Docker Images-ஆ ரெடி ஆச்சு! |
| **2. K8s Deployment** | kubectl & Docker-Desktop | `namespace.yaml`, `*.yaml` | கிளஸ்டர்ல Pods, Services, HPA எல்லாமே `Running` நிலைக்கு வந்துடுச்சு. |
| **3. Metric Fix** | kubectl (CMD வழியா) | Metrics Server Manifest & Patch | CPU % டேட்டா கிடைக்க ஆரம்பிச்சது (`cpu: 1%/50%`). |
| **4. Traffic Blast** | k6 Load Tester | `loadtest/k6.js` | ஆயிரக்கணக்கான requests Gateway வழியா ஆர்டர் சர்வீஸுக்கு பாய்ஞ்சுச்சு. |
| **5. Autoscaling கூத்து!**| K8s HPA Controller | `gateway.yaml` & `orders.yaml` | CPU 96% தாண்டினதும், தானா போட்ஸ் **1-லிருந்து 5-ஆ ஏறிச்சு (Scale Up)**; டிராஃபிக் குறைந்ததும் தானா **1-க்கு வந்துச்சு (Scale Down)**! |
