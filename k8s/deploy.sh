#!/bin/bash

echo "Deploying Infrastructure Kata Application to Kubernetes..."

# Apply namespace first
echo "Creating namespace..."
kubectl apply -f namespace.yaml

# Wait a moment for the namespace to be created
sleep 5

# Apply persistent volume
echo "Creating persistent volume..."
kubectl apply -f postgres-pv.yaml

# Apply persistent volume claim
echo "Creating persistent volume claim..."
kubectl apply -f postgres-pvc.yaml

# Apply secrets and configmaps
echo "Creating secrets and configmaps..."
kubectl apply -f secrets.yaml
kubectl apply -f configmap.yaml

# Apply database
echo "Creating PostgreSQL deployment and service..."
kubectl apply -f postgres-deployment.yaml
kubectl apply -f postgres-service.yaml

# Wait for database to be ready
echo "Waiting for PostgreSQL to be ready..."
kubectl wait --for=condition=ready pod -l app=postgres -n infra-kata --timeout=120s

# Apply migration job
echo "Running database migrations..."
kubectl apply -f migration-job.yaml

# Wait for migration job to complete
echo "Waiting for migrations to complete..."
kubectl wait --for=condition=complete job/migration-job -n infra-kata --timeout=120s

# Apply other services
echo "Creating backend deployment and service..."
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml

echo "Creating auth deployment and service..."
kubectl apply -f auth-deployment.yaml
kubectl apply -f auth-service.yaml

echo "Creating swagger deployment and service..."
kubectl apply -f swagger-deployment.yaml
kubectl apply -f swagger-service.yaml

echo "Creating frontend deployment and service..."
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml

# Apply ingress
echo "Creating ingress..."
kubectl apply -f ingress.yaml

echo "Deployment complete!"
echo "Access the application via the ingress endpoint."