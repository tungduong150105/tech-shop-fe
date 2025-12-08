import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface SortDropdownProps {
  options: { key: string; label: string }[]
  selected: string
  onSelect: (value: string) => void
}

export function SortDropdown({
  options,
  selected,
  onSelect
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const dropdown = target.closest('.sort-dropdown')
      if (!dropdown) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative sort-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
      >
        <span>
          Sort by:{' '}
          <span className="font-medium">
            {options.find(o => o.key === selected)?.label}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-10 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48 z-10">
          {options.map(option => (
            <button
              key={option.key}
              onClick={() => {
                onSelect(option.key)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors ${
                selected === option.key
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
