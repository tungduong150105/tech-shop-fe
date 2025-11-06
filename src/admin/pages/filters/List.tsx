import React, { useState } from 'react'
import { Edit3, Trash2, Plus, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  useAdminFilterOptions,
  useDeleteAdminFilterOption,
  useSyncFilterOptions,
  useAdminCategories
} from '../../hooks'
import { toast } from 'sonner'

export default function AdminFiltersList() {
  const { data, isLoading } = useAdminFilterOptions()
  const { data: categoriesData } = useAdminCategories()
  const del = useDeleteAdminFilterOption()
  const sync = useSyncFilterOptions()
  const [query, setQuery] = useState('')
  const [filterKey, setFilterKey] = useState<string>('')
  const [filterCategory, setFilterCategory] = useState<string>('')
  const [filterActive, setFilterActive] = useState<string>('')

  // Ensure filterOptions is always an array
  // data is { data: FilterOptionListResponseWithSuccess }
  // FilterOptionListResponseWithSuccess = { success: boolean, data: FilterOption[] }
  // So we need: data.data.data to get the array
  const filterOptions = Array.isArray(data?.data?.data) ? data.data.data : []
  const categories = Array.isArray(categoriesData?.data)
    ? categoriesData.data
    : []

  const filtered = filterOptions.filter(opt => {
    if (!opt) return false
    const q = query.trim().toLowerCase()
    if (q) {
      const matchId = String(opt.id || '')
        .toLowerCase()
        .includes(q)
      const matchKey = String(opt.key || '')
        .toLowerCase()
        .includes(q)
      const matchLabel = String(opt.label || '')
        .toLowerCase()
        .includes(q)
      const matchValue = String(opt.value || '')
        .toLowerCase()
        .includes(q)
      if (!matchId && !matchKey && !matchLabel && !matchValue) return false
    }
    if (filterKey && opt.key !== filterKey) return false
    if (filterCategory) {
      if (filterCategory === 'null' && opt.category_id !== null) return false
      if (filterCategory !== 'null' && opt.category_id !== filterCategory)
        return false
    }
    if (filterActive) {
      const isActive = filterActive === 'true'
      if (opt.is_active !== isActive) return false
    }
    return true
  })

  const uniqueKeys = Array.from(new Set(filterOptions.map(opt => opt.key)))

  const handleSync = async () => {
    try {
      await sync.mutateAsync(undefined)
      toast.success('Filter options synced successfully')
    } catch (error: any) {
      toast.error(error?.message || 'Failed to sync filter options')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this filter option?')) return
    try {
      await del.mutateAsync(id)
      toast.success('Filter option deleted')
    } catch (error: any) {
      toast.error(error?.message || 'Failed to delete filter option')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Filter Options</h1>
        <div className="flex items-center gap-2">
          {/* <button
            onClick={handleSync}
            disabled={sync.isPending}
            className="px-3 py-2 bg-gray-600 text-white rounded text-sm flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={sync.isPending ? 'animate-spin' : ''}
            />
            Sync from Products
          </button> */}
          <Link
            to="/admin/filters/new"
            className="px-3 py-2 bg-blue-600 text-white rounded text-sm flex items-center gap-2"
          >
            <Plus size={16} />
            New Filter Option
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded border grid gap-3">
        <div className="grid grid-cols-4 gap-3">
          <input
            className="border rounded px-3 py-2 text-sm"
            placeholder="Search by ID, key, label, or value"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2 text-sm"
            value={filterKey}
            onChange={e => setFilterKey(e.target.value)}
          >
            <option value="">All Keys</option>
            {uniqueKeys.map(key => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2 text-sm"
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="null">Global (No Category)</option>
            {categories.map(cat => (
              <option key={cat.id} value={String(cat.id)}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2 text-sm"
            value={filterActive}
            onChange={e => setFilterActive(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded border">
        {isLoading ? (
          <div className="p-6">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Key</th>
                <th className="text-left p-2">Label</th>
                <th className="text-left p-2">Value</th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Order</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-gray-500">
                    No filter options found
                  </td>
                </tr>
              ) : (
                filtered.map(opt => (
                  <FilterRow
                    key={opt.id}
                    option={opt}
                    onEdit={() => {
                      window.location.href = `/admin/filters/${opt.id}`
                    }}
                    onDelete={() => handleDelete(Number(opt.id))}
                  />
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

function FilterRow({
  option,
  onEdit,
  onDelete
}: {
  option: any
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <tr className="border-t">
      <td className="p-2">{option.id}</td>
      <td className="p-2">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
          {option.key}
        </span>
      </td>
      <td className="p-2">{option.label}</td>
      <td className="p-2 font-medium">{option.value}</td>
      <td className="p-2">
        {option.category ? (
          <span className="text-sm">{option.category.name}</span>
        ) : (
          <span className="text-gray-400 text-sm">Global</span>
        )}
      </td>
      <td className="p-2">{option.order}</td>
      <td className="p-2">
        <span
          className={`px-2 py-1 rounded text-xs ${
            option.is_active
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {option.is_active ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="p-2 w-24">
        <div className="flex items-center gap-2">
          <button title="Edit" className="text-blue-600" onClick={onEdit}>
            <Edit3 size={16} />
          </button>
          <button title="Delete" className="text-red-600" onClick={onDelete}>
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  )
}
