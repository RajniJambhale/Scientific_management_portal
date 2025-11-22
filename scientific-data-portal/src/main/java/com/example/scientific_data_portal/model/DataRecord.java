package com.example.scientific_data_portal.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "data_record")
public class DataRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "`Index`")   //  Correct mapping for CSV column 'Index'
    private Integer csvIndex;

    private String name;
    private String description;
    private String brand;
    private String category;
    private Double price;
    private String currency;
    private Integer stock;
    private String ean;
    private String color;
    private String size;
    private String availability;

    @Column(name = "internal_id")
    private Integer internalId;
}
