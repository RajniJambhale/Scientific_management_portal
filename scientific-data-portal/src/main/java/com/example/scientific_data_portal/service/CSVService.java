package com.example.scientific_data_portal.service;

import com.example.scientific_data_portal.model.DataRecord;
import com.example.scientific_data_portal.repository.DataRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
public class CSVService {

    @Autowired
    private DataRecordRepository repo;

    public void uploadCSV(MultipartFile file) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {

            Iterable<CSVRecord> records = CSVFormat.DEFAULT
                    .withFirstRecordAsHeader()
                    .parse(reader);

            for (CSVRecord record : records) {
                DataRecord data = new DataRecord();

                data.setCsvIndex(Integer.parseInt(record.get("Index")));
                data.setName(record.get("Name"));
                data.setDescription(record.get("Description"));
                data.setBrand(record.get("Brand"));
                data.setCategory(record.get("Category"));
                data.setPrice(Double.parseDouble(record.get("Price")));
                data.setCurrency(record.get("Currency"));
                data.setStock(Integer.parseInt(record.get("Stock")));
                data.setEan(record.get("EAN"));
                data.setColor(record.get("Color"));
                data.setSize(record.get("Size"));
                data.setAvailability(record.get("Availability"));
                data.setInternalId(Integer.parseInt(record.get("Internal ID")));

                repo.save(data);
            }

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse CSV: " + e.getMessage());
        }
    }

    public Object getAll() {
        return repo.findAll();
    }

    public DataRecord save(DataRecord dataRecord) {
    return repo.save(dataRecord);
}

public void delete(Long id) {
    repo.deleteById(id);
}

}
