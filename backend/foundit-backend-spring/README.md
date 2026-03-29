# FoundIt AI - Smart Lost & Found System Backend

## 🎯 Project Overview

**FoundIt AI** is an intelligent lost and found management system designed for college campuses. It leverages AI-powered image recognition (YOLO + OpenCV) to automatically match found items with lost item reports, streamlining the recovery process.

### Key Features

- ✅ **User Authentication** - JWT-based authentication with role-based access (Student, Finder, Admin, Security Staff)
- ✅ **Lost Item Reporting** - Users can report lost items with descriptions, images, and last seen locations
- ✅ **Found Item Upload** - Finders can upload found items with automatic AI analysis
- ✅ **AI-Powered Matching** - Intelligent matching algorithm using:
  - Image similarity (35%)
  - Object type detection (25%)
  - Color matching (20%)
  - Description similarity (20%)
- ✅ **Real-time Notifications** - Email and in-app notifications when matches are found
- ✅ **QR Code Integration** - Quick reporting via QR codes placed around campus
- ✅ **Security Desk Management** - Admin dashboard for item verification and returns
- ✅ **Analytics Dashboard** - Insights on lost locations, item categories, and recovery rates

---

## 🛠️ Technology Stack

- **Backend Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: MySQL 8.0
- **Security**: Spring Security + JWT
- **Image Analysis**: Python service with YOLO + OpenCV (separate microservice)
- **Email**: Spring Mail
- **Real-time**: WebSocket (STOMP)
- **QR Codes**: Google ZXing
- **Build Tool**: Maven

---

## 📋 Prerequisites

Before running the application, ensure you have:

1. **Java 17** or higher installed
2. **Maven 3.6+** installed
3. **MySQL 8.0** running locally
4. **Python 3.8+** (for AI image analysis service - optional)
5. **Node.js** (for frontend - separate repository)

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/foundit-backend.git
cd foundit-backend
```

### 2. Configure Database

Create a MySQL database:

```sql
CREATE DATABASE foundit_db;
```

Update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/foundit_db
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### 3. Configure Email (Optional)

For email notifications, update in `application.properties`:

```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

