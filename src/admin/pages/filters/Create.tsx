import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateAdminFilterOption, useAdminCategories } from '../../hooks'
import { toast } from 'sonner'

const FILTER_KEYS = [
  { value: 'brand', label: 'Brand' },
  { value: 'ram', label: 'RAM' },
  { value: 'screen_size', label: 'Screen Size' },
  { value: 'processor', label: 'Processor' },
  { value: 'gpu_brand', label: 'GPU Brand' },
  { value: 'drive_size', label: 'Drive Size' },
]

export default function AdminFilterCreate() {
  const nav = useNavigate()
  const create = useCreateAdminFilterOption()
  const { data: categoriesData } = useAdminCategories()

  const [key, setKey] = useState('')
  const [label, setLabel] = useState('')
  const [value, setValue] = useState('')
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [order, setOrder] = useState(0)
  const [isActive, setIsActive] = useState(true)

  const categories = categoriesData?.data || []

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!key || !label || !value) {
      toast.error('Key, label, and value are required')
      return
    }

    try {
      await create.mutateAsync({
        key,
        label,
        value,
        category_id: categoryId || null,
        order,
        is_active: isActive,
      })
      toast.success('Filter option created successfully')
      nav('/admin/filters')
    } catch (error: any) {
      toast.error(error?.message || 'Failed to create filter option')
    }
  }

  const handleKeyChange = (newKey: string) => {
    setKey(newKey)
    // Auto-fill label based on key
    const keyOption = FILTER_KEYS.find(k => k.value === newKey)
    if (keyOption && !label) {
      setLabel(keyOption.label)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">New Filter Option</h1>
        <button
          onClick={onSubmit}
          disabled={create.isPending}
          className="px-3 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          {create.isPending ? 'Creating...' : 'Save'}
        </button>
      </div>

      <form onSubmit={onSubmit} className="bg-white p-4 rounded border max-w-xl grid gap-3">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Key *</label>
          <select
            className="border rounded px-3 py-2"
            value={key}
            onChange={e => handleKeyChange(e.target.value)}
            required
          >
            <option value="">Select a key</option>
            {FILTER_KEYS.map(k => (
              <option key={k.value} value={k.value}>{k.label}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Label *</label>
          <input
            className="border rounded px-3 py-2"
            placeholder="Display name (e.g., Brand, RAM)"
            value={label}
            onChange={e => setLabel(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Value *</label>
          <input
            className="border rounded px-3 py-2"
            placeholder="Actual value (e.g., Apple, 8GB)"
            value={value}
            onChange={e => setValue(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Category (Optional)</label>
          <select
            className="border rounded px-3 py-2"
            value={categoryId || ''}
            onChange={e => setCategoryId(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">Global (No Category)</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Order</label>
          <input
            type="number"
            className="border rounded px-3 py-2"
            placeholder="Display order"
            value={order}
            onChange={e => setOrder(Number(e.target.value))}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={e => setIsActive(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="isActive" className="text-sm">
            Active
          </label>
        </div>
      </form>
    </div>
  )
}

