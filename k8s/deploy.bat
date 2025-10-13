@echo off
setlocal enabledelayedexpansion

echo Deploying Infrastructure Kata Application to Kubernetes...

REM Apply namespace first
echo Creating namespace...
kubectl apply -f namespace.yaml

REM Wait a moment for the namespace to be created
timeout /t 5 /nobreak >nul

REM Apply persistent volume
echo Creating persistent volume...
kubectl apply -f postgres-pv.yaml

REM Apply persistent volume claim
echo Creating persistent volume claim...
kubectl apply -f postgres-pvc.yaml

REM Apply secrets and configmaps
echo Creating secrets and configmaps...
kubectl apply -f secrets.yaml
kubectl apply -f configmap.yaml

REM Apply database
echo Creating PostgreSQL deployment and service...
kubectl apply -f postgres-deployment.yaml
kubectl apply -f postgres-service.yaml

REM Wait for database to be ready
echo Waiting for PostgreSQL to be ready...
kubectl wait --for=condition=ready pod -l app=postgres -n infra-kata --timeout=120s

REM Apply migration job
echo Running database migrations...
kubectl apply -f migration-job.yaml

REM Wait for migration job to complete
echo Waiting for migrations to complete...
for /L %%i in (1,1,120) do (
    kubectl get job migration-job -n infra-kata --no-headers -o custom-columns=:status.succeeded > temp.txt
    set /p result= < temp.txt
    if "!result!" == "1" (
        echo Migrations completed successfully
        goto migration_complete
    )
    timeout /t 1 /nobreak >nul
)
echo Error: Migrations did not complete within the timeout period
goto error

:migration_complete
REM Apply other services
echo Creating backend deployment and service...
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml

echo Creating auth deployment and service...
kubectl apply -f auth-deployment.yaml
kubectl apply -f auth-service.yaml

echo Creating swagger deployment and service...
kubectl apply -f swagger-deployment.yaml
kubectl apply -f swagger-service.yaml

echo Creating frontend deployment and service...
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml

REM Apply ingress
echo Creating ingress...
kubectl apply -f ingress.yaml

echo Deployment complete!
echo Access the application via the ingress endpoint.

:error
del temp.txt
endlocal