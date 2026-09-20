# DevOps Microservices Lab — Docker + Kubernetes + AWS + Terraform + Ansible + CI/CD

A ready-to-explore learning project with three independent Node.js microservices and an API gateway.

## Architecture

Internet -> AWS ALB/Ingress -> API Gateway -> users/orders/inventory services
                                      |
                                      +-> PostgreSQL (optional extension)

Each service runs in its own Docker image and Kubernetes Deployment.

Autoscaling:
- Kubernetes HPA scales each service from 1 to 5 replicas.
- Metrics Server provides CPU metrics.
- k6 generates load for the load-test workflow.
- For AWS EKS, the cluster/node infrastructure is provisioned with Terraform.

CI/CD:
- GitHub Actions runs tests, builds images, and pushes to ECR.
- Deployment is done with Kubernetes manifests.
- AWS authentication uses GitHub OIDC; no long-lived AWS keys are required.

Infrastructure:
- Terraform provisions VPC, EKS, ECR, and an optional EC2 load-generator host.
- Ansible configures the EC2 load-generator host with Docker and k6.
- EKS worker nodes are managed by EKS/Terraform rather than Ansible. This is intentional: Kubernetes pods are the scalable application units.

## Local quick start

Requirements:
- Docker Desktop
- Docker Compose
- kubectl
- kind or Docker Desktop Kubernetes
- Node.js 20+

Run:

```bash
docker compose up --build
```

Gateway:
http://localhost:8080/health

Try:
http://localhost:8080/api/users
http://localhost:8080/api/orders
http://localhost:8080/api/inventory

## Kubernetes local lab

Enable Kubernetes in Docker Desktop or create a kind cluster.

Install Metrics Server (for a local cluster where the standard manifest works):

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

For Docker Desktop/kind lab environments, Metrics Server may need the insecure kubelet TLS option. Check your cluster before changing it.

Deploy:

```bash
kubectl apply -f k8s/
kubectl get pods
kubectl get hpa
```

Generate load:

```bash
# Install k6 from https://k6.io/
k6 run loadtest/k6.js
```

Watch scaling:

```bash
kubectl get hpa -w
kubectl get pods -w
kubectl top pods
```

The services have CPU requests and HPA targets so CPU-based scaling can be demonstrated.

## AWS

Important: Amazon EKS itself has a cluster fee. Current AWS documentation lists standard EKS cluster pricing at $0.10/hour, plus EC2/EBS/public IPv4 and other resource costs. Your AWS Free Plan can use its credits for eligible charges, but EKS should not be treated as a permanently free service. Stop/destroy the environment when finished.

Typical sequence:

1. Configure AWS CLI.
2. Configure Terraform variables.
3. `terraform init`
4. `terraform plan`
5. `terraform apply`
6. Configure kubectl for EKS.
7. Install Metrics Server.
8. Apply Kubernetes manifests.
9. Configure GitHub OIDC/ECR workflow secrets/variables.
10. Push to `main`.
11. GitHub Actions builds and pushes service images.
12. Kubernetes Deployment is updated.

Destroy when finished:

```bash
terraform destroy
```

## Ansible

Terraform creates an optional EC2 load-generator host. Ansible configures it.

```bash
cd ansible
ansible-playbook -i inventory.ini playbook.yml
```

The host gets Docker and k6. Use it to generate controlled traffic against the public gateway.

## Production extension ideas

- Replace direct service routing with AWS Load Balancer Controller + ALB.
- Add Redis/PostgreSQL.
- Add Prometheus/Grafana.
- Add Trivy image scanning.
- Add Argo CD GitOps.
- Add Cluster Autoscaler/Karpenter for node-level scaling.
- Add TLS with ACM.
