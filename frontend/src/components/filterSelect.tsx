import {
  ChevronDown,
} from "lucide-react";

import type {
  SelectOption,
} from "../types/selectOption";

interface FilterSelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <div className="w-full">
      <label
        className="
          mb-1.5
          block
          text-xs
          font-semibold
          uppercase
          tracking-wide
          text-gray-500
        "
      >
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="
            w-full
            appearance-none
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            px-4
            py-2.5
            pr-10
            text-sm
            font-medium
            text-gray-800
            outline-none
            transition-all
            duration-200
            hover:border-gray-300
            focus:border-blue-500
            focus:bg-white
            focus:ring-4
            focus:ring-blue-100
          "
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={17}
          className="
            pointer-events-none
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />
      </div>
    </div>
  );
}

export default FilterSelect;