import { Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { useAdminProducts, useDeleteAdminProduct } from '../../hooks'
import { Edit3, Trash2, MessageSquare } from 'lucide-react'

export default function AdminProductsList() {
  const { data, isLoading } = useAdminProducts({ page: 1, limit: 20 })
  const del = useDeleteAdminProduct()
  const [query, setQuery] = useState('')

  const products = data?.data.products ?? []
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    const id = Number(q)
    return products.filter(p => {
      const matchId = !Number.isNaN(id) && p.id === id
      const matchName = (p.name || '').toLowerCase().includes(q)
      return matchId || matchName
    })
  }, [products, query])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Products</h1>
        <div className="flex items-center gap-2">
          <input
            className="border rounded px-3 py-2 text-sm w-56"
            placeholder="Search by ID or name"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <Link
          to="/admin/products/new"
          className="px-3 py-2 bg-blue-600 text-white rounded"
        >
          New Product
          </Link>
        </div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white rounded border">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-2">Image</th>
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Price</th>
                <th className="text-left p-2">Stock</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">
                    {Array.isArray(p.img) && p.img[0] ? (
                      <img src={p.img[0]} className="h-10 w-10 object-cover rounded border" />
                    ) : (
                      <div className="h-10 w-10 rounded border bg-gray-100" />
                    )}
                  </td>
                  <td className="p-2">{p.id}</td>
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">${p.price}</td>
                  <td className="p-2">{p.quantity ?? 0}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <Link to={`/admin/products/${p.id}`} title="Edit" className="text-blue-600">
                        <Edit3 size={16} />
                      </Link>
                      <button title="Delete" className="text-red-600" onClick={() => del.mutateAsync(p.id)}>
                        <Trash2 size={16} />
                      </button>
                      <Link to={`/admin/products/${p.id}/reviews`} title="Reviews" className="text-gray-600">
                        <MessageSquare size={16} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
