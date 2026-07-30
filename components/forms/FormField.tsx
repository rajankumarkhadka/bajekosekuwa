import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
  registration?: UseFormRegisterReturn;
  error?: string;
  isTextArea?: boolean;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

export function FormField({
  label,
  type = 'text',
  placeholder,
  registration,
  error,
  isTextArea = false,
  rows = 4,
  disabled = false,
  className = '',
}: FormFieldProps) {
  const inputStyles = `
    w-full px-4 py-3.5 rounded-xl border bg-gray-50/50 text-gray-900 placeholder:text-gray-400
    text-sm font-medium transition-all duration-200 outline-none
    ${
      error
        ? 'border-red-500 bg-red-50/10 focus:border-red-600 focus:ring-4 focus:ring-red-500/10'
        : 'border-gray-200 hover:border-gray-300 focus:border-[#C4010F] focus:bg-white focus:ring-4 focus:ring-[#C4010F]/10'
    }
    disabled:opacity-50 disabled:cursor-not-allowed ${className}
  `;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-xs uppercase tracking-wider font-bold text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        {isTextArea ? (
          <textarea
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
            className={inputStyles}
            {...registration}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={inputStyles}
            {...registration}
          />
        )}
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 font-semibold animate-in fade-in slide-in-from-top-1 duration-200 mt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default FormField;
