# ⚡ Quick Start Guide - FoundIt AI Backend

## 🎯 Setup in 5 Minutes

### Step 1: Install Prerequisites (2 min)

```bash
# Check Java version (need 17+)
java -version

# Check Maven (need 3.6+)
mvn -version

# Check MySQL (need 8.0+)
mysql --version
```

If missing, install:
- **Java 17**: https://adoptium.net/
- **Maven**: https://maven.apache.org/download.cgi
- **MySQL**: https://dev.mysql.com/downloads/

---

### Step 2: Setup Database (1 min)

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE foundit_db;

# Exit MySQL
exit;
```

---

### Step 3: Configure Application (1 min)

Open `src/main/resources/application.properties` and update:

```properties
# Your MySQL credentials
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

# (Optional) Email for notifications
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

---

### Step 4: Build & Run (1 min)

```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

**✅ Server running at:** `http://localhost:8080/api`

---

## 🧪 Test Your Setup

### 1. Health Check

```bash
curl http://localhost:8080/api/auth/health
```

**Expected response:**
```json
{
  "status": "UP",
  "service": "FoundIt AI Authentication"
}
```

---

### 2. Login as Admin

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

**Save the token!** You'll need it for authenticated requests.

---

### 3. Get Locations

```bash
curl http://localhost:8080/api/locations/active
```

You should see 8 pre-configured campus locations!

---

## 📱 Default Admin Account

After first run, use these credentials:

- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@foundit.ai`
- **Role**: ADMIN

⚠️ **Change password immediately in production!**

---

## 🔥 Common Issues & Fixes

### Issue: "Can't connect to MySQL"
```bash
# Check if MySQL is running
sudo systemctl status mysql  # Linux
brew services list  # Mac

# Start MySQL
sudo systemctl start mysql  # Linux
brew services start mysql  # Mac
```

### Issue: "Port 8080 already in use"
Change port in `application.properties`:
```properties
server.port=8081
```

### Issue: "JWT Token Invalid"
Token expires after 24 hours. Login again to get a new token.

---

## 🎨 Frontend Integration

Ready to connect your frontend? Here's a quick example:

### React Example

```javascript
// Login
const login = async () => {
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'admin',
      password: 'admin123'
    })
  });
  
  const data = await response.json();
  localStorage.setItem('token', data.token);
};

// Get Lost Items
const getLostItems = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8080/api/lost-items', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  const items = await response.json();
  console.log(items);
};
```

---

## 🐍 Optional: Python AI Service

Want AI-powered matching? Set up the Python service:

```bash
# Install Python dependencies
pip install -r requirements.txt

# Download YOLO model (first time only)
# It will download automatically when you run

# Run the service
python ai_service.py
```

**AI Service URL:** `http://localhost:5000`

Update in `application.properties`:
```properties
python.service.enabled=true
```

---

## 📚 Next Steps

1. ✅ Read full documentation: `README.md`
2. ✅ Test all endpoints: `API_TESTING_GUIDE.md`
3. ✅ View project structure: `PROJECT_STRUCTURE.md`
4. ✅ Create your first user account
5. ✅ Report a lost item
6. ✅ Upload a found item
7. ✅ Check the matching system!

---

## 🆘 Need Help?

- **Full Documentation**: See `README.md`
- **API Reference**: See `API_TESTING_GUIDE.md`
- **Email**: support@foundit.ai

---

## 🎉 You're All Set!

Your FoundIt AI backend is running! Time to build something awesome! 🚀

**Main Endpoints:**
- Auth: `http://localhost:8080/api/auth/...`
- Lost Items: `http://localhost:8080/api/lost-items/...`
- Found Items: `http://localhost:8080/api/found-items/...`
- Files: `http://localhost:8080/api/files/...`

Happy coding! 💻
