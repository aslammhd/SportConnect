import { Search } from "lucide-react";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

function SearchBar({
    value,
    onChange,
}: SearchBarProps) {
    return (
        <div className="relative w-full">
            <Search
                className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-gray-400
          pointer-events-none
        "
                size={18}
            />

            <input
                type="text"
                placeholder="Search by event or location..."
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="
          w-full
          rounded-xl
          border
          border-gray-200
          bg-gray-50
          py-2.5
          pl-11
          pr-4
          text-sm
          text-gray-900
          placeholder:text-gray-400
          outline-none
          transition-all
          duration-200
          hover:border-gray-300
          focus:border-blue-500
          focus:bg-white
          focus:ring-4
          focus:ring-blue-100
        "
            />
        </div>
    );
}

export default SearchBar;