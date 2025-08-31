import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Indicator from "../ReusableComponents/Indicator";
import { useNavigate } from "react-router-dom";
import OverlayIcon from "./AI/OverlayIcon";

const MultiStepForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    tenthCert: null as File | null,
    twelfthCert: null as File | null,
    coverLetter: null as File | null,
  });

  const [step, setStep] = useState(1);

  const handleChange = (newData: any) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const progress = Math.floor(((step - 1) / 3) * 100);

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    navigate("/video");
  };

  return (
    <div className="">
      <div className="max-w-4xl mx-auto p-6">
        <p>Use Case: You are a student applying for internships at companies recommended by your college.</p>
        <p>After the profile is 100% complete, you will be redirected to the video tutorial as basic pre-requisite to join the program, or <p onClick={handleSubmit} className="underline text-purple-500">Jump directly to video tutorial here.</p></p>
        <Indicator progress={progress} unhide={true}/>
        <div className="bg-white shadow-lg rounded-md p-6 mt-6">
          {step === 1 && (
            <Step1 data={formData} handleChange={handleChange} nextStep={nextStep} />
          )}

          {step === 2 && (
            <Step2
              data={formData}
              handleChange={handleChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {step === 3 && (
            <Step3 data={formData} handleChange={handleChange} />
          )}

          {step === 3 && (
            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-400"
              >
                Previous
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="absolute right-0">
        <OverlayIcon />
      </div>
    </div>
  );
};

export default MultiStepForm;
