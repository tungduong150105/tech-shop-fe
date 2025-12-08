import CheckboxFilter from './FilterBox'
import { DynamicFilters } from '../types/filter'

type SidebarFiltersProps = {
  filters: DynamicFilters
  onFilterChange: (filterKey: string, value: string) => void
  onClearAll: () => void
  isLoading?: boolean
}

export function SidebarFilters({
  filters,
  onFilterChange,
  onClearAll,
  isLoading = false
}: SidebarFiltersProps) {
  const filterKeys = Object.keys(filters.options).sort()

  if (isLoading) {
    return (
      <div className="w-64 flex-shrink-0">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <div className="text-sm text-gray-500">Loading filters...</div>
      </div>
    )
  }

  if (filterKeys.length === 0) {
    return (
      <div className="w-64 flex-shrink-0">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <div className="text-sm text-gray-500">No filters available</div>
      </div>
    )
  }

  return (
    <div className="w-64 flex-shrink-0">
      <div className="flex items-center justify-between mb-6 px-3">
        <h2 className="text-lg font-normal">Filters</h2>
        <button
          onClick={onClearAll}
          className="text-sm text-blue-600 hover:underline"
        >
          Clear all
        </button>
      </div>

      {filterKeys.map((filterKey, index) => {
        const filterOption = filters.options[filterKey]
        const selectedValues = filters.selected[filterKey] || []

        if (
          !filterOption ||
          !filterOption.options ||
          filterOption.options.length === 0
        ) {
          return null
        }

        return (
          <div
            key={index}
            className="bg-white border-b-[0.5px] border-gray-600 mb-4"
          >
            <CheckboxFilter
              key={filterKey}
              label={filterOption.label}
              options={filterOption.options}
              selectedValues={selectedValues}
              onChange={(value: string) => onFilterChange(filterKey, value)}
            />
          </div>
        )
      })}
    </div>
  )
}
