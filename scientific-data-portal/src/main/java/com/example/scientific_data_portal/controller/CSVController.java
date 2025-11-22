package com.example.scientific_data_portal.controller;

import com.example.scientific_data_portal.model.DataRecord;
import com.example.scientific_data_portal.service.CSVService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/csv")
@CrossOrigin(origins = "http://localhost:3000")
public class CSVController {

    private final CSVService csvService;

    // Modern constructor injection (recommended)
    public CSVController(CSVService csvService) {
        this.csvService = csvService;
    }

    // Upload CSV
    @PostMapping("/upload")
    public ResponseEntity<String> uploadCSV(@RequestParam("file") MultipartFile file) {
        csvService.uploadCSV(file);
        return ResponseEntity.ok("CSV uploaded & data saved!");
    }

    //  Get all records
    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(csvService.getAll());
    }


    // add records
    @PostMapping("/add")
    public ResponseEntity<DataRecord> addRecord(@RequestBody DataRecord dataRecord) {
    DataRecord saved = csvService.save(dataRecord);
    return ResponseEntity.ok(saved);
}

    // delete record 
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRecord(@PathVariable Long id) {
    csvService.delete(id);
    return ResponseEntity.ok("Record deleted successfully");
}


}
