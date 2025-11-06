import { useState, useEffect } from 'react'
import {
  Smartphone,
  Monitor,
  Tablet,
  Headphones,
  Watch,
  Camera,
  Gamepad2,
  Network,
  Sun
} from 'lucide-react'
import CategoryNav from '../components/collection/CategoryNav'
import FilterTagsBar from '../components/collection/FilterTagsBar'
import SidebarFilters from '../components/collection/SidebarFilters'
import SortDropdown from '../components/collection/SortDropdown'
import ProductGrid from '../components/collection/ProductGrid'
import Pagination from '../components/collection/Pagination'

import { useCollectionProducts } from '../hooks/useAllProducts'
import { ListProductRes } from '../types/product'

import { useParams } from 'react-router-dom';

type FilterType = {
  selectedBrands: string[]
  discount: boolean
  priceMin: string
  priceMax: string
  selectedRam: string[]
  selectedScreenSize: string[]
  selectedProcessor: string[]
  selectedGpuBrand: string[]
  selectedDriveSize: string[]
  brandOptions: string[]
  ramOptions: string[]
  screenSizeOptions: string[]
  processorOptions: string[]
  gpuBrandOptions: string[]
  driveSizeOptions: string[]
}

const Collection = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>('featured')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

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
      'Apple',
      'Samsung',
      'Dell',
      'HP',
      'Lenovo',
      'Asus',
      'Acer',
      'Microsoft',
      'Sony',
      'LG'
    ],
    ramOptions: ['4 GB', '8 GB', '16 GB', '32 GB', '64 GB'],
    screenSizeOptions: ['13 inch', '14 inch', '15 inch', '16 inch', '17 inch'],
    processorOptions: ['Intel', 'AMD', 'Apple M1', 'Apple M2'],
    gpuBrandOptions: ['NVIDIA', 'AMD', 'Intel Integrated'],
    driveSizeOptions: ['256 GB', '512 GB', '1 TB', '2 TB', '4 TB']
  })
  
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
  ]

  const sortOptions = [
    { value: 'featured', label: 'featured' },
    { value: 'price-asc', label: 'Price: ascending' },
    { value: 'price-desc', label: 'Price: descending' },
    { value: 'newest', label: 'New Arrivals' }
  ]

  const { collection } = useParams<{ collection: string }>()

  const [filterString, setFilterString] = useState<string>('')
  const [products, setProducts] = useState<ListProductRes>()
  const { data: allProducts, isLoading } = useCollectionProducts(
    collection || 'all',
    sortBy,
    filterString,
    currentPage,
    15
  )

  useEffect(() => {
    window.scrollTo(0, 0)
    setProducts(allProducts)
    setTotalPages(allProducts ? allProducts.pagination.total_pages : 1)
  }, [allProducts, currentPage, filterString])

  useEffect(() => {
    console.log('Selected Tags: ', selectedTags)
    setFilterString(convertFilterArrayToString())
    setCurrentPage(1)
  }, [sortBy, filters])

  const handleFilterChange = (filterType: string, value: any) => {
    console.log('call')
    setFilters(prev => {
      let newFilters = { ...prev }
      let newSelectedTags = [...selectedTags]

      switch (filterType) {
        case 'brand':
          if (prev.selectedBrands.includes(value)) {
            newFilters.selectedBrands = prev.selectedBrands.filter(
              b => b !== value
            )
            newSelectedTags = newSelectedTags.filter(t => t !== value)
          } else {
            newFilters.selectedBrands = [...prev.selectedBrands, value]
            if (newSelectedTags.includes(value) === false) {
              newSelectedTags.push(value)
            }
          }
          break
        case 'discount':
          newFilters.discount = value
          break
        case 'price':
          newFilters.priceMin = value.min
          newFilters.priceMax = value.max
          break
        case 'ram':
          if (prev.selectedRam.includes(value)) {
            newFilters.selectedRam = prev.selectedRam.filter(r => r !== value)
            newSelectedTags = newSelectedTags.filter(t => t !== value)
          } else {
            newFilters.selectedRam = [...prev.selectedRam, value]
            if (newSelectedTags.includes(value) === false) {
              newSelectedTags.push(value)
            }
          }
          break
        case 'screenSize':
          if (prev.selectedScreenSize.includes(value)) {
            newFilters.selectedScreenSize = prev.selectedScreenSize.filter(
              s => s !== value
            )
            newSelectedTags = newSelectedTags.filter(t => t !== value)
          } else {
            newFilters.selectedScreenSize = [...prev.selectedScreenSize, value]
            if (newSelectedTags.includes(value) === false) {
              newSelectedTags.push(value)
            }
          }
          break
        case 'processor':
          if (prev.selectedProcessor.includes(value)) {
            newFilters.selectedProcessor = prev.selectedProcessor.filter(
              p => p !== value
            )
            newSelectedTags = newSelectedTags.filter(t => t !== value)
          } else {
            newFilters.selectedProcessor = [...prev.selectedProcessor, value]
            if (newSelectedTags.includes(value) === false) {
              newSelectedTags.push(value)
            }
          }
          break
        case 'gpuBrand':
          if (prev.selectedGpuBrand.includes(value)) {
            newFilters.selectedGpuBrand = prev.selectedGpuBrand.filter(
              g => g !== value
            )
            newSelectedTags = newSelectedTags.filter(t => t !== value)
          } else {
            newFilters.selectedGpuBrand = [...prev.selectedGpuBrand, value]
            if (newSelectedTags.includes(value) === false) {
              newSelectedTags.push(value)
            }
          }
          break
        case 'driveSize':
          if (prev.selectedDriveSize.includes(value)) {
            newFilters.selectedDriveSize = prev.selectedDriveSize.filter(
              d => d !== value
            )
            newSelectedTags = newSelectedTags.filter(t => t !== value)
          } else {
            newFilters.selectedDriveSize = [...prev.selectedDriveSize, value]
            if (newSelectedTags.includes(value) === false) {
              newSelectedTags.push(value)
            }
          }
          break
        default:
          break
      }

      setSelectedTags(newSelectedTags)
      return newFilters
    })
  }

  function convertFilterArrayToString() {
    let newFilter = ''
    let prev = false
    if (filters.selectedBrands.length !== 0) {
      if (prev) {
        newFilter += `&`
      }
      newFilter += `brands=`
      let first = true
      for (const brand of filters.selectedBrands) {
        if (!first) {
          newFilter += `,`
        }
        first = false
        newFilter += `${brand}`
      }
      prev = true
    }
    if (filters.selectedRam.length !== 0) {
      if (prev) {
        newFilter += `&`
      }
      newFilter += `ram=`
      let first = true
      for (const ram of filters.selectedRam) {
        if (!first) {
          newFilter += `,`
        }
        first = false
        newFilter += `${ram}`
      }
      prev = true
    }
    if (filters.selectedGpuBrand.length !== 0) {
      if (prev) {
        newFilter += `&`
      }
      newFilter += `gpu_brand=`
      let first = true
      for (const gpu of filters.selectedGpuBrand) {
        if (!first) {
          newFilter += `,`
        }
        first = false
        newFilter += `${gpu}`
      }
      prev = true
    }
    if (filters.selectedProcessor.length !== 0) {
      if (prev) {
        newFilter += `&`
      }
      newFilter += `processor=`
      let first = true
      for (const processor of filters.selectedProcessor) {
        if (!first) {
          newFilter += `,`
        }
        first = false
        newFilter += `${processor}`
      }
      prev = true
    }
    if (filters.selectedDriveSize.length !== 0) {
      if (prev) {
        newFilter += `&`
      }
      newFilter += `screen_size=`
      let first = true
      for (const screen of filters.selectedScreenSize) {
        if (!first) {
          newFilter += `,`
        }
        first = false
        newFilter += `${screen}`
      }
      prev = true
    }
    if (filters.selectedDriveSize.length !== 0) {
      if (prev) {
        newFilter += `&`
      }
      newFilter += `drive_size=`
      let first = true
      for (const drive of filters.selectedDriveSize) {
        if (!first) {
          newFilter += `,`
        }
        first = false
        newFilter += `${drive}`
      }
      prev = true
    }
    newFilter = newFilter.replace(/\s/g, '')
    return newFilter
  }

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
    }))
    setSelectedTags([])
  }

  const removeTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag))

    setFilters(prev => ({
      ...prev,
      selectedBrands: prev.selectedBrands.filter(b => b !== tag),
      selectedRam: prev.selectedRam.filter(r => r !== tag),
      selectedScreenSize: prev.selectedScreenSize.filter(s => s !== tag),
      selectedProcessor: prev.selectedProcessor.filter(p => p !== tag),
      selectedGpuBrand: prev.selectedGpuBrand.filter(g => g !== tag),
      selectedDriveSize: prev.selectedDriveSize.filter(d => d !== tag)
    }))
  }

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

          {isLoading && <div>Loading products...</div>}
          {!isLoading && <ProductGrid products={products?.products || []} />}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default Collection
