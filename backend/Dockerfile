# Use OpenJDK 19 as base image
FROM eclipse-temurin:19-jdk-alpine

# Set working directory
WORKDIR /app

# Install Maven
RUN apk add --no-cache maven

# Copy pom.xml first
COPY pom.xml .

# Download dependencies and build
RUN mvn dependency:go-offline && mvn clean package -DskipTests

# Copy source code
COPY src ./src

# Expose port 8080
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/hospital-comparison-1.0.0.jar"]

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/api/hospitals/health || exit 1
