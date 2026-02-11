-- Hospital Service Comparison Database Setup
-- Database: vinay1

USE vinay1;

-- Drop existing tables if they exist (to start fresh)
DROP TABLE IF EXISTS appointment;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS hospital_service;
DROP TABLE IF EXISTS service;
DROP TABLE IF EXISTS hospital;

-- Create hospital table
CREATE TABLE hospital (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    city VARCHAR(100),
    state VARCHAR(100),
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100)
);

-- Create service table
CREATE TABLE service (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    category VARCHAR(100)
);

-- Create hospital_service junction table
CREATE TABLE hospital_service (
    hospital_id BIGINT NOT NULL,
    service_id BIGINT NOT NULL,
    price DOUBLE NOT NULL,
    availability BOOLEAN NOT NULL,
    waiting_time INT,
    PRIMARY KEY (hospital_id, service_id),
    FOREIGN KEY (hospital_id) REFERENCES hospital(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES service(id) ON DELETE CASCADE
);

-- Create appointment table
CREATE TABLE appointment (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    hospital_id BIGINT NOT NULL,
    service_id BIGINT NOT NULL,
    patient_name VARCHAR(255) NOT NULL,
    patient_email VARCHAR(255) NOT NULL,
    patient_phone VARCHAR(20) NOT NULL,
    appointment_date DATETIME NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create review table
CREATE TABLE review (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    hospital_id BIGINT NOT NULL,
    rating INT NOT NULL,
    comment VARCHAR(2000),
    reviewer_name VARCHAR(255),
    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hospital_id) REFERENCES hospital(id) ON DELETE CASCADE
);

-- Insert sample hospitals
INSERT INTO hospital (name, address, city, state, latitude, longitude, phone, email) VALUES
('City General Hospital', '123 Main Street', 'New Delhi', 'Delhi', 28.6139, 77.2090, '011-12345678', 'info@citygeneral.com'),
('Apollo Hospital', '456 Park Avenue', 'Mumbai', 'Maharashtra', 19.0760, 72.8777, '022-87654321', 'contact@apollo.com'),
('Max Healthcare', '789 Ring Road', 'Bangalore', 'Karnataka', 12.9716, 77.5946, '080-11223344', 'info@maxhealth.com'),
('Fortis Hospital', '321 MG Road', 'Pune', 'Maharashtra', 18.5204, 73.8567, '020-99887766', 'support@fortis.com'),
('AIIMS', '555 Medical Lane', 'New Delhi', 'Delhi', 28.5672, 77.2100, '011-26588500', 'info@aiims.edu');

-- Insert sample services
INSERT INTO service (name, description, category) VALUES
('Cardiology', 'Heart and cardiovascular care including diagnostics and treatment', 'Medical'),
('Orthopedics', 'Bone, joint, and muscle treatment including surgery', 'Surgical'),
('Neurology', 'Brain and nervous system care', 'Medical'),
('Pediatrics', 'Child healthcare and treatment', 'Medical'),
('Dermatology', 'Skin care and treatment', 'Medical'),
('General Surgery', 'General surgical procedures', 'Surgical'),
('Radiology', 'Medical imaging and diagnostics', 'Diagnostic'),
('Emergency Care', '24/7 emergency medical services', 'Emergency');

-- Insert hospital-service relationships with pricing
INSERT INTO hospital_service (hospital_id, service_id, price, availability, waiting_time) VALUES
-- City General Hospital
(1, 1, 5000.00, TRUE, 30),
(1, 2, 8000.00, TRUE, 45),
(1, 3, 6000.00, TRUE, 25),
(1, 4, 3000.00, TRUE, 20),
(1, 8, 2000.00, TRUE, 10),

-- Apollo Hospital
(2, 1, 7000.00, TRUE, 20),
(2, 2, 10000.00, TRUE, 30),
(2, 3, 8000.00, TRUE, 35),
(2, 5, 4000.00, TRUE, 15),
(2, 7, 3500.00, TRUE, 25),

-- Max Healthcare
(3, 1, 6500.00, TRUE, 25),
(3, 2, 9000.00, FALSE, 60),
(3, 4, 3500.00, TRUE, 18),
(3, 6, 12000.00, TRUE, 40),
(3, 8, 2500.00, TRUE, 12),

-- Fortis Hospital
(4, 1, 5500.00, TRUE, 28),
(4, 3, 7000.00, TRUE, 30),
(4, 5, 3800.00, TRUE, 22),
(4, 6, 11000.00, TRUE, 35),
(4, 7, 3000.00, TRUE, 20),

-- AIIMS
(5, 1, 3000.00, TRUE, 60),
(5, 2, 5000.00, TRUE, 90),
(5, 3, 4000.00, TRUE, 75),
(5, 4, 2000.00, TRUE, 45),
(5, 8, 1000.00, TRUE, 15);

-- Insert sample reviews
INSERT INTO review (hospital_id, rating, comment, reviewer_name, review_date) VALUES
(1, 5, 'Excellent service and professional staff. Highly recommended!', 'Rajesh Kumar', '2026-01-15 10:30:00'),
(1, 4, 'Good facilities but waiting time was a bit long.', 'Priya Sharma', '2026-01-20 14:45:00'),
(1, 5, 'Very clean and well-maintained hospital.', 'Amit Patel', '2026-02-01 09:15:00'),

(2, 5, 'World-class treatment and care. Worth every penny!', 'Sneha Reddy', '2026-01-18 11:20:00'),
(2, 4, 'Great doctors but expensive.', 'Vikram Singh', '2026-01-25 16:30:00'),
(2, 5, 'Best hospital in Mumbai!', 'Anita Desai', '2026-02-05 13:00:00'),

(3, 4, 'Good overall experience. Staff was helpful.', 'Karthik Rao', '2026-01-22 10:00:00'),
(3, 3, 'Average service, expected better for the price.', 'Meera Nair', '2026-01-28 15:45:00'),

(4, 5, 'Excellent emergency care services!', 'Suresh Gupta', '2026-01-30 12:30:00'),
(4, 4, 'Professional and caring staff.', 'Deepa Iyer', '2026-02-03 14:15:00'),

(5, 4, 'Good government hospital with affordable rates.', 'Rahul Verma', '2026-01-16 09:45:00'),
(5, 3, 'Long waiting times but good treatment.', 'Kavita Joshi', '2026-01-24 11:00:00'),
(5, 5, 'Best value for money. Excellent doctors!', 'Manoj Tiwari', '2026-02-02 10:30:00');

-- Insert sample appointments
INSERT INTO appointment (hospital_id, service_id, patient_name, patient_email, patient_phone, appointment_date, status) VALUES
(1, 1, 'John Doe', 'john.doe@email.com', '9876543210', '2026-02-15 10:00:00', 'CONFIRMED'),
(2, 2, 'Jane Smith', 'jane.smith@email.com', '9876543211', '2026-02-16 14:30:00', 'PENDING'),
(3, 4, 'Robert Brown', 'robert.b@email.com', '9876543212', '2026-02-17 09:00:00', 'CONFIRMED');

-- Verify data
SELECT 'Hospitals' as TableName, COUNT(*) as RecordCount FROM hospital
UNION ALL
SELECT 'Services', COUNT(*) FROM service
UNION ALL
SELECT 'Hospital-Service Mappings', COUNT(*) FROM hospital_service
UNION ALL
SELECT 'Reviews', COUNT(*) FROM review
UNION ALL
SELECT 'Appointments', COUNT(*) FROM appointment;
