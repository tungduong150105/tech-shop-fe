import React, { useState, useEffect, useMemo, useCallback } from 'react'
import CategoryNav from '../components/collection/CategoryNav'
import FilterTagsBar from '../components/collection/FilterTagsBar'
import SidebarFilters from '../components/collection/SidebarFilters'
import SortDropdown from '../components/collection/SortDropdown'
import ProductGrid from '../components/collection/ProductGrid'
import Pagination from '../components/collection/Pagination'
import { ProductGridSkeleton, SectionSkeleton } from '../components/common/LoadingSkeleton'

import { useCollectionProducts, useSearchProducts } from '../hooks/useProducts'
import { useCategories } from '../hooks/useCategories'
import { useFilters } from '../hooks/useFilters'
import { ListProductRes } from '../types/product'

import { useParams, useSearchParams } from 'react-router-dom'

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
  const [searchParams] = useSearchParams()
  const searchQuery = useMemo(
    () => (searchParams.get('search') || '').trim(),
    [searchParams]
  )

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

  const mappedSort = useMemo(() => {
    switch (sortBy) {
      case 'price-asc':
        return 'price-asc'
      case 'price-desc':
        return 'price-desc'
      case 'newest':
        return 'newest'
      default:
        return 'popular'
    }
  }, [sortBy])

  const [filterString, setFilterString] = useState<string>('')
  const [products, setProducts] = useState<ListProductRes>()
  const { data: allProducts, isLoading } = useCollectionProducts(
    collection || 'all',
    sortBy,
    filterString,
    currentPage,
    15
  )
  const { data: searchResults, isLoading: isSearching } = useSearchProducts(
    searchQuery,
    {
      sort: mappedSort as any,
      page: currentPage,
      limit: 15,
      category_id: categoryId
    }
  )

  useEffect(() => {
    if (searchQuery) {
      setCurrentPage(1)
    }
  }, [searchQuery])

  useEffect(() => {
    const source = searchQuery ? searchResults : allProducts
    if (source) {
      setProducts(source)
      const total = source.pagination?.total_pages || 1
      setTotalPages(total)
    }
  }, [allProducts, searchResults, searchQuery])

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

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
    const newFilterString = convertFilterArrayToString()
    setFilterString(newFilterString)
    setCurrentPage(1) // Reset to page 1 when filters or sort change
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
    setCurrentPage(1) // Reset to page 1 when clearing filters
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

          {(searchQuery ? isSearching : isLoading) && (
            <div className="space-y-4">
              <SectionSkeleton />
              <ProductGridSkeleton count={9} />
            </div>
          )}

          {!(searchQuery ? isSearching : isLoading) && products && (
            <>
              {products.products.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No products found
                </div>
              ) : (
                <>
                  <div className="mb-4 text-sm text-gray-600">
                    Showing{' '}
                    {products.pagination
                      ? `${
                          (products.pagination.current_page - 1) *
                            products.pagination.per_page +
                          1
                        }-${Math.min(
                          products.pagination.current_page *
                            products.pagination.per_page,
                          products.pagination.total_count
                        )} of ${products.pagination.total_count} products`
                      : `${products.products.length} products`}
                  </div>
                  <ProductGrid products={products.products} />

                  {/* Pagination - Always show if we have pagination data */}
                  {products.pagination && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={products.pagination.total_pages}
                        onPageChange={setCurrentPage}
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection
