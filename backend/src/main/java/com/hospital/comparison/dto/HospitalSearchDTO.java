package com.hospital.comparison.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HospitalSearchDTO {
    private Long id;
    private String name;
    private String address;
    private String city;
    private Double latitude;
    private Double longitude;
    private String phone;
    private Double distance; // Distance from search location in km
    private Double price;
    private Boolean availability;
    private Integer waitingTime;
    private Double averageRating;
    private Long reviewCount;
}
