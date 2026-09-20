# Ansible

Terraform should provision infrastructure. Ansible should configure a normal EC2 utility/load-generator host.

This lab deliberately does NOT use Ansible to mutate EKS managed worker nodes. EKS managed node groups are managed through AWS/EKS and Terraform. If you need OS-level configuration of Kubernetes worker nodes, use a self-managed node group and Ansible, but that adds operational complexity.

Example:

```bash
cp inventory.ini.example inventory.ini
# replace LOAD_GENERATOR_PUBLIC_IP

ansible-playbook -i inventory.ini playbook.yml
```
