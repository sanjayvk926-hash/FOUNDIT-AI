FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY . .

# Install Maven
RUN apt-get update && apt-get install -y maven

# Build project
RUN mvn clean package -DskipTests

EXPOSE 8080

CMD ["sh", "-c", "java -Dserver.port=$PORT -jar target/*.jar"]
