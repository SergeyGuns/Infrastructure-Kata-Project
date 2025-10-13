 #!/bin/bash

 set -e

 # Configuration
 REGISTRY="sergeyguns"
 TAG=$(git describe --tags --always || echo "dev-$(date +%Y%m%d-%H%M%S)")

 # Services to build
 SERVICES=(
   "frontend"
   "backend-service"
   "auth-service"
   "migration-service"
 )

 # Optional services (check if directory exists)
 OPTIONAL_SERVICES=(

   "nginx"
 )

 echo "Building and pushing Docker images with tag: ${TAG}"

 for service in "${SERVICES[@]}"; do
   echo "Building ${service} image..."
   if [ -f "./${service}/Dockerfile" ]; then
     docker build -t ${REGISTRY}/${service}:${TAG} ./${service}
     docker push ${REGISTRY}/${service}:${TAG}
     # Also tag as latest
     docker tag ${REGISTRY}/${service}:${TAG} ${REGISTRY}/${service}:latest
     docker push ${REGISTRY}/${service}:latest
   else
     echo "Warning: Dockerfile not found for ${service}, skipping..."
   fi
 done

 for service in "${OPTIONAL_SERVICES[@]}"; do
   if [ -d "./${service}" ] && [ -f "./${service}/Dockerfile" ]; then
     echo "Building ${service} image..."
     docker build -t ${REGISTRY}/${service}:${TAG} ./${service}
     docker push ${REGISTRY}/${service}:${TAG}
     # Also tag as latest
     docker tag ${REGISTRY}/${service}:${TAG} ${REGISTRY}/${service}:latest
     docker push ${REGISTRY}/${service}:latest
   fi
 done

 echo "All images pushed with tag: ${TAG}"