-- Populate hospital_service table with sample data for all hospitals and services
-- Fixed column name from waiting_time to waiting_time_minutes

INSERT INTO hospital_service (hospital_id, service_id, price, availability, waiting_time_minutes)
SELECT h.hospital_id, s.service_id,
       -- Randomish price between 500 and 5500
       (500 + (h.hospital_id * s.service_id * 17) % 5000),
       -- Always available for now
       1,
       -- Waiting time between 5 and 65 mins
       (5 + (h.hospital_id * 13 + s.service_id * 7) % 60)
FROM hospital h, service s
ON DUPLICATE KEY UPDATE 
    price = VALUES(price),
    availability = VALUES(availability),
    waiting_time_minutes = VALUES(waiting_time_minutes);
