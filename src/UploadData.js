import React, { useState, useEffect } from "react";
import axios from "axios";

function UploadData() {
  const [file, setFile] = useState(null);
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    csvIndex: "",
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    currency: "",
    stock: "",
    ean: "",
    color: "",
    size: "",
    availability: "",
    internalId: "",
  });

  // ---------------- CSV Upload ----------------
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/csv/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(res.data);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("CSV Upload failed!");
    }
  };

  // ---------------- Fetch All Records ----------------
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/csv/all");
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---------------- Add New Record ----------------
  const handleAddRecord = async () => {
    try {
      await axios.post("http://localhost:8080/api/csv/add", newRecord);
      alert("Record added successfully!");
      // Reset form
      setNewRecord({
        csvIndex: "",
        name: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        currency: "",
        stock: "",
        ean: "",
        color: "",
        size: "",
        availability: "",
        internalId: "",
      });
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to add record");
    }
  };

  // ---------------- Delete Record ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/csv/delete/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete record");
    }
  };

  return (
    <div style={{ margin: "50px" }}>
      <h2>Upload CSV Data</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button className="btn btn-primary" onClick={handleUpload} style={{ marginLeft: "10px" }}>
        Upload
      </button>

      {/* ---------------- Add Record Form ---------------- */}
      <h3 style={{ marginTop: "40px" }}>Add New Record</h3>
      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "20px" }}>
        {Object.keys(newRecord).map((key) => (
          <input
            key={key}
            placeholder={key}
            value={newRecord[key]}
            onChange={(e) =>
              setNewRecord({ ...newRecord, [key]: e.target.value })
            }
            style={{ marginRight: "10px", marginBottom: "5px", width: "120px" }}
          />
        ))}
        <button className="btn btn-success" onClick={handleAddRecord}>Add</button>
      </div>

      {/* ---------------- Records Table ---------------- */}
      <h3>Records</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Index</th>
            <th>Name</th>
            <th>Description</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Currency</th>
            <th>Stock</th>
            <th>EAN</th>
            <th>Color</th>
            <th>Size</th>
            <th>Availability</th>
            <th>Internal ID</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.csvIndex}</td>
              <td>{r.name}</td>
              <td>{r.description}</td>
              <td>{r.brand}</td>
              <td>{r.category}</td>
              <td>{r.price}</td>
              <td>{r.currency}</td>
              <td>{r.stock}</td>
              <td>{r.ean}</td>
              <td>{r.color}</td>
              <td>{r.size}</td>
              <td>{r.availability}</td>
              <td>{r.internalId}</td>
              <td>
              <button className='btn btn-danger' onClick={() => handleDelete(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UploadData;
