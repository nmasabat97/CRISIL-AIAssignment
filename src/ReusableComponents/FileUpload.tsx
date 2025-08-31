import React from "react";

interface FileUploadProps {
  label: string;
  onFileChange: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onFileChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type === "application/pdf") {
      onFileChange(file);
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-lg font-medium mb-2">{label}</label>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
};

export default FileUpload;
