import React, { useState } from "react";
import FileUpload from "../ReusableComponents/FileUpload";

interface Step3Props {
  data: {
    coverLetter: File | null;
  };
  handleChange: (data: any) => void;
}

const Step3: React.FC<Step3Props> = ({ data, handleChange }) => {
  const [coverLetter, setCoverLetter] = useState<File | null>(data.coverLetter);

  const handleFileChange = (file: File | null) => {
    handleChange({ coverLetter: file });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white">
      <h3 className="text-xl font-bold mb-4">Step 3: Cover Letter Upload</h3>
      <FileUpload label="Cover Letter" onFileChange={handleFileChange} />
    </div>
  );
};

export default Step3;
