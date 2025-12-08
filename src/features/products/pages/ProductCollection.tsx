import { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Footer, Header } from '@/shared/components/layout'

import { CategoryNav } from '@/features/categories'

import type { Product as ProductType } from '../types/product'
import { useAllProducts } from '../hooks/useProducts'
import { SortDropdown } from '../components/SortDropdown'
import {
  useCategories,
  useFilters,
  SidebarFilters,
  CategorySimpleType
} from '@/features/categories'

import ProductLoading from '../components/ProductLoading'
import ProductGrid from '../components/ProductGrid'

export type DynamicFilters = {
  selected: Record<string, string[]> // key: filter key (e.g., 'brand', 'ram'), value: selected values
  options: Record<string, { key: string; label: string; options: string[] }> // key: filter key, value: filter metadata
}

import { Pagination } from 'antd'
import { Chat } from '@/features/ai/components/Chat'
import { MessageCircle } from 'lucide-react'

const sortOptions = [
  { key: 'featured', label: 'featured' },
  { key: 'price-asc', label: 'Price: ascending' },
  { key: 'price-desc', label: 'Price: descending' },
  { key: 'newest', label: 'New Arrivals' }
]

export function ProductCollection() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>('featured')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const { collection } = useParams<{ collection: string }>()
  const categoryId =
    collection && collection !== 'all' ? parseInt(collection) : undefined

  // Fetch categories and filters from API
  const { data: categoriesData } = useCategories()
  const { data: filtersData, isLoading: isLoadingFilters } =
    useFilters(categoryId)

  // Map filter data from API to dynamic format
  const filterOptions = useMemo(() => {
    let filterArray: any[] = []

    if (filtersData) {
      if (filtersData.success && Array.isArray(filtersData.data)) {
        filterArray = filtersData.data
      } else if (Array.isArray(filtersData.data)) {
        filterArray = filtersData.data
      } else if (Array.isArray(filtersData)) {
        filterArray = filtersData
      }
    }

    // Build dynamic filter options map
    const options: Record<
      string,
      { key: string; label: string; options: string[] }
    > = {}

    filterArray.forEach((item: any) => {
      if (!item || typeof item !== 'object') return

      const key = item.key || ''
      const label =
        item.label ||
        key.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
      const values = Array.isArray(item.options) ? item.options : []

      if (values.length === 0) return

      // Use the key as the identifier (normalize to lowercase for consistency)
      const normalizedKey = key.toLowerCase()
      if (!options[normalizedKey]) {
        options[normalizedKey] = {
          key: normalizedKey,
          label: label,
          options: values
        }
      } else {
        // Merge options if key already exists
        const existing = options[normalizedKey]
        existing.options = [...new Set([...existing.options, ...values])]
      }
    })

    return options
  }, [filtersData])

  // Initialize filters state dynamically
  const [filters, setFilters] = useState<DynamicFilters>({
    selected: {},
    options: {}
  })

  // Update filter options when API data changes
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      options: filterOptions
    }))
  }, [filterOptions])

  // Map categories from API to CategoryNav format
  const categories = useMemo(() => {
    console.log('Categories Data:', categoriesData)
    if (!categoriesData || categoriesData?.length === 0) return []
    return categoriesData?.map(cat => ({
      id: cat.id,
      label: cat.name,
      icon: cat.image_url
    }))
  }, [categoriesData])

  const [filterString, setFilterString] = useState<string>('')

  // Fetch Products
  const [products, setProducts] = useState<ProductType[]>()
  const { data: allProducts, isLoading } = useAllProducts(
    collection || 'all',
    sortBy,
    filterString,
    currentPage,
    12
  )

  useEffect(() => {
    window.scrollTo(0, 0)
    setProducts(allProducts?.products)
    setTotalPages(allProducts ? allProducts.pagination.total_pages : 1)
  }, [allProducts, currentPage, filterString])

  // Dynamic filter string converter
  const convertFilterArrayToString = useCallback(() => {
    const filterParts: string[] = []

    Object.keys(filters.selected).forEach(filterKey => {
      const selectedValues = filters.selected[filterKey]
      if (selectedValues && selectedValues.length > 0) {
        // Use the filter key directly (backend will match it with FilterOption table)
        filterParts.push(`${filterKey}=${selectedValues.join(',')}`)
      }
    })

    return filterParts.join('&')
  }, [filters.selected])

  useEffect(() => {
    console.log('Selected Tags: ', selectedTags)
    setFilterString(convertFilterArrayToString())
    setCurrentPage(1)
  }, [sortBy, convertFilterArrayToString])

  // Dynamic filter change handler
  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters(prev => {
      const newSelected = { ...prev.selected }
      const currentValues = newSelected[filterKey] || []

      if (currentValues.includes(value)) {
        // Remove value
        newSelected[filterKey] = currentValues.filter(v => v !== value)
        setSelectedTags(prevTags => prevTags.filter(t => t !== value))
      } else {
        // Add value
        newSelected[filterKey] = [...currentValues, value]
        setSelectedTags(prevTags => {
          if (!prevTags.includes(value)) {
            return [...prevTags, value]
          }
          return prevTags
        })
      }

      return {
        ...prev,
        selected: newSelected
      }
    })
  }

  const handleClearAll = () => {
    setFilters(prev => ({
      ...prev,
      selected: {}
    }))
    setSelectedTags([])
  }

  const removeTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag))

    // Find and remove tag from all filter keys
    setFilters(prev => {
      const newSelected = { ...prev.selected }
      Object.keys(newSelected).forEach(key => {
        newSelected[key] = newSelected[key].filter(v => v !== tag)
        if (newSelected[key].length === 0) {
          delete newSelected[key]
        }
      })
      return {
        ...prev,
        selected: newSelected
      }
    })
  }

  const categoryList: CategorySimpleType[] = [
    { id: 'mobile', label: 'Mobile', icon: 'mobile' },
    { id: 'laptop', label: 'Laptop', icon: 'laptop' },
    { id: 'tablet', label: 'Tablet', icon: 'tablet' },
    { id: 'audio', label: 'Audio', icon: 'audio' },
    { id: 'wearable', label: 'Wearable', icon: 'wearable' },
    { id: 'camera', label: 'Camera', icon: 'camera' },
    { id: 'gaming', label: 'Gaming', icon: 'gaming' },
    { id: 'network', label: 'Network', icon: 'network' },
    { id: 'accessories', label: 'Accessories', icon: 'accessories' }
  ]

  const [selectedCategory, setSelectedCategory] = useState<string>('laptop')
  const [showChat, setShowChat] = useState<boolean>(false)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CategoryNav
        categories={categoryList}
        onCategoryChange={setSelectedCategory}
      />
      <div className="w-full bg-white pb-12">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[108px]">
          <div className="grid grid-cols-1 lg:grid-cols-[288px_1fr] gap-8">
            <div className="space-y-0">
              <SidebarFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAll}
                isLoading={isLoadingFilters}
              />
            </div>
            <div className="space-x-6">
              <div className="flex justify-end mb-4">
                <div className="font-light select-none inline-flex items-center gap-2 p-2 bg-white rounded-lg shadow-[0_2px_15px_-1px_rgba(113,113,113,0.12)] cursor-pointer">
                  <SortDropdown
                    options={sortOptions}
                    selected={sortBy}
                    onSelect={setSortBy}
                  />
                </div>
              </div>
              {isLoading && <ProductLoading />}
              {!isLoading && <ProductGrid products={products || []} />}
              {!isLoading && totalPages >= 1 && (
                <div className="flex justify-center mt-8">
                  <Pagination
                    current={currentPage}
                    total={totalPages}
                    onChange={() => setCurrentPage(currentPage)}
                  />
                </div>
              )}
            </div>
            {showChat && <Chat setShowChat={setShowChat} />}
            {!showChat && (
              <button
                onClick={() => setShowChat(true)}
                className="fixed right-8 bottom-8 w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
              >
                <MessageCircle className="w-6 h-6 text-neutral-gray-2D" />
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
