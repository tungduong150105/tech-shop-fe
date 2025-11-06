import React, { useState, useEffect, useMemo, useCallback } from 'react'
import CategoryNav from '../components/collection/CategoryNav'
import FilterTagsBar from '../components/collection/FilterTagsBar'
import SidebarFilters from '../components/collection/SidebarFilters'
import SortDropdown from '../components/collection/SortDropdown'
import ProductGrid from '../components/collection/ProductGrid'
import Pagination from '../components/collection/Pagination'

import { useCollectionProducts } from '../hooks/useProducts'
import { useCategories } from '../hooks/useCategories'
import { useFilters } from '../hooks/useFilters'
import { ListProductRes } from '../types/product'

import { useParams } from 'react-router-dom'

// Dynamic filter type - key is the filter key from API, value is array of selected values
export type DynamicFilters = {
  selected: Record<string, string[]> // key: filter key (e.g., 'brand', 'ram'), value: selected values
  options: Record<string, { key: string; label: string; options: string[] }> // key: filter key, value: filter metadata
}

const Collection = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>('featured')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const { collection } = useParams<{ collection: string }>()
  const categoryId =
    collection && collection !== 'all' ? parseInt(collection) : undefined

  // Fetch categories and filters from API
  const { data: categoriesData } = useCategories()
  const {
    data: filtersData,
    isLoading: isLoadingFilters,
    error: filtersError
  } = useFilters(categoryId)

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
        key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
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
    if (!categoriesData || categoriesData.length === 0) return []
    return categoriesData.map(cat => ({
      id: cat.id,
      name: cat.name,
      image_url: cat.image_url
    }))
  }, [categoriesData])

  const sortOptions = [
    { value: 'featured', label: 'featured' },
    { value: 'price-asc', label: 'Price: ascending' },
    { value: 'price-desc', label: 'Price: descending' },
    { value: 'newest', label: 'New Arrivals' }
  ]

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <div className="min-h-screen bg-white">
      {categories.length > 0 && <CategoryNav categories={categories} />}
      <FilterTagsBar tags={selectedTags} onRemoveTag={removeTag} />

      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-8">
        <SidebarFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
          isLoading={isLoadingFilters}
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
