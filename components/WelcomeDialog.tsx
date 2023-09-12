"use client";
import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";
interface WelcomeDialogProps {
  onClose: () => void;
}
const WelcomeDialog: React.FC<WelcomeDialogProps> = ({ onClose }) => {
  return (
    <div className="dialog">
      <div className="flex justify-between items-center">
        <div className="font-bold text-3xl text-center ">
          Welcome to the Bill Navigator
        </div>

        <button onClick={onClose}>
          <FaRegTimesCircle />
        </button>
      </div>
    </div>
  );
};

export default WelcomeDialog;