**Note**: For Gmail, you need to generate an [App Password](https://support.google.com/accounts/answer/185833).

### 4. Build and Run

```bash
# Clean and build
mvn clean install

# Run the application
mvn spring-boot:run
```

The server will start on `http://localhost:8080/api`

### 5. Default Admin Credentials

After first run, an admin user is automatically created:

- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@foundit.ai`

⚠️ **Important**: Change the password immediately after first login!

---

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "studentId": "STU2024001",
  "phoneNumber": "9876543210",
  "role": "STUDENT"
}
```

**Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "userId": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "fullName": "John Doe",
  "role": "STUDENT"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

---

### Lost Item Endpoints

#### Report Lost Item
```http
POST /lost-items
Authorization: Bearer {token}
Content-Type: application/json

{
  "itemName": "iPhone 14 Pro",
  "description": "Black iPhone with blue case",
  "category": "ELECTRONICS",
  "color": "Black",
  "brand": "Apple",
  "lastSeenLocationId": 1,
  "lastSeenTime": "2024-03-13T14:30:00",
  "imageUrl": "/files/download/abc123.jpg"
}
```

#### Get All Lost Items
```http
GET /lost-items
Authorization: Bearer {token}
```

#### Get My Lost Items
```http
GET /lost-items/my-items
Authorization: Bearer {token}
```

#### Get Lost Item by ID
```http
GET /lost-items/{id}
Authorization: Bearer {token}
```

---

### Found Item Endpoints

#### Report Found Item
```http
POST /found-items
Authorization: Bearer {token}
Content-Type: application/json

{
  "itemName": "iPhone",
  "description": "Found near library entrance",
  "imageUrl": "/files/download/def456.jpg",
  "foundLocationId": 1
}
```

**Response**:
```json
{
  "message": "Item reported successfully. Please submit it to the campus security desk.",
  "item": {
    "id": 1,
    "itemName": "iPhone",
    "referenceId": "FND12AB34CD",
    ...
  }
}
```

#### Get All Found Items
```http
GET /found-items
Authorization: Bearer {token}
```

#### Get Items at Security Desk
```http
GET /found-items/at-security-desk
Authorization: Bearer {token}
```

---

### File Upload Endpoints

#### Upload Single File
```http
POST /files/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: [binary file data]
```

**Response**:
```json
{
  "fileName": "abc123.jpg",
  "fileDownloadUri": "http://localhost:8080/api/files/download/abc123.jpg",
  "fileType": "image/jpeg",
  "size": 245678
}
```

#### Download File
```http
GET /files/download/{fileName}
```

---

### Notification Endpoints

#### Get My Notifications
```http
GET /notifications
Authorization: Bearer {token}
```

#### Get Unread Notifications
```http
GET /notifications/unread
Authorization: Bearer {token}
```

#### Get Unread Count
```http
GET /notifications/unread/count
Authorization: Bearer {token}
```

**Response**:
```json
{
  "unreadCount": 3
}
```

#### Mark as Read
```http
PATCH /notifications/{id}/read
Authorization: Bearer {token}
```

---

### QR Code Endpoints

#### Generate QR Code for Location
```http
GET /qr/location/{locationId}
```

Returns a PNG image of the QR code.

#### Generate QR Code as Base64
```http
GET /qr/location/{locationId}/base64
```

**Response**:
```json
{
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANS...",
  "locationName": "Central Library",
  "locationId": "1"
}
```

---

### Analytics Endpoints (Admin Only)

#### Get Dashboard Statistics
```http
GET /analytics/dashboard
Authorization: Bearer {admin-token}
```

**Response**:
```json
{
  "totalLostReports": 156,
  "totalFoundItems": 98,
  "totalMatches": 72,
  "totalReturns": 64,
  "recentReports": 23,
  "recoveryRate": "41.0%"
}
```

#### Get Most Common Lost Locations
```http
GET /analytics/locations/common
Authorization: Bearer {admin-token}
```

#### Get Item Category Statistics
```http
GET /analytics/categories
Authorization: Bearer {admin-token}
```

---

### Location Endpoints

#### Get All Locations
```http
GET /locations
```

#### Get Active Locations
```http
GET /locations/active
```

#### Get Location by ID
```http
GET /locations/{id}
```

---

## 🔐 Security & Roles

The system has 4 user roles:

1. **STUDENT** - Can report lost items and view notifications
2. **FINDER** - Can upload found items
3. **SECURITY_STAFF** - Can manage items at security desk, verify returns
4. **ADMIN** - Full system access, analytics, user management

### Role-Based Access:

- `/auth/**` - Public
- `/lost-items/**` - Authenticated users
- `/found-items/**` - Authenticated users
- `/security/**` - Security Staff + Admin
- `/admin/**`, `/analytics/**` - Admin only

---

## 🤖 AI Integration

The system integrates with a separate Python microservice for image analysis.

### Python Service Setup (Optional)

1. The Python service should run on `http://localhost:5000`
2. Update `application.properties`:

```properties
python.service.url=http://localhost:5000
python.service.enabled=true
```

### Expected Python API Endpoints:

#### Analyze Image
```http
POST /analyze
Content-Type: application/json

{
  "image_url": "http://localhost:8080/api/files/download/abc123.jpg",
  "item_id": "1"
}
```

**Expected Response**:
```json
{
  "object_type": "phone",
  "color": "black",
  "category": "ELECTRONICS",
  "brand": "Apple",
  "features": "[0.123, 0.456, ...]"  // Feature vector
}
```

#### Calculate Similarity
```http
POST /similarity
Content-Type: application/json

{
  "features1": "[0.123, 0.456, ...]",
  "features2": "[0.789, 0.012, ...]"
}
```

**Expected Response**:
```json
{
  "similarity": 0.87
}
```

---

## 📁 Project Structure

```
foundit-backend/
├── src/
│   ├── main/
│   │   ├── java/com/foundit/
│   │   │   ├── config/           # Configuration classes
│   │   │   ├── controller/       # REST controllers
│   │   │   ├── dto/              # Data Transfer Objects
│   │   │   ├── exception/        # Exception handlers
│   │   │   ├── model/            # Entity models
│   │   │   ├── repository/       # JPA repositories
│   │   │   ├── security/         # Security & JWT
│   │   │   ├── service/          # Business logic
│   │   │   └── FoundItApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/                     # Test files
├── uploads/                      # Uploaded files (auto-created)
├── pom.xml
└── README.md
```

---

## 🧪 Testing

### Run Tests
```bash
mvn test
```

### Test with Postman

Import the API collection (to be provided) or manually test endpoints using the documentation above.

---

## 🌐 Database Schema

### Main Tables:

- **users** - User accounts with roles
- **locations** - Campus locations
- **lost_items** - Lost item reports
- **found_items** - Found item submissions
- **item_matches** - AI matching results
- **item_returns** - Collection records
- **notifications** - User notifications

---

## 📊 Matching Algorithm

The AI matching uses a weighted scoring system:

```
Match Score = (0.35 × Image Similarity) + 
              (0.25 × Object Type Match) + 
              (0.20 × Color Match) + 
              (0.20 × Description Similarity)
```

- **Threshold**: 0.65 (65%) for potential matches
- **High Confidence**: 0.75+ triggers automatic owner notification

---

## 🔧 Configuration Options

### application.properties

```properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/foundit_db
spring.datasource.username=root
spring.datasource.password=password

# JWT
jwt.secret=your-secret-key
jwt.expiration=86400000  # 24 hours

# File Upload
spring.servlet.multipart.max-file-size=10MB
file.upload-dir=./uploads

# Email
spring.mail.host=smtp.gmail.com
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password

# AI Service
python.service.url=http://localhost:5000
python.service.enabled=true

# Matching
matching.threshold=0.65
matching.image-weight=0.35
matching.object-type-weight=0.25
matching.color-weight=0.20
matching.description-weight=0.20
```

---

## 🚨 Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Ensure MySQL is running
   - Check database credentials in `application.properties`

2. **JWT Token Invalid**
   - Token might be expired (24h default)
   - Re-login to get a new token

3. **File Upload Failed**
   - Check file size limit (10MB default)
   - Ensure `uploads/` directory has write permissions

4. **Email Not Sending**
   - Verify email credentials
   - For Gmail, use App Password

---

## 📞 Support

For issues or questions:
- Email: support@foundit.ai
- GitHub Issues: [Report Bug](https://github.com/yourusername/foundit-backend/issues)

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Contributors

- Your Name - Initial work

---

## 🙏 Acknowledgments

- Spring Boot team
- YOLO and OpenCV communities
- Campus security teams for valuable feedback

---

**Built with ❤️ for making campuses safer and more organized!**
