// import React, { useState } from "react";
// import axios from "axios";
// import { CloudUpload, FileText, FileCheck } from "lucide-react";

// const AssignmentUpload = () => {
//   const [file, setFile] = useState(null);
//   const [report, setReport] = useState("");

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//   };

//   const handleUpload = async () => {
//     if (!file) return alert("Please select a file");

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("type", "typed");

//     try {
//       await axios.post("http://localhost:5000/upload", formData);
//       alert("File uploaded successfully!");

//       const { data } = await axios.get(`http://localhost:5000/results/reports/${file.name}_report.md`);
//       setReport(data.report);
//     } catch (error) {
//       alert("Error uploading or fetching report");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="p-8 max-w-2xl mx-auto bg-white shadow-xl rounded-xl border border-gray-200">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
//         <CloudUpload className="w-8 h-8 mr-2 text-blue-500" /> Upload Typed Assignment
//       </h1>

//       <div className="mb-4">
//         <input
//           type="file"
//           onChange={handleFileChange}
//           className="hidden"
//           id="file-upload"
//         />
//         <label
//           htmlFor="file-upload"
//           className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition"
//         >
//           {file ? <span>{file.name}</span> : <span>Click to select a file</span>}
//         </label>
//       </div>

//       <button
//         onClick={handleUpload}
//         className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//       >
//         Upload
//       </button>

//       {report && (
//         <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
//           <h2 className="font-semibold mb-2 flex items-center">
//             <FileText className="w-5 h-5 mr-2 text-green-500" /> Evaluation Report
//           </h2>
//           <pre className="text-gray-600 bg-gray-100 p-2 rounded whitespace-pre-wrap">
//             {report}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignmentUpload;

// import React, { useState } from "react";
// import axios from "axios";
// import { CloudUpload, FileText, FileCheck } from "lucide-react";

// const AssignmentUpload = () => {
//   const [file, setFile] = useState(null);
//   const [report, setReport] = useState("");
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

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("type", "typed");

//     try {
//       // Upload the file
//       const uploadResponse = await axios.post("http://localhost:5000/upload", formData);
//       console.log("Upload successful:", uploadResponse.data);
      
      
//       // Get the report filename from the response if available, or construct it
//       let reportFileName;
//       if (uploadResponse.data && uploadResponse.data.reportPath) {
//         // If server returns the exact path to use
//         reportFileName = uploadResponse.data.reportPath;
//       } else {
//         // Construct the path - remove file extension first
//         const baseName = file.name;
//         reportFileName = `${baseName}_raw_evaluation.txt`;
//         // const baseName = file.name.replace(/\.[^/.]+$/, "");
//         // reportFileName = `${baseName}.pdf_raw_evaluation.txt`;
//       }
      
