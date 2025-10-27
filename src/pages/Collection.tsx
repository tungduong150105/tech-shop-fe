import { useState, useEffect } from 'react';
import { Smartphone, Monitor, Tablet, Headphones, Watch, Camera, Gamepad2, Network, Sun } from 'lucide-react';
import CategoryNav from '../components/collection/CategoryNav';
import FilterTagsBar from '../components/collection/FilterTagsBar';
import SidebarFilters from '../components/collection/SidebarFilters';
import SortDropdown from '../components/collection/SortDropdown';
import ProductGrid from '../components/collection/ProductGrid';
import Pagination from '../components/collection/Pagination';

type FilterType = {
  selectedBrands: string[];
  discount: boolean;
  priceMin: string;
  priceMax: string;
  selectedRam: string[];
  selectedScreenSize: string[];
  selectedProcessor: string[];
  selectedGpuBrand: string[];
  selectedDriveSize: string[];
  brandOptions: Array<{
    label: string;
    value: string;
    count: number;
  }>;
  ramOptions: string[];
  screenSizeOptions: string[];
  processorOptions: string[];
  gpuBrandOptions: string[];
  driveSizeOptions: string[];
};

const Collection = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(4);
  const [totalPages, setTotalPages] = useState(10);
  
  const [filters, setFilters] = useState<FilterType>({
    selectedBrands: [],
    discount: true,
    priceMin: '',
    priceMax: '',
    selectedRam: [],
    selectedScreenSize: [],
    selectedProcessor: [],
    selectedGpuBrand: [],
    selectedDriveSize: [],
    
    brandOptions: [
      // { label: 'Asus', value: 'Asus', count: 531 },
      // { label: 'Acer', value: 'Acer', count: 98 },
      // { label: 'Apple', value: 'Apple', count: 423 },
      // { label: 'Dell', value: 'Dell', count: 81 }
    ],
    ramOptions: [],
    screenSizeOptions: [],
    processorOptions: [],
    gpuBrandOptions: [],
    driveSizeOptions: []
  });

  const categories = [
    { icon: Smartphone, label: 'Mobile' },
    { icon: Monitor, label: 'Laptop' },
    { icon: Tablet, label: 'Tablet' },
    { icon: Headphones, label: 'Audio' },
    { icon: Watch, label: 'Wearable' },
    { icon: Camera, label: 'Camera' },
    { icon: Gamepad2, label: 'Gaming' },
    { icon: Network, label: 'Network' },
    { icon: Sun, label: 'Accessories' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'featured' },
    { value: 'price-asc', label: 'Price: ascending' },
    { value: 'price-desc', label: 'Price: descending' },
    { value: 'new', label: 'New Arrivals' }
  ];

  const products = [
    { id: 1, name: 'Apple MacBook Air 15" w/ Touch...', price: 2490.87, originalPrice: 3410.87, rating: 4.3, discount: 12, image: '🖥️', colors: 3 },
    { id: 2, name: 'Apple MacBook Air 15" w/ Touch...', price: 1299.00, originalPrice: 3410.87, rating: 4.9, discount: 12, image: '💻', colors: 3 },
    { id: 3, name: 'Apple MacBook Air 15" w/ Touch...', price: 2490.87, originalPrice: 3410.87, rating: 4.9, discount: 12, image: '💻', colors: 3 },
    { id: 4, name: 'Apple MacBook Air 15" w/ Touch...', price: 2490.87, originalPrice: 3410.87, rating: 4.7, discount: 12, image: '💻', colors: 3 },
    { id: 5, name: 'Apple MacBook Air 15" w/ Touch...', price: 1299.00, originalPrice: 3410.87, rating: 4.9, discount: 12, image: '💻', colors: 3 },
    { id: 6, name: 'Apple MacBook Air 15" w/ Touch...', price: 2490.87, originalPrice: 3410.87, rating: 4.8, discount: 12, image: '💻', colors: 3 },
    { id: 7, name: 'Apple MacBook Air 15" w/ Touch...', price: 2490.87, originalPrice: 3410.87, rating: 4.6, discount: 12, image: '💻', colors: 3 },
    { id: 8, name: 'Apple MacBook Air 15" w/ Touch...', price: 1299.00, originalPrice: 3410.87, rating: 4.5, discount: 12, image: '💻', colors: 3 },
    { id: 9, name: 'Apple MacBook Air 15" w/ Touch...', price: 1299.00, originalPrice: 3410.87, rating: 4.9, discount: 12, image: '💻', colors: 3 },
    { id: 10, name: 'Apple MacBook Air 15" w/ Touch...', price: 2165.10, originalPrice: 3460.00, rating: 4.3, discount: 12, image: '💻', colors: 3 },
    { id: 11, name: 'Apple MacBook Air 15" w/ Touch...', price: 1299.00, originalPrice: 3410.87, rating: 4.9, discount: 12, image: '💻', colors: 3 },
    { id: 12, name: 'Apple MacBook Air 15" w/ Touch...', price: 2490.87, originalPrice: 3410.87, rating: 4.3, discount: 12, image: '💻', colors: 3 },
    { id: 13, name: 'Apple MacBook Air 15" w/ Touch...', price: 2490.87, originalPrice: 3410.87, rating: 4.8, discount: 12, image: '💻', colors: 3 },
    { id: 14, name: 'Apple MacBook Air 15" w/ Touch...', price: 1299.00, originalPrice: 3410.87, rating: 4.9, discount: 12, image: '💻', colors: 3 },
    { id: 15, name: 'Apple MacBook Air 15" w/ Touch...', price: 2365.00, rating: 4.3, discount: 12, image: '💻', colors: 3 }
  ];

  const handleFilterChange = (filterType : string, value : any) => {
    setFilters(prev => {
      let newFilters = { ...prev };
      
      switch(filterType) {
        case 'brand':
          if (prev.selectedBrands.includes(value)) {
            newFilters.selectedBrands = prev.selectedBrands.filter(b => b !== value);
            setSelectedTags(tags => tags.filter(t => t !== value));
          } else {
            newFilters.selectedBrands = [...prev.selectedBrands, value];
            setSelectedTags(tags => [...tags, value]);
          }
          break;
        case 'discount':
          newFilters.discount = value;
          break;
        case 'price':
          newFilters.priceMin = value.min;
          newFilters.priceMax = value.max;
          break;
        case 'ram':
          if (prev.selectedRam.includes(value)) {
            newFilters.selectedRam = prev.selectedRam.filter(r => r !== value);
            setSelectedTags(tags => tags.filter(t => t !== value));
          } else {
            newFilters.selectedRam = [...prev.selectedRam, value];
            setSelectedTags(tags => [...tags, value]);
          }
          break;
        case 'screenSize':
          if (prev.selectedScreenSize.includes(value)) {
            newFilters.selectedScreenSize = prev.selectedScreenSize.filter(s => s !== value);
            setSelectedTags(tags => tags.filter(t => t !== value));
          } else {
            newFilters.selectedScreenSize = [...prev.selectedScreenSize, value];
            setSelectedTags(tags => [...tags, value]);
          }
          break;
        case 'processor':
          if (prev.selectedProcessor.includes(value)) {
            newFilters.selectedProcessor = prev.selectedProcessor.filter(p => p !== value);
            setSelectedTags(tags => tags.filter(t => t !== value));
          } else {
            newFilters.selectedProcessor = [...prev.selectedProcessor, value];
            setSelectedTags(tags => [...tags, value]);
          }
          break;
        case 'gpuBrand':
          if (prev.selectedGpuBrand.includes(value)) {
            newFilters.selectedGpuBrand = prev.selectedGpuBrand.filter(g => g !== value);
            setSelectedTags(tags => tags.filter(t => t !== value));
          } else {
            newFilters.selectedGpuBrand = [...prev.selectedGpuBrand, value];
            setSelectedTags(tags => [...tags, value]);
          }
          break;
        case 'driveSize':
          if (prev.selectedDriveSize.includes(value)) {
            newFilters.selectedDriveSize = prev.selectedDriveSize.filter(d => d !== value);
            setSelectedTags(tags => tags.filter(t => t !== value));
          } else {
            newFilters.selectedDriveSize = [...prev.selectedDriveSize, value];
            setSelectedTags(tags => [...tags, value]);
          }
          break;
        default:
          break;
      }
      
      return newFilters;
    });
  };

  const handleClearAll = () => {
    setFilters(prev => ({
      ...prev,
      selectedBrands: [],
      discount: false,
      priceMin: '',
      priceMax: '',
      selectedRam: [],
      selectedScreenSize: [],
      selectedProcessor: [],
      selectedGpuBrand: [],
      selectedDriveSize: []
    }));
    setSelectedTags([]);
  };

  const removeTag = (tag : string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
    
    setFilters(prev => ({
      ...prev,
      selectedBrands: prev.selectedBrands.filter(b => b !== tag),
      selectedRam: prev.selectedRam.filter(r => r !== tag),
      selectedScreenSize: prev.selectedScreenSize.filter(s => s !== tag),
      selectedProcessor: prev.selectedProcessor.filter(p => p !== tag),
      selectedGpuBrand: prev.selectedGpuBrand.filter(g => g !== tag),
      selectedDriveSize: prev.selectedDriveSize.filter(d => d !== tag)
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <CategoryNav categories={categories} />
      <FilterTagsBar tags={selectedTags} onRemoveTag={removeTag} />
      
      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-8">
        <SidebarFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
        />
        
        <div className="flex-1">
          <div className="flex justify-end mb-6">
            <SortDropdown 
              options={sortOptions}
              selected={sortBy}
              onSelect={setSortBy}
            />
          </div>
          
          <ProductGrid products={products} />
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Collection;