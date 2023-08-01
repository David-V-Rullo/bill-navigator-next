"use client";
import React from "react";
interface CustomButtonProps {
  label: string;
  onClick: () => void;
  color: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  color,
  onClick,
  label,
}) => {
  const buttonClass = `bg-${color} rounded-md px-4 py-2 text-white cursor-pointer`;
  return <button className={buttonClass}>{label}</button>;
};

export default CustomButton;
