#!/bin/bash

# FoundIt AI Backend - Automated Setup Script
# This script automates the setup process for the FoundIt AI backend

echo "╔════════════════════════════════════════════════╗"
echo "║                                                ║"
echo "║         FoundIt AI Backend Setup Script        ║"
echo "║         Automated Installation & Setup         ║"
echo "║                                                ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check prerequisites
echo "Step 1: Checking prerequisites..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check Java
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}')
    print_success "Java found: $JAVA_VERSION"
else
    print_error "Java not found. Please install Java 17 or higher."
    exit 1
fi

# Check Maven
if command -v mvn &> /dev/null; then
    MVN_VERSION=$(mvn -version | head -n 1)
    print_success "Maven found: $MVN_VERSION"
else
    print_error "Maven not found. Please install Maven 3.6 or higher."
    exit 1
fi

# Check MySQL
if command -v mysql &> /dev/null; then
    print_success "MySQL found"
else
    print_error "MySQL not found. Please install MySQL 8.0 or higher."
    exit 1
fi

echo ""
echo "Step 2: Database Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

read -p "Enter MySQL root password: " -s MYSQL_PASSWORD
echo ""

# Create database
print_info "Creating database 'foundit_db'..."
mysql -u root -p"$MYSQL_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS foundit_db;" 2>/dev/null

if [ $? -eq 0 ]; then
    print_success "Database created successfully"
else
    print_error "Failed to create database. Please check your MySQL credentials."
    exit 1
fi

echo ""
echo "Step 3: Configure Application"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Update application.properties
print_info "Updating application.properties..."

CONFIG_FILE="src/main/resources/application.properties"

if [ -f "$CONFIG_FILE" ]; then
    # Backup original file
    cp "$CONFIG_FILE" "${CONFIG_FILE}.backup"
    
    # Update MySQL password
    sed -i.bak "s/spring.datasource.password=.*/spring.datasource.password=$MYSQL_PASSWORD/" "$CONFIG_FILE"
    
    print_success "Configuration updated"
else
    print_error "Configuration file not found: $CONFIG_FILE"
    exit 1
fi

echo ""
echo "Step 4: Build Project"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

print_info "Building project with Maven (this may take a few minutes)..."
mvn clean install -DskipTests

if [ $? -eq 0 ]; then
    print_success "Build successful"
else
    print_error "Build failed. Please check the error messages above."
    exit 1
fi

echo ""
echo "Step 5: Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print_success "FoundIt AI Backend is ready to run!"
echo ""
echo "To start the server, run:"
echo "  mvn spring-boot:run"
echo ""
echo "Or build and run as JAR:"
echo "  java -jar target/foundit-backend-1.0.0.jar"
echo ""
echo "Server will be available at: http://localhost:8080/api"
echo ""
echo "Default admin credentials:"
echo "  Username: admin"
echo "  Password: admin123"
echo ""
print_info "Remember to change the admin password after first login!"
echo ""

# Optional: Start server
read -p "Do you want to start the server now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Starting FoundIt AI Backend..."
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    mvn spring-boot:run
fi
