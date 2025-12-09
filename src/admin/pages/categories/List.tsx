import React, { useEffect, useState } from 'react'
import { Edit3, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { useAdminCategories, useDeleteAdminCategory } from '../../hooks'
import ConfirmModal from '../../../client/components/common/ConfirmModal'

export default function AdminCategories() {
  const { data, isLoading } = useAdminCategories()
  const del = useDeleteAdminCategory()
  const [query, setQuery] = useState('')
  const [pendingDelete, setPendingDelete] = useState<number | null>(null)

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Categories</h1>
        <div className="flex items-center gap-2">
          <input
            className="border rounded px-3 py-2 text-sm w-56"
            placeholder="Search by ID or name"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <Link
            to="/admin/categories/new"
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            New Category
          </Link>
        </div>
      </div>

      <ConfirmModal
        open={pendingDelete !== null}
        title="Delete category?"
        description="This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmClassName="bg-red-600 hover:bg-red-700"
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete === null) return
          del.mutate(pendingDelete, {
            onSuccess: () => toast.success('Category deleted'),
            onError: () => toast.error('Failed to delete category'),
            onSettled: () => setPendingDelete(null)
          })
        }}
      />
      <div>
        <div className="bg-white rounded border">
          {isLoading ? (
            <div className="p-6 space-y-3 animate-pulse">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-10 bg-gray-100 rounded" />
              ))}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-2">Image</th>
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(data?.data || [])
                  .filter(c => {
                    const q = query.trim().toLowerCase()
                    if (!q) return true
                    const id = Number(q)
                    const matchId = !Number.isNaN(id) && c.id === id
                    const matchName = (c.name || '').toLowerCase().includes(q)
                    return matchId || matchName
                  })
                  .map(c => (
                    <CategoryRow
                      key={c.id}
                      id={c.id}
                      name={c.name}
                      image_url={c.image_url}
                      onEdit={() => {
                        window.location.href = `/admin/categories/${c.id}`
                      }}
                      onDelete={() => setPendingDelete(c.id)}
                    />
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

function CategoryRow({
  id,
  name,
  image_url,
  onEdit,
  onDelete
}: {
  id: number
  name: string
  image_url?: string
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <tr className="border-t align-top">
      <td className="p-2 w-16">
        {image_url ? (
          <img
            src={image_url}
            className="h-10 w-10 object-cover rounded border"
          />
        ) : (
          <div className="h-10 w-10 rounded border bg-gray-100" />
        )}
      </td>
      <td className="p-2 w-16">{id}</td>
      <td className="p-2">
        <div className="font-medium">{name}</div>
      </td>
      <td className="p-2 w-56">
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
