// src/components/Upload/AssignmentUpload.jsx
import React, { useState } from "react";
import { CloudUpload, FileText, FileCheck } from "lucide-react";

const AssignmentUpload = () => {
   const [file, setFile] = useState(null);
   const [extractedText, setExtractedText] = useState("");

   const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
   };

   const handleUpload = () => {
      if (file) {
         setTimeout(() => {
            setExtractedText("Sample extracted text from OCR.");
         }, 1000);
      }
   };

   const handleGeneratePDF = () => {
      const pdfContent = `Extracted Text:\n${extractedText}`;
      const blob = new Blob([pdfContent], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "extracted_text.pdf";
      a.click();
      URL.revokeObjectURL(url);
   };

   return (
      <div className="p-8 max-w-2xl mx-auto bg-white shadow-xl rounded-xl border border-gray-200">
         <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
            <CloudUpload className="w-8 h-8 mr-2 text-blue-500" /> Upload Assignment
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
               {file ? (
                  <span className="text-gray-700 font-medium">{file.name}</span>
               ) : (
                  <span className="text-gray-400">Click to select a file</span>
               )}
            </label>
         </div>

         <button
            onClick={handleUpload}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
         >
            Upload
         </button>

         {extractedText && (
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
               <h2 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-green-500" /> Extracted Text
               </h2>
               <p className="text-gray-600 bg-gray-100 p-2 rounded">{extractedText}</p>
               <button
                  onClick={handleGeneratePDF}
                  className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition flex items-center justify-center"
               >
                  <FileCheck className="w-5 h-5 mr-2" /> Generate PDF
               </button>
            </div>
         )}
      </div>
   );
};

export default AssignmentUpload;
