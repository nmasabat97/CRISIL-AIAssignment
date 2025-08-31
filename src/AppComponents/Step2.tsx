import React, { useState } from "react";
import FileUpload from "../ReusableComponents/FileUpload";

interface Step2Props {
  data: {
    tenthCert: File | null;
    twelfthCert: File | null;
  };
  handleChange: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step2: React.FC<Step2Props> = ({ data, handleChange, nextStep, prevStep }) => {
  const [tenthCert, setTenthCert] = useState<File | null>(data.tenthCert);
  const [twelfthCert, setTwelfthCert] = useState<File | null>(data.twelfthCert);

  const handleFileChange = (field: "tenthCert" | "twelfthCert", file: File | null) => {
    handleChange({ [field]: file });
  };

  const handleSubmit = () => {
    nextStep();
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white">
      <h3 className="text-xl font-bold mb-4">Step 2: Certificates Upload</h3>
      <FileUpload label="10th Certificate" onFileChange={(file) => handleFileChange("tenthCert", file)} />
      <FileUpload label="12th Certificate" onFileChange={(file) => handleFileChange("twelfthCert", file)} />
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;
