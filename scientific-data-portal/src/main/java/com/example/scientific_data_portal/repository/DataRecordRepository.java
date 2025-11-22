package com.example.scientific_data_portal.repository;

import com.example.scientific_data_portal.model.DataRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DataRecordRepository extends JpaRepository<DataRecord, Long> {

}