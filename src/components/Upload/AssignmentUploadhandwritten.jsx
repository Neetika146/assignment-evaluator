// import React, { useState } from "react";
// import axios from "axios";
// import { CloudUpload, FileText, FileCheck } from "lucide-react";

// const AssignmentUploadHandwritten = () => {
//   const [file, setFile] = useState(null);
//   const [reportJson, setReportJson] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setError("");
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError("Please select a file");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setReportJson(null);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("type", "handwritten");

//     try {
//       await axios.post("http://localhost:5000/upload", formData);
//       console.log("Upload successful");

//       await new Promise(resolve => setTimeout(resolve, 1000));

//       const reportResponse = await axios.get(`http://localhost:5000/get_report/${file.name}`);

//       if (reportResponse.data && reportResponse.data.report) {
//         setReportJson(reportResponse.data.report);
//       } else {
//         throw new Error("Empty response received");
//       }

//     } catch (err) {
//       console.error("Error fetching report:", err);
//       setError(`Report fetch failed: ${err.response?.status || err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
//       <h2 className="text-xl font-bold mb-4 text-center">Upload Handwritten Assignment</h2>

//       <div className="mb-4">
//         <label className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-blue-500">
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//           <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
//           <p className="mt-2 text-sm text-gray-600">
//             {file ? file.name : "Click to select a file"}
//           </p>
//         </label>
//       </div>

//       <button
//         onClick={handleUpload}
//         disabled={loading}
//         className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center disabled:bg-blue-300"
//       >
//         {loading ? "Uploading..." : (
//           <>
//             <FileCheck className="mr-2 h-5 w-5" />
//             Upload
//           </>
//         )}
//       </button>

//       {error && (
//         <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
//           <p className="text-red-600 text-sm whitespace-pre-line">{error}</p>
//         </div>
//       )}

//       {reportJson && (
//         <div className="mt-6 p-4 border border-gray-200 rounded-md">
//           <h3 className="text-lg font-semibold mb-4 flex items-center">
//             <FileText className="mr-2 h-5 w-5" />
//             Evaluation Report
//           </h3>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm text-left text-gray-700">
//               <tbody>
//                 {Object.entries(reportJson).map(([key, value]) => (
//                   <tr key={key} className="border-b border-gray-100">
//                     <td className="font-medium py-2 pr-4 capitalize">{key.replace(/_/g, " ")}</td>
//                     <td className="py-2">{value}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignmentUploadHandwritten;
import React, { useState } from "react";
import axios from "axios";
import { CloudUpload, FileText, FileCheck } from "lucide-react";
import "./AssignmentUploadhandwritten.css"; // Ensure this import 

const AssignmentUploadHandwritten = () => {
  const [file, setFile] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [reportJson, setReportJson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleUpload = async () => {
    if (!file || !studentName || !rollNumber) {
      setError("Please fill out all fields and select a file.");
      return;
    }

    setLoading(true);
    setError("");
    setReportJson(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("student_name", studentName);
    formData.append("roll_no", rollNumber);
    formData.append("type", "handwritten");

    try {
      await axios.post("http://localhost:5000/upload", formData);

      const reportResponse = await axios.get(`http://localhost:5000/get_report/${file.name}`);
      const savedFilename = reportResponse.data.filename;  // 👈 exact filename from backend

      if (reportResponse.data && reportResponse.data.report) {
        setReportJson(reportResponse.data.report);
      } else {
        throw new Error("Empty response received");
      }
    } catch (err) {
      setError(`Report fetch failed: ${err.response?.status || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assignment-upload-container">
      <h2 className="assignment-upload-heading">Upload Handwritten Assignment</h2>

      <input
        type="text"
        placeholder="Enter Student Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="form-input mb-3"
      />
      <input
        type="text"
        placeholder="Enter Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
        className="form-input mb-3"
      />

      <label className="file-upload-label mb-4">
        <input type="file" onChange={handleFileChange} className="hidden" />
        <CloudUpload className="mx-auto h-10 w-10" />
        <p className="text-sm mt-2">{file ? file.name : "Click to select a file"}</p>
      </label>

      <button
        onClick={handleUpload}
        disabled={loading}
        className="upload-button"
      >
        {loading ? "Uploading..." : (
          <>
            <FileCheck className="mr-2 h-5 w-5" />
            Upload
          </>
        )}
      </button>

      {error && <div className="mt-2 p-2 text-red-600">{error}</div>}

      {reportJson && (
        <div className="extracted-text-section">
          <h3 className="extracted-text-title">
            <FileText className="mr-2 h-5 w-5" />
            Evaluation Report
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(reportJson).map(([key, value]) => (
                  <tr key={key}>
                    <td className="py-2 pr-4 font-medium capitalize">{key.replace(/_/g, " ")}</td>
                    <td className="py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentUploadHandwritten;
