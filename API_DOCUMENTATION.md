# Hospital Service Comparison API Documentation

## Base URL
```
http://localhost:8080/api
```

## Endpoints

### 1. Services

#### Get All Services
```
GET /services
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Cardiology",
    "description": "Heart and cardiovascular care",
    "category": "Medical"
  },
  {
    "id": 2,
    "name": "Orthopedics",
    "description": "Bone and joint treatment",
    "category": "Surgical"
  }
]
```

#### Get Service by ID
```
GET /services/{id}
```

**Response:**
```json
{
  "id": 1,
  "name": "Cardiology",
  "description": "Heart and cardiovascular care",
  "category": "Medical"
}
```

#### Search Services
```
GET /services/search?keyword=cardio
```

**Response:** Array of matching services

---

### 2. Hospital Search

#### Search Hospitals by Service
```
GET /hospitals/search?serviceId={id}&latitude={lat}&longitude={lon}&radius={km}
```

**Parameters:**
- `serviceId` (required): ID of the medical service
- `latitude` (optional): User's latitude
- `longitude` (optional): User's longitude
- `radius` (optional): Search radius in km (default: 10)

**Example Request:**
```
GET /hospitals/search?serviceId=1&latitude=28.6139&longitude=77.2090&radius=10
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "City General Hospital",
    "address": "123 Main Street",
    "city": "New Delhi",
    "state": "Delhi",
    "latitude": 28.6139,
    "longitude": 77.2090,
    "phone": "011-12345678",
    "distance": 2.5,
    "price": 5000.0,
    "availability": true,
    "waitingTime": 30,
    "averageRating": 4.5,
    "reviewCount": 120
  }
]
```

#### Compare Hospitals
```
GET /hospitals/compare?serviceId={id}&hospitalIds={id1,id2,id3}
```

**Parameters:**
- `serviceId` (required): ID of the medical service
- `hospitalIds` (required): Comma-separated list of hospital IDs

**Example Request:**
```
GET /hospitals/compare?serviceId=1&hospitalIds=1,2,3
```

**Response:** Array of hospital comparison data (same structure as search)

---

### 3. Appointments

#### Book Appointment
```
POST /appointments
```

**Request Body:**
```json
{
  "hospitalId": 1,
  "serviceId": 1,
  "patientName": "John Doe",
  "patientPhone": "9876543210",
  "appointmentDate": "2026-02-15T10:00:00"
}
```

**Validation Rules:**
- `patientPhone`: Must be exactly 10 digits
- `appointmentDate`: Must be in the future

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Appointment booked successfully",
  "appointmentId": 123,
  "appointment": {
    "id": 123,
    "hospitalId": 1,
    "serviceId": 1,
    "patientName": "John Doe",
    "patientPhone": "9876543210",
    "appointmentDate": "2026-02-15T10:00:00",
    "status": "BOOKED"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "The selected hospital does not offer this service"
}
```

#### Get Appointment by ID
```
GET /appointments/{id}
```

**Response:**
```json
{
  "id": 123,
  "hospitalId": 1,
  "serviceId": 1,
  "patientName": "John Doe",
  "patientPhone": "9876543210",
  "appointmentDate": "2026-02-15T10:00:00",
  "status": "BOOKED"
}
```

#### Get Appointments by Hospital
```
GET /appointments/hospital/{hospitalId}
```

**Response:** Array of appointments

---

### 4. Reviews

#### Get Reviews for Hospital
```
GET /reviews/hospital/{hospitalId}
```

**Response:**
```json
[
  {
    "id": 1,
    "hospitalId": 1,
    "hospitalName": "City General Hospital",
    "rating": 5,
    "comment": "Excellent service and professional staff",
    "createdAt": "2026-01-15T14:30:00"
  },
  {
    "id": 2,
    "hospitalId": 1,
    "hospitalName": "City General Hospital",
    "rating": 4,
    "comment": "Good facilities but long waiting time",
    "createdAt": "2026-01-20T09:15:00"
  }
]
```

#### Get Hospital Rating Statistics
```
GET /reviews/hospital/{hospitalId}/stats
```

**Response:**
```json
{
  "averageRating": 4.5,
  "totalReviews": 120
}
```

---

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200 OK`: Successful GET request
- `201 Created`: Successful POST request
- `400 Bad Request`: Invalid request data or validation error
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## CORS Configuration

The backend is configured to accept requests from:
```
http://localhost:3000
```

## Sample Use Cases

### Use Case 1: Search for Cardiology Services Nearby
1. Get all services: `GET /services`
2. Find Cardiology service ID (e.g., 1)
3. Search hospitals: `GET /hospitals/search?serviceId=1&latitude=28.6139&longitude=77.2090&radius=10`

### Use Case 2: Compare Hospitals
1. From search results, select 2-3 hospitals
2. Compare: `GET /hospitals/compare?serviceId=1&hospitalIds=1,2,3`

### Use Case 3: Book Appointment
1. Select hospital from results
2. Book appointment: `POST /appointments` with patient details

### Use Case 4: View Hospital Reviews
1. Get reviews: `GET /reviews/hospital/1`
2. Get rating stats: `GET /reviews/hospital/1/stats`
