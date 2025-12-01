# ---------- STAGE 1: build ----------
FROM eclipse-temurin:21-jdk AS builder

# Устанавливаем сертификаты (важно!)
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && \
    update-ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN ./gradlew clean bootJar -x test

# ---------- STAGE 2: run ----------
FROM eclipse-temurin:21-jre

WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]