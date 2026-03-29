# FoundIt AI Backend - Project Structure

## 📁 Complete File Structure

```
foundit-backend-spring/
│
├── pom.xml                           # Maven configuration with dependencies
├── README.md                         # Complete documentation
├── API_TESTING_GUIDE.md             # API testing guide with examples
├── ai_service.py                     # Python AI service (YOLO + OpenCV)
├── requirements.txt                  # Python dependencies
│
└── src/
    └── main/
        ├── java/com/foundit/
        │   │
        │   ├── FoundItApplication.java      # Main Spring Boot application
        │   │
        │   ├── config/                      # Configuration classes
        │   │   ├── AppConfig.java           # ModelMapper bean
        │   │   ├── DataInitializer.java     # Initial data seeding
        │   │   ├── FileStorageProperties.java
        │   │   ├── SecurityConfig.java      # Spring Security configuration
        │   │   └── WebSocketConfig.java     # WebSocket for real-time notifications
        │   │
        │   ├── controller/                  # REST API Controllers
        │   │   ├── AnalyticsController.java     # Admin analytics dashboard
        │   │   ├── AuthController.java          # Authentication endpoints
        │   │   ├── FileController.java          # File upload/download
        │   │   ├── FoundItemController.java     # Found item management
        │   │   ├── LocationController.java      # Campus locations
        │   │   ├── LostItemController.java      # Lost item management
        │   │   ├── MatchingController.java      # Match management
        │   │   ├── NotificationController.java  # User notifications
        │   │   └── QRCodeController.java        # QR code generation
        │   │
        │   ├── dto/                         # Data Transfer Objects
        │   │   ├── AuthResponse.java
        │   │   ├── FoundItemRequest.java
        │   │   ├── FoundItemResponse.java
        │   │   ├── ItemMatchResponse.java
        │   │   ├── LoginRequest.java
        │   │   ├── LostItemRequest.java
        │   │   ├── LostItemResponse.java
        │   │   └── RegisterRequest.java
        │   │
        │   ├── exception/                   # Exception Handling
        │   │   └── GlobalExceptionHandler.java
        │   │
        │   ├── model/                       # JPA Entity Models
        │   │   ├── FoundItem.java           # Found items with AI detection
        │   │   ├── ItemMatch.java           # AI matching results
        │   │   ├── ItemReturn.java          # Collection tracking
        │   │   ├── Location.java            # Campus locations
        │   │   ├── LostItem.java            # Lost item reports
        │   │   ├── Notification.java        # User notifications
        │   │   └── User.java                # User accounts with roles
        │   │
        │   ├── repository/                  # JPA Repositories
        │   │   ├── FoundItemRepository.java
        │   │   ├── ItemMatchRepository.java
        │   │   ├── ItemReturnRepository.java
        │   │   ├── LocationRepository.java
        │   │   ├── LostItemRepository.java
        │   │   ├── NotificationRepository.java
        │   │   └── UserRepository.java
        │   │
        │   ├── security/                    # Security & JWT
        │   │   ├── CustomUserDetailsService.java
        │   │   ├── JwtAuthenticationFilter.java
        │   │   └── JwtTokenProvider.java
        │   │
        │   └── service/                     # Business Logic
        │       ├── AnalyticsService.java        # Dashboard analytics
        │       ├── AuthService.java             # Authentication logic
        │       ├── FileStorageService.java      # File management
        │       ├── FoundItemService.java        # Found item logic
        │       ├── ImageAnalysisService.java    # AI integration (YOLO/OpenCV)
        │       ├── LostItemService.java         # Lost item logic
        │       ├── MatchingService.java         # AI matching algorithm
        │       ├── NotificationService.java     # Email & notifications
        │       └── QRCodeService.java           # QR code generation
        │
        └── resources/
            └── application.properties       # Application configuration

```

## 📊 Statistics

- **Total Java Files**: 50
- **Controllers**: 9
- **Services**: 9
- **Models/Entities**: 7
- **Repositories**: 7
- **DTOs**: 8
- **Configuration Classes**: 5
- **Security Components**: 3

## 🎯 Key Features Implemented

### 1. Authentication & Authorization
- JWT-based authentication
- Role-based access control (STUDENT, FINDER, ADMIN, SECURITY_STAFF)
- Password encryption with BCrypt
- Token expiration and validation

