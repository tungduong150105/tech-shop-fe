import { ChevronUp, ChevronDown } from 'lucide-react'

import CheckboxFilter from './CheckboxFilter'
import ToggleFilter from './ToggleFilter'
import PriceRangeFilter from './PriceRangeFilter'

const SidebarFilters = ({ filters, onFilterChange, onClearAll }) => {
  return (
    <div className="w-64 flex-shrink-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button onClick={onClearAll} className="text-sm text-blue-600 hover:underline">
          Clear all
        </button>
      </div>

      <CheckboxFilter 
        label="Brand" 
        options={filters.brandOptions}
        selectedValues={filters.selectedBrands}
        onChange={(value) => onFilterChange('brand', value)}
      />

      {/* <div className="mb-6"> */}
      {/*   <button className="flex items-center justify-between w-full mb-3"> */}
      {/*     <span className="font-medium">Color</span> */}
      {/*     <ChevronDown className="w-4 h-4" /> */}
      {/*   </button> */}
      {/* </div> */}

      {/* <ToggleFilter  */}
      {/*   label="Discount"  */}
      {/*   checked={filters.discount} */}
      {/*   onChange={() => onFilterChange('discount', !filters.discount)} */}
      {/* /> */}
      {/**/}
      {/* <PriceRangeFilter  */}
      {/*   min={filters.priceMin} */}
      {/*   max={filters.priceMax} */}
      {/*   onChange={(min, max) => onFilterChange('price', { min, max })} */}
      {/* /> */}

      <CheckboxFilter 
        label="RAM" 
        options={filters.ramOptions}
        selectedValues={filters.selectedRam}
        onChange={(value : string) => onFilterChange('ram', value)}
      />

      <CheckboxFilter 
        label="Screen Size" 
        options={filters.screenSizeOptions}
        selectedValues={filters.selectedScreenSize}
        onChange={(value) => onFilterChange('screenSize', value)}
      />

      <CheckboxFilter 
        label="Processor" 
        options={filters.processorOptions}
        selectedValues={filters.selectedProcessor}
        onChange={(value) => onFilterChange('processor', value)}
      />

      <CheckboxFilter 
        label="GPU Brand" 
        options={filters.gpuBrandOptions}
        selectedValues={filters.selectedGpuBrand}
        onChange={(value) => onFilterChange('gpuBrand', value)}
      />

      <CheckboxFilter 
        label="Drive Size" 
        options={filters.driveSizeOptions}
        selectedValues={filters.selectedDriveSize}
        onChange={(value) => onFilterChange('driveSize', value)}
      />
    </div>
  );
};

export default SidebarFilters
