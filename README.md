# Hospital Service Comparison Web Application

A full-stack web application for comparing hospital services, prices, and availability with location-based search and appointment booking.

## Tech Stack

- **Frontend:** React (JavaScript)
- **Backend:** Spring Boot (Java)
- **Database:** MySQL
- **Architecture:** RESTful APIs

## Features

✅ **Service-Based Hospital Search** - Search hospitals by medical service  
✅ **Location Filtering** - Find hospitals within a specific radius using GPS coordinates  
✅ **Price & Availability Comparison** - Compare multiple hospitals side-by-side  
✅ **Appointment Booking** - Book appointments with validation  
✅ **Ratings & Reviews** - View patient reviews and average ratings  

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- Node.js 16+ and npm
- MySQL 8.0+
- Git

## Database Setup

The application expects the following MySQL database and tables to exist:

**Database Name:** `hospital_db`

**Tables:**
- `hospital` - Hospital information
- `service` - Medical services
- `hospital_service` - Junction table with pricing
- `appointment` - Appointment bookings
- `review` - Hospital reviews

> **Note:** The application uses `spring.jpa.hibernate.ddl-auto=none` to prevent automatic schema generation. Ensure your database is set up before running the application.

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

## Troubleshooting

### Backend won't start
- Verify MySQL is running
- Check database credentials in `application.properties`
- Ensure database and tables exist

### Frontend can't connect to backend
- Verify backend is running on port 8080
- Check CORS configuration in backend
- Verify API base URL in `frontend/src/services/api.js`

### Database connection errors
- Ensure MySQL service is running
- Verify database name is `hospital_db`
- Check username and password

## License

This project is for educational purposes.

## Author

Senior Full-Stack Engineer & System Architect