//       // Wait a moment for the server to generate the report
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       try {
//         // Fetch the report with proper path
//         const reportResponse = await axios.get(`http://localhost:3000/results/reports/${reportFileName}`);
        
//         // Check if we got actual content back
//         if (reportResponse.data) {
//           // Handle different response formats
//           if (typeof reportResponse.data === 'object' && reportResponse.data.report) {
//             setReport(reportResponse.data.report);
//           } else if (typeof reportResponse.data === 'string') {
//             // If the API returns the report text directly
//             setReport(reportResponse.data);
//           } else {
//             console.log("Unexpected response format:", reportResponse.data);
//             setReport(JSON.stringify(reportResponse.data));
//           }
//         } else {
//           throw new Error("Empty response received");
//         }
//       } catch (reportError) {
//         console.error("Error fetching report:", reportError);
//         setError(`Report fetch failed: ${reportError.response?.status || reportError.message}. 
//                   Check server logs and verify endpoint: /results/reports/${reportFileName}`);
//       }
//     } catch (uploadError) {
//       console.error("Error uploading file:", uploadError);
//       setError("File upload failed: " + (uploadError.response?.data?.message || uploadError.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
//       <h2 className="text-xl font-bold mb-4 text-center">Upload Typed Assignment</h2>
      
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
      
//       {report && (
//         <div className="mt-6 p-4 border border-gray-200 rounded-md">
//           <h3 className="text-lg font-semibold mb-2 flex items-center">
//             <FileText className="mr-2 h-5 w-5" />
//             Evaluation Report
//           </h3>
//           <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto whitespace-pre-wrap">
//             {report}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignmentUpload;

// import React, { useState } from "react";
// import axios from "axios";
// import { CloudUpload, FileText, FileCheck } from "lucide-react";

// const AssignmentUpload = () => {
//   const [file, setFile] = useState(null);
//   const [report, setReport] = useState("");
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

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("type", "typed");

//     try {
//       // Upload the file
//       const uploadResponse = await axios.post("http://localhost:5000/upload", formData);
//       console.log("Upload successful:", uploadResponse.data);
      
//       // Get the report filename from the response if available, or construct it
//       let reportFileName;
//       if (uploadResponse.data && uploadResponse.data.reportPath) {
//         // If server returns the exact path to use
//         reportFileName = uploadResponse.data.reportPath;
//       } else {
//         // Keep the original file extension in the report name
//         const baseName = file.name;
//         reportFileName = `${baseName}_raw_evaluation.txt`;
//       }
      
//       console.log("Attempting to fetch report at:", reportFileName);
      
//       // Wait longer for the server to generate the report
//       await new Promise(resolve => setTimeout(resolve, 10000));
      
//       try {
//         // Fetch the report with proper path - ensure port matches upload endpoint
//         // console.log(reportFileName)
//         const reportResponse = await axios.get(`http://localhost:3000/results/reports/${reportFileName}`);
       
        
//         // Check if we got actual content back
//         if (reportResponse.data) {
//           // Handle different response formats
//           if (typeof reportResponse.data === 'object' && reportResponse.data.report) {
//             setReport(reportResponse.data.report);
//           } else if (typeof reportResponse.data === 'string') {
//             // If the API returns the report text directly
//             setReport(reportResponse.data);
//           } else {
//             console.log("Unexpected response format:", reportResponse.data);
//             setReport(JSON.stringify(reportResponse.data));
//           }
//         } else {
//           throw new Error("Empty response received");
//         }
//       } catch (reportError) {
//         console.error("Error fetching report:", reportError);
//         setError(`Report fetch failed: ${reportError.response?.status || reportError.message}. 
//                   Check server logs and verify endpoint: /results/reports/${reportFileName}`);
//       }
//     } catch (uploadError) {
//       console.error("Error uploading file:", uploadError);
//       setError("File upload failed: " + (uploadError.response?.data?.message || uploadError.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
//       <h2 className="text-xl font-bold mb-4 text-center">Upload Typed Assignment</h2>
      
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
      
//       {report && (
//         <div className="mt-6 p-4 border border-gray-200 rounded-md">
//           <h3 className="text-lg font-semibold mb-2 flex items-center">
//             <FileText className="mr-2 h-5 w-5" />
//             Evaluation Report
//           </h3>
//           <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto whitespace-pre-wrap">
//             {report}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignmentUpload;

// import React, { useState } from "react";
// import axios from "axios";
// import { CloudUpload, FileText, FileCheck } from "lucide-react";

// const AssignmentUpload = () => {
//   const [file, setFile] = useState(null);
//   const [report, setReport] = useState("");
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

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("type", "typed");

//     try {
//       // Upload the file
//       const uploadResponse = await axios.post("http://localhost:5000/upload", formData);
//       console.log("Upload successful:", uploadResponse.data);
      
//       // Wait for server to process the file
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       try {
//         // Create the correct filename for the JSON report
//         // const reportFileName = `${file.name}_raw_evaluation.txt`;
//         // console.log("Attempting to fetch report:", reportFileName);
        
//         // // Fetch JSON report
//         const baseName = file.name;
//         const reportResponse = await axios.get(`http://localhost:5000/results/reports/${baseName}`);
//         // // const reportResponse = await axios.get(`http://localhost:5000/results/reports/${file.name}`);


//         // setReport(reportResponse.data);
//         // // const reportResponse = await axios.get(`http://localhost:5000/report/${reportFileName}`);
        
//         // // Simply set the entire JSON response to be displayed
//         // if (reportResponse.data) {
//         //   setReportJson(reportResponse.data);
//         // } else {
//         //   throw new Error("Empty response received");
//         // }

        
        
//       } catch (reportError) {
//         console.error("Error fetching report:", reportError);
//         setError(`Report fetch failed: ${reportError.response?.status || reportError.message}`);
//       }
//     } catch (uploadError) {
//       console.error("Error uploading file:", uploadError);
//       setError("File upload failed: " + (uploadError.response?.data?.message || uploadError.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
//       <h2 className="text-xl font-bold mb-4 text-center">Upload Typed Assignment</h2>
      
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
//     <div className="mt-6 p-4 border border-gray-200 rounded-md">
//       <h3 className="text-lg font-semibold mb-2 flex items-center">
//         <FileText className="mr-2 h-5 w-5" />
//         Evaluation Report
//       </h3>
//       <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto whitespace-pre-wrap text-sm">
//         {JSON.stringify(reportJson, null, 2)}
//       </pre>
//     </div>
//   )}



//     </div>
//   );
// };

// export default AssignmentUpload;

// import React, { useState } from "react";
// import axios from "axios";
// import { CloudUpload, FileText, FileCheck } from "lucide-react";

// const AssignmentUpload = () => {
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
//     formData.append("type", "typed");

//     try {
//       // Upload
//       await axios.post("http://localhost:5000/upload", formData);
//       console.log("Upload successful");

//       // Wait briefly for processing
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Fetch JSON report
//       const response = await axios.get(`http://localhost:5000/get_report/${file.name}`);
//       if (response.data && response.data.report) {
//         setReportJson(response.data.report);
//       } else {
//         throw new Error("Report not found");
//       }
//     } catch (err) {
//       console.error("Error fetching report:", err);
//       setError(`Fetch failed: ${err.response?.status || err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
//       <h2 className="text-xl font-bold mb-4 text-center">Upload Typed Assignment</h2>

//       <div className="mb-4">
//         <label className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-blue-500">
//           <input type="file" onChange={handleFileChange} className="hidden" />
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

// {reportJson && (
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

// export default AssignmentUpload;

import React, { useState } from "react";
import axios from "axios";
import { CloudUpload, FileText, FileCheck } from "lucide-react";
import "./AssignmentUpload.css"; // Ensure this import is included

const AssignmentUpload = () => {
  const [file, setFile] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [studentRoll, setStudentRoll] = useState("");
  const [reportJson, setReportJson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleUpload = async () => {
    if (!file || !studentName.trim() || !studentRoll.trim()) {
      setError("Please fill all the fields and select a file.");
      return;
    }

    setLoading(true);
    setError("");
    setReportJson(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "typed");
    formData.append("student_name", studentName);
    formData.append("roll_no", studentRoll);

    try {
      const uploadRes = await axios.post("http://localhost:5000/upload", formData);
      const savedFilename = uploadRes.data.filename;  // 👈 exact filename from backend

      console.log("Upload successful");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await axios.get(`http://localhost:5000/get_report/${savedFilename}`);

      if (response.data && response.data.report) {
        setReportJson(response.data.report);
      } else {
        throw new Error("Report not found");
      }
    } catch (err) {
      console.error("Error fetching report:", err);
      setError(`Fetch failed: ${err.response?.status || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assignment-upload-container">
      <h2 className="assignment-upload-heading">Upload Typed Assignment</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={studentRoll}
          onChange={(e) => setStudentRoll(e.target.value)}
          className="input-field"
        />
      </div>

      <label className="file-upload-label">
        <input type="file" onChange={handleFileChange} className="hidden" />
        <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm file-name">
          {file ? file.name : "Click to select a file"}
        </p>
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

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm whitespace-pre-line">{error}</p>
        </div>
      )}

      {reportJson && (
        <div className="extracted-text-section">
          <h3 className="extracted-text-title">
            <FileText className="mr-2 h-5 w-5" />
            Evaluation Report
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <tbody>
                {Object.entries(reportJson).map(([key, value]) => (
                  <tr key={key} className="border-b border-gray-100">
                    <td className="font-medium py-2 pr-4 capitalize">
                      {key.replace(/_/g, " ")}
                    </td>
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

export default AssignmentUpload;
