// components/ProfessorDetailsPopup.tsx

import React from "react";
import { Professor2 } from "@/app/lib/definitions"; // Assuming you have a types file
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";

interface ProfessorDetailsPopupProps {
  professor: Professor2 | null;
  onClose: () => void;
}

export default function ProfessorDetailsPopup({
  professor,
  onClose,
}: ProfessorDetailsPopupProps) {
  if (!professor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Professor Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        <div>
          <p>
            <strong>ID:</strong> {professor.id}
          </p>
          <p>
            <strong>Name:</strong> {professor.name}
          </p>
          <p>
            <strong>Department:</strong> {professor.department}
          </p>
          <p>
            <strong>Position:</strong> {professor.position}
          </p>
          <p>
            <strong>Degree:</strong> {professor.degree}
          </p>
          <p>
            <strong>Address:</strong> {professor.address}
          </p>
          <p>
            <strong>Phone:</strong> {professor.phone}
          </p>
          <p>
            <strong>Table ID:</strong> {professor.tabel_id}
          </p>
          <p>
            <strong>Wage:</strong> {formatCurrency(professor.wage)}
          </p>
          <p>
            <strong>Start Date:</strong>{" "}
            {formatDateToLocal(professor.start_date)}
          </p>
        </div>
      </div>
    </div>
  );
}
