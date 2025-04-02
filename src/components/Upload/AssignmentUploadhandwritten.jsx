import React, { useState } from "react";
import axios from "axios";
import { CloudUpload, FileText, FileCheck } from "lucide-react";

const AssignmentUploadHandwritten = () => {
  const [file, setFile] = useState(null);
  const [report, setReport] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "handwritten");

    try {
      await axios.post("http://localhost:5000/upload", formData);
      alert("File uploaded successfully!");

      const { data } = await axios.get(`http://localhost:5000/results/${file.name}`);
      setReport(data.report);
    } catch (error) {
      alert("Error uploading or fetching report");
      console.error(error);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-xl rounded-xl border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
        <CloudUpload className="w-8 h-8 mr-2 text-blue-500" /> Upload Handwritten Assignment
      </h1>

      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition"
        >
          {file ? <span>{file.name}</span> : <span>Click to select a file</span>}
        </label>
      </div>

      <button
        onClick={handleUpload}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Upload
      </button>

      {report && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h2 className="font-semibold mb-2 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-green-500" /> Evaluation Report
          </h2>
          <pre className="text-gray-600 bg-gray-100 p-2 rounded whitespace-pre-wrap">
            {report}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AssignmentUploadHandwritten;