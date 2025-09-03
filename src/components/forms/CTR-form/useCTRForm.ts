import { useState } from "react";
import { CTRFormData } from "@/types/app-types";
import { validators, parseValue } from "./validators";

const initialFormData: CTRFormData = {
  source: "",
  description: "",
  ptm: 0,
  time_spent: 30,
};

export function useCTRForm() {
  const [formData, setFormData] = useState<CTRFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCreating, setIsCreating] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    for (const key in validators) {
      const err = validators[key as keyof CTRFormData](
        formData[key as keyof CTRFormData]
      );
      if (err) newErrors[key] = err;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const parsed = parseValue(name, value);

    setFormData((prev) => ({ ...prev, [name]: parsed }));

    const validator = validators[name as keyof CTRFormData];
    if (validator) {
      const err = validator(parsed);
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (err) newErrors[name] = err;
        else delete newErrors[name];
        return newErrors;
      });
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isCreating,
    setIsCreating,
    validateForm,
    handleInputChange,
    resetForm,
  };
}
