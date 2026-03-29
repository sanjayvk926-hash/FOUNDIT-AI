# API Testing Guide - FoundIt AI Backend

## Setup for Testing

### 1. Start the Backend
```bash
mvn spring-boot:run
```
Server runs on: `http://localhost:8080/api`

### 2. Start Python AI Service (Optional)
```bash
cd python-service
pip install -r requirements.txt
python ai_service.py
```
AI Service runs on: `http://localhost:5000`

---

## Testing Workflow

### Step 1: Register a User

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User",
    "studentId": "STU001",
    "phoneNumber": "9876543210",
    "role": "STUDENT"
  }'
```

**Save the token from response!**

---

### Step 2: Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "password": "password123"
  }'
```

---

### Step 3: Get Locations

```bash
curl -X GET http://localhost:8080/api/locations/active
```

**Note the location IDs for next steps**

---

### Step 4: Upload an Image

```bash
curl -X POST http://localhost:8080/api/files/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/image.jpg"
```

**Save the fileDownloadUri!**

---

### Step 5: Report a Lost Item

```bash
curl -X POST http://localhost:8080/api/lost-items \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "itemName": "iPhone 14",
    "description": "Black iPhone with blue case, cracked screen",
    "category": "ELECTRONICS",
    "color": "Black",
    "brand": "Apple",
    "lastSeenLocationId": 1,
    "lastSeenTime": "2024-03-13T14:30:00",
    "imageUrl": "/files/download/YOUR_FILE_NAME.jpg"
  }'
```

---

### Step 6: Report a Found Item

```bash
curl -X POST http://localhost:8080/api/found-items \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "itemName": "iPhone",
    "description": "Found near library entrance",
    "imageUrl": "/files/download/YOUR_FILE_NAME.jpg",
    "foundLocationId": 1
  }'
```

The backend will:
1. Call Python AI service to analyze the image
2. Extract object type, color, category
3. Run matching algorithm
4. Send notification if high-confidence match found

---

### Step 7: Check Notifications

```bash
curl -X GET http://localhost:8080/api/notifications \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### Step 8: Get Matches (for the owner)

```bash
curl -X GET http://localhost:8080/api/matches/my-matches \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### Step 9: Confirm Match (Admin/Security)

```bash
curl -X POST http://localhost:8080/api/matches/1/confirm \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

### Step 10: View Analytics (Admin only)

```bash
curl -X GET http://localhost:8080/api/analytics/dashboard \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## Testing Python AI Service

### Test Image Analysis

```bash
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "image_url": "http://localhost:8080/api/files/download/image.jpg",
    "item_id": "1"
  }'
```

### Test Similarity Calculation

```bash
curl -X POST http://localhost:5000/similarity \
  -H "Content-Type: application/json" \
  -d '{
    "features1": "[0.1, 0.2, 0.3, ...]",
    "features2": "[0.15, 0.25, 0.35, ...]"
  }'
```

---

## Testing QR Code Generation

### Generate QR Code for Location

```bash
curl -X GET http://localhost:8080/api/qr/location/1 \
  --output qrcode.png
```

### Get QR Code as Base64

```bash
curl -X GET http://localhost:8080/api/qr/location/1/base64
```

---

## Example Test Scenarios

### Scenario 1: Complete Lost & Found Flow

1. User A reports lost iPhone
2. User B finds iPhone and uploads with image
3. AI analyzes the image
4. System matches items (>75% score)
5. User A receives notification
6. User A goes to security desk
7. Security staff verifies and marks as returned

### Scenario 2: QR Code Quick Reporting

1. Admin generates QR code for "Library" location
2. Prints and places QR at library entrance
3. Finder scans QR code
4. Opens pre-filled form with location
5. Uploads found item photo
6. Submits to security desk

---

## Common Test Data

### Admin Credentials
- Username: `admin`
- Password: `admin123`

### Sample Locations
1. Central Library
2. Main Canteen
3. Classroom Block C
4. Student Parking Lot
5. Computer Science Lab
6. Sports Complex

### Item Categories
- ELECTRONICS
- DOCUMENTS
- ACCESSORIES
- CLOTHING
- BOOKS
- BAGS
- JEWELRY
- KEYS
- WALLETS
- SPORTS_EQUIPMENT
- OTHER

---

## Automated Testing with Postman

Import the collection (to be provided) with:
- Pre-configured requests
- Environment variables
- Automated token management
- Test assertions

---

## Performance Testing

### Load Test with Apache Bench

```bash
# Test login endpoint
ab -n 1000 -c 10 -p login.json -T application/json \
  http://localhost:8080/api/auth/login

# Test get locations
ab -n 1000 -c 10 -H "Authorization: Bearer TOKEN" \
  http://localhost:8080/api/locations/active
```

---

## Troubleshooting

### Issue: 401 Unauthorized
- Check if token is valid
- Token expires after 24 hours
- Re-login to get new token

### Issue: 400 Bad Request
- Check request body format
- Validate required fields
- Check data types

### Issue: 500 Internal Server Error
- Check server logs
- Verify database connection
- Ensure Python service is running (for AI features)

---

## Notes

- Replace `YOUR_TOKEN` with actual JWT token
- Replace `YOUR_FILE_NAME.jpg` with actual uploaded file name
- All timestamps in ISO 8601 format
- File size limit: 10MB
- Supported image formats: JPG, PNG, JPEG

---

**Happy Testing! 🚀**
