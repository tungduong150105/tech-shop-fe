import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

const CheckboxFilter = ({ label, options, selectedValues, onChange }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="mb-6">
      <button 
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full mb-3"
      >
        <span className="font-medium">{label}</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {expanded && (
        <div className="space-y-2">
          {options.map((option, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={selectedValues.includes(option.value || option)}
                onChange={() => onChange(option.value || option)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">{option.label || option}</span>
              {option.count && <span className="text-xs text-gray-400">({option.count})</span>}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxFilter