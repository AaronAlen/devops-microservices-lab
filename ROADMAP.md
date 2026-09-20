# 5-Day Hands-on Roadmap

## Day 1 — Microservices + Docker
1. Run each service directly.
2. Confirm ports 3001, 3002, 3003 and gateway 8080.
3. Read each Dockerfile.
4. `docker compose up --build`.
5. Stop one service and observe gateway failures.
6. Rebuild one image after a code change.

Outcome: understand service isolation and container images.

## Day 2 — Kubernetes
1. Create local cluster.
2. Apply namespace and deployments.
3. Learn Pod, Deployment and Service.
4. Install Metrics Server.
5. Run `kubectl top pods`.
6. Apply HPAs.
7. Watch `kubectl get hpa -w` and `kubectl get pods -w`.

Outcome: understand replicas and HPA.

## Day 3 — Real autoscaling
1. Run k6 against `/api/orders`.
2. Increase virtual users.
3. Watch CPU rise.
4. Watch HPA increase replicas.
5. Stop k6.
6. Watch HPA eventually reduce replicas.

Important: HPA needs resource requests and Metrics API. Kubernetes documents that HPA uses Metrics API data for automatic scaling.

Outcome: demonstrate 1 -> 2 -> 3 -> ... pods and scale-down.

## Day 4 — AWS + Terraform
1. Configure AWS CLI.
2. `terraform init`.
3. `terraform plan`.
4. Review VPC/EKS/ECR resources.
5. `terraform apply`.
6. Configure kubectl.
7. Push images to ECR.
8. Deploy to EKS.

Outcome: understand IaC and AWS Kubernetes.

## Day 5 — CI/CD + Ansible
1. Create GitHub OIDC IAM role.
2. Add `AWS_GITHUB_ROLE_ARN` repository variable.
3. Push to main.
4. GitHub Actions tests services.
5. Builds four images.
6. Pushes images to ECR.
7. Updates Kubernetes deployments.
8. Use Terraform for infrastructure.
9. Use Ansible to configure the EC2 load-generator.
10. Generate load against the AWS gateway and observe HPA.

Outcome: full chain:
Git push -> CI -> Docker -> ECR -> EKS -> HPA.