### 2. Lost & Found Management
- Lost item reporting with images
- Found item submission
- Reference ID generation (LST####, FND####)
- Status tracking (REPORTED, MATCHED, FOUND, COLLECTED)

### 3. AI-Powered Matching
- Integration with Python service (YOLO + OpenCV)
- Object detection and categorization
- Color detection
- Image feature extraction
- Weighted scoring algorithm:
  - Image similarity: 35%
  - Object type match: 25%
  - Color match: 20%
  - Description similarity: 20%
- Automatic owner notification for high-confidence matches (>75%)

### 4. Notification System
- Email notifications via Spring Mail
- In-app notifications
- Real-time updates via WebSocket
- Notification types:
  - Match found
  - Item submitted
  - Item ready for collection
  - Item collected

### 5. File Management
- Secure file upload/download
- 10MB file size limit
- UUID-based file naming
- Support for images (JPG, PNG, JPEG)

### 6. QR Code System
- QR code generation for campus locations
- Quick found item reporting
- Base64 and PNG image formats

### 7. Analytics Dashboard
- Total lost/found items
- Match success rate
- Recovery statistics
- Most common lost locations
- Item category breakdown
- Monthly trends
- Performance metrics

### 8. Security Features
- CORS configuration
- CSRF protection
- Session management (stateless)
- API endpoint protection
- Role-based method security

## 🗄️ Database Schema

### Tables Created Automatically:
1. **users** - User accounts
2. **locations** - Campus locations
3. **lost_items** - Lost item reports
4. **found_items** - Found item submissions
5. **item_matches** - Matching results
6. **item_returns** - Collection records
7. **notifications** - User notifications
8. **user_roles** - User role mapping

## 🚀 Getting Started

### Prerequisites
```bash
# Java 17+
java -version

# Maven 3.6+
mvn -version

# MySQL 8.0+
mysql --version
```

### Setup Database
```sql
CREATE DATABASE foundit_db;
```

### Configure Application
Edit `src/main/resources/application.properties`:
- Database credentials
- JWT secret key
- Email configuration
- File upload directory

### Run Application
```bash
mvn clean install
mvn spring-boot:run
```

Server starts on: `http://localhost:8080/api`

### Default Admin Login
- Username: `admin`
- Password: `admin123`

## 🧪 Testing

See `API_TESTING_GUIDE.md` for detailed testing instructions.

## 🐍 Python AI Service

The Python service (`ai_service.py`) provides:
- YOLO object detection
- OpenCV feature extraction
- Color detection
- Image similarity calculation

### Setup Python Service
```bash
pip install -r requirements.txt
python ai_service.py
```

Service runs on: `http://localhost:5000`

## 📝 API Endpoints Summary

### Authentication
- POST `/auth/register` - Register new user
- POST `/auth/login` - User login
- GET `/auth/me` - Get current user

### Lost Items
- POST `/lost-items` - Report lost item
- GET `/lost-items` - Get all lost items
- GET `/lost-items/my-items` - Get my lost items
- GET `/lost-items/{id}` - Get lost item by ID

### Found Items
- POST `/found-items` - Report found item
- GET `/found-items` - Get all found items
- GET `/found-items/my-items` - Get my found items
- GET `/found-items/at-security-desk` - Items at security

### Files
- POST `/files/upload` - Upload file
- GET `/files/download/{fileName}` - Download file

### Notifications
- GET `/notifications` - Get my notifications
- GET `/notifications/unread` - Get unread notifications
- PATCH `/notifications/{id}/read` - Mark as read

### Matches
- GET `/matches/my-matches` - Get my matches
- POST `/matches/{id}/confirm` - Confirm match

### QR Codes
- GET `/qr/location/{id}` - Generate QR code
- GET `/qr/location/{id}/base64` - Get QR as Base64

### Analytics (Admin)
- GET `/analytics/dashboard` - Dashboard stats
- GET `/analytics/locations/common` - Common locations
- GET `/analytics/categories` - Category stats

### Locations
- GET `/locations` - Get all locations
- GET `/locations/active` - Get active locations

## 🎨 Frontend Integration

This backend is designed to work with:
- React.js frontend
- Mobile apps (React Native, Flutter)
- Any frontend that can make HTTP requests

### CORS Configuration
Frontend URLs allowed (default):
- http://localhost:3000 (React)
- http://localhost:5173 (Vite)

Update in `application.properties` to add more origins.

## 📧 Contact & Support

For questions or issues:
- Check `README.md` for detailed documentation
- Review `API_TESTING_GUIDE.md` for testing examples
- Contact: support@foundit.ai

## 📄 License

MIT License

---

**Built with ❤️ for making campuses safer and more organized!**
