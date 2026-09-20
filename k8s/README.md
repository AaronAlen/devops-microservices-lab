# Kubernetes lab

Replace image placeholders with ECR or local image names before applying.

For a local kind cluster, build images and load them into kind:

```bash
docker build -t micro-users:dev services/users
docker build -t micro-orders:dev services/orders
docker build -t micro-inventory:dev services/inventory
docker build -t micro-gateway:dev services/gateway

kind load docker-image micro-users:dev micro-orders:dev micro-inventory:dev micro-gateway:dev
```

Then replace:
REPLACE_USERS_IMAGE -> micro-users:dev
REPLACE_ORDERS_IMAGE -> micro-orders:dev
REPLACE_INVENTORY_IMAGE -> micro-inventory:dev
REPLACE_GATEWAY_IMAGE -> micro-gateway:dev

Apply:

```bash
kubectl apply -f namespace.yaml
kubectl apply -f users.yaml -f orders.yaml -f inventory.yaml -f gateway.yaml
```

For AWS, the GitHub Actions workflow uses ECR image URLs and performs the replacements during deployment.
