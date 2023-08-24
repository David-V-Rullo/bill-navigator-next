"use client";
import React from "react";
interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  color: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  color,
  onClick,
  label,
}) => {
  return (
    <button
      className={"bg-blue rounded-lg p-3 py-3 text-center drop-shadow-lg"}
    >
      <div className="text-white font-semibold">{label}</div>
    </button>
  );
};

export default CustomButton;
