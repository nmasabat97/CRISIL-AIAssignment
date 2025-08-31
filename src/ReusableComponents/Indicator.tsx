import React from "react";

interface IndicatorProps {
  progress: number;
  unhide: boolean;
}

const Indicator: React.FC<IndicatorProps> = ({ progress, unhide=true}) => {
  return (
    <div className="w-full p-4">
      <div className="bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-2 bg-green-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {unhide && <p className="text-center text-sm mt-2">{progress}% Complete</p>}
    </div>
  );
};

export default Indicator;
