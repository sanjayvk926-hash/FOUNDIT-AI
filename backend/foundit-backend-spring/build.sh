#!/bin/bash
set -e

echo "Building FoundIt AI Backend..."

# Clean and build with Maven
./mvnw clean package -DskipTests

echo "Build complete!"
