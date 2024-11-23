
# Dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

# Aqui debemos asegurarnos del nombre de nuestro jar coincida
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

# Ubicacion y nombre del wallet descomprimido
COPY Wallet_QMX8X1I4LTY0NIR1 /C:/Wallet_tienda/
EXPOSE 8085

CMD ["java", "-jar", "app.jar"]