import React, { useState } from "react";

interface Step1Props {
  data: {
    name: string;
    dob: string;
    email: string;
  };
  handleChange: (data: any) => void;
  nextStep: () => void;
}

const Step1: React.FC<Step1Props> = ({ data, handleChange, nextStep }) => {
  const [name, setName] = useState(data.name);
  const [dob, setDob] = useState(data.dob);
  const [email, setEmail] = useState(data.email);

  const handleSubmit = () => {
    handleChange({ name, dob, email });
    nextStep();
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white">
      <h3 className="text-xl font-bold mb-4">Step 1: Personal Information</h3>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-2 rounded-md mt-4 hover:bg-green-700 focus:outline-none"
      >
        Next
      </button>
    </div>
  );
};

export default Step1;
