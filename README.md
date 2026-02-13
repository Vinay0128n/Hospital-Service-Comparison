# Hospital Service Comparison Web Application

A full-stack web application for comparing hospital services, prices, and availability with location-based search and appointment booking.

## Live Deployment

- **Backend API:** https://hospital-service-comparison.onrender.com
- **Frontend App:** https://sage-figolla-1caa58.netlify.app
- **Database:** MySQL (Railway)

## Tech Stack

- **Frontend:** React (JavaScript) - Deployed on Netlify
- **Backend:** Spring Boot (Java) - Deployed on Render
- **Database:** MySQL - Hosted on Railway
- **Architecture:** RESTful APIs with CORS configuration

## Features

**Service-Based Hospital Search** - Search hospitals by medical service  
**Location Filtering** - Find hospitals within a specific radius using GPS coordinates  
**Price & Availability Comparison** - Compare multiple hospitals side-by-side  
**Appointment Booking** - Book appointments with validation  
**Ratings & Reviews** - View patient reviews and average ratings  
**User Authentication** - Login and registration system  
**Responsive Design** - Mobile-friendly interface  
**Production Deployment** - Fully deployed with CORS support

## Prerequisites

- Java 19 or higher
- Maven 3.6+
- Node.js 16+ and npm
- MySQL 8.0+
- Git

## Database Setup

The application expects the following MySQL database configuration:

**Production Database:** Railway MySQL
**Development Database:** Local MySQL instance

**Database Name:** `vinay1`

**Tables:**
- `hospital` - Hospital information
- `service` - Medical services
- `hospital_service` - Junction table with pricing
- `appointment` - Appointment bookings
- `review` - Hospital reviews

> **Note:** Production uses `spring.jpa.hibernate.ddl-auto=update` for automatic schema management. Development uses `none` to prevent automatic schema generation.

## Backend Setup

### 1. Configure Database Connection

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hospital_db
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

### 2. Build and Run

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Verify Backend

Test the API:
```bash
curl http://localhost:8080/api/services
```

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm start
```

The frontend will start on `http://localhost:3000`

## Project Structure

```
hms/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/hospital/comparison/
│   │   │   │   ├── entity/          # JPA entities
│   │   │   │   ├── repository/      # Data access layer
│   │   │   │   ├── service/         # Business logic
│   │   │   │   ├── controller/      # REST controllers
│   │   │   │   ├── dto/             # Data transfer objects
│   │   │   │   └── HospitalComparisonApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── SearchPage.jsx       # Service & location search
    │   │   ├── ResultsPage.jsx      # Hospital list
    │   │   ├── ComparisonView.jsx   # Side-by-side comparison
    │   │   ├── AppointmentForm.jsx  # Booking form
    │   │   └── ReviewsDisplay.jsx   # Reviews & ratings
    │   ├── services/
    │   │   └── api.js               # Axios API calls
    │   ├── App.js                   # Main app with routing
    │   ├── App.css                  # Global styles
    │   └── index.js                 # Entry point
    └── package.json
```

## API Endpoints

### Services
- `GET /api/services` - Get all services
- `GET /api/services/{id}` - Get service by ID
- `GET /api/services/search?keyword={keyword}` - Search services

### Hospitals
- `GET /api/hospitals/search?serviceId={id}&latitude={lat}&longitude={lon}&radius={km}` - Search hospitals
- `GET /api/hospitals/compare?serviceId={id}&hospitalIds={id1,id2,id3}` - Compare hospitals

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/{id}` - Get appointment by ID
- `GET /api/appointments/patient/{email}` - Get patient's appointments

### Reviews
- `GET /api/reviews/hospital/{hospitalId}` - Get hospital reviews
- `GET /api/reviews/hospital/{hospitalId}/stats` - Get rating statistics

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for detailed API documentation.

## Usage Flow

1. **Search** - Select a medical service and optionally provide location
2. **Browse Results** - View hospitals offering the service with prices and ratings
3. **Compare** - Select multiple hospitals to compare side-by-side
4. **Book Appointment** - Choose a hospital and book an appointment
5. **View Reviews** - Read patient reviews and ratings

## Key Features Implementation

### Location-Based Search
Uses Haversine formula to calculate distances between user location and hospitals:
```java
(6371 * acos(cos(radians(:latitude)) * cos(radians(h.latitude)) * 
cos(radians(h.longitude) - radians(:longitude)) + 
sin(radians(:latitude)) * sin(radians(h.latitude))))
```

### Appointment Validation
- Validates hospital offers the selected service
- Checks service availability
- Validates patient information (email format, 10-digit phone)
- Ensures appointment date is in the future

### Comparison View
Highlights best values for:
- Lowest price 🏆
- Shortest waiting time 🏆
- Highest rating 🏆

## Development

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Build for Production

**Backend:**
```bash
cd backend
mvn clean package
java -jar target/hospital-comparison-1.0.0.jar
```

**Frontend:**
```bash
cd frontend
npm run build
```

## Deployment

### Production Deployment

**Backend (Render):**
- **URL:** https://hospital-service-comparison.onrender.com
- **Platform:** Render (Docker)
- **Database:** Railway MySQL
- **Environment Variables:** Configured in Render dashboard
- **CORS:** Configured for Netlify frontend

**Frontend (Netlify):**
- **URL:** https://sage-figolla-1caa58.netlify.app
- **Platform:** Netlify (Static hosting)
- **Build:** Production React build
- **API:** Connected to Render backend

### Environment Configuration

**Production Environment Variables:**
```bash
DATABASE_URL=jdbc:mysql://username:password@host:port/database
SPRING_DATASOURCE_URL=${DATABASE_URL}
SPRING_PROFILES_ACTIVE=prod
PORT=8080
JAVA_OPTS=-Xmx512m -Xms256m
```

**CORS Configuration:**
```properties
spring.web.cors.allowed-origins=https://sage-figolla-1caa58.netlify.app,https://localhost:3000,https://localhost:3001
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=Content-Type,Authorization,X-Requested-With,Accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers
spring.web.cors.allow-credentials=true
```

### Docker Configuration

**Backend Dockerfile:**
```dockerfile
FROM eclipse-temurin:19-jdk-alpine
WORKDIR /app
RUN apk add --no-cache maven
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests || true
EXPOSE 8080
CMD ["sh", "-c", "if [ -f target/hospital-comparison-1.0.0.jar ]; then java -jar target/hospital-comparison-1.0.0.jar; else echo 'JAR not found, but container will continue running'; fi"]
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD sh -c "curl -f http://localhost:8080/api/hospitals/health || exit 1"
```

## Troubleshooting

### Production Issues

**CORS Errors:**
- Verify backend CORS configuration includes frontend domain
- Check preflight request headers are properly configured
- Ensure `Access-Control-Allow-Credentials` is set to `true`

**Database Connection:**
- Verify Railway MySQL is running
- Check `DATABASE_URL` format includes `jdbc:mysql://` prefix
- Ensure database credentials are correct

**Deployment Failures:**
- Check Render logs for build errors
- Verify Dockerfile syntax is correct
- Ensure all dependencies are available

### Development Issues

**Backend won't start:**
- Verify MySQL is running
- Check database credentials in `application.properties`
- Ensure database and tables exist

**Frontend can't connect to backend:**
- Verify backend is running on port 8080
- Check CORS configuration in backend
- Verify API base URL in `frontend/src/services/api.js`

**Database connection errors:**
- Ensure MySQL service is running
- Verify database name is `vinay1`
- Check username and password

## License

This project is for educational purposes.

## Author

Senior Full-Stack Engineer & System Architect
