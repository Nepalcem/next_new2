"use client";

import { useCTRForm } from "./useCTRForm";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";

interface CTRFormProps {
  onSuccess?: () => void;
}

export default function CTRForm({ onSuccess }: CTRFormProps) {
  const {
    formData,
    errors,
    isCreating,
    setIsCreating,
    validateForm,
    handleInputChange,
    resetForm,
  } = useCTRForm();

  const handleCreateCTR = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsCreating(true);
    try {
      const response = await fetch("/api/ctr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        resetForm();
        onSuccess?.();
      }
    } catch (err) {
      console.error("Error creating CTR:", err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="mb-6 bg-white rounded-lg shadow max-w-2xl">
      <div className="px-4 py-2 border-b">
        <h2 className="text-base font-semibold">Create New CTR Record</h2>
      </div>

      <form onSubmit={handleCreateCTR} className="p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InputField
            label="Source *"
            name="source"
            value={formData.source}
            onChange={handleInputChange}
            error={errors.source}
            placeholder="e.g., Manual Entry"
          />

          <InputField
            label="PTM (1-20) *"
            name="ptm"
            type="number"
            min={1}
            max={20}
            value={formData.ptm}
            onChange={handleInputChange}
            error={errors.ptm}
          />

          <InputField
            label="Time Spent (minutes)"
            name="time_spent"
            type="number"
            min={1}
            value={formData.time_spent}
            onChange={handleInputChange}
            error={errors.time_spent}
          />

          <TextareaField
            label="Description *"
            name="description"
            rows={1}
            value={formData.description}
            onChange={handleInputChange}
            error={errors.description}
            placeholder="Describe the CTR activity..."
          />
        </div>

        <div className="mt-3">
          <button
            type="submit"
            disabled={isCreating}
            className="px-3 py-1 text-sm bg-violet-600 text-white rounded hover:bg-violet-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? "Creating..." : "Create CTR Record"}
          </button>
        </div>
      </form>
    </div>
  );
}
