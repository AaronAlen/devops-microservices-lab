# Terraform

This provisions:
- VPC
- public/private subnets
- NAT gateway
- EKS control plane
- EKS managed node group
- four ECR repositories

The EKS cluster has a real AWS control-plane charge and the node group, EBS, NAT gateway and public IPs can also cost money. Use your AWS Free Plan credits carefully and destroy the stack when finished.

Before apply:

```bash
terraform init
terraform plan
terraform apply
```

Afterward:

```bash
aws eks update-kubeconfig --region ap-south-1 --name microservices-lab
kubectl get nodes
```

Destroy:

```bash
terraform destroy
```
