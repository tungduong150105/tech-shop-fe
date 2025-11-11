import React, { useState } from 'react'
import { Edit3, Trash2, Search } from 'lucide-react'
import { useAdminCustomers, useDeleteAdminCustomer, useUpdateAdminCustomer } from '../../hooks'
import Modal from '../../components/common/Modal'
import SkeletonTable from '../../components/common/SkeletonTable'

export default function AdminCustomersList() {
  const [page] = useState(1)
  const [limit] = useState(20)
  const [q, setQ] = useState('')
  const { data, isLoading, refetch } = useAdminCustomers({ page, limit, q: q || undefined })
  const del = useDeleteAdminCustomer()
  const [editId, setEditId] = useState<number | null>(null)
  const update = useUpdateAdminCustomer(editId || 0)
  const [confirmId, setConfirmId] = useState<number | null>(null)

  const onDelete = (id: number) => {
    if (confirm('Delete this customer?')) del.mutate(id)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Customers</h1>
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && refetch()}
            className="border rounded px-3 py-2 text-sm"
            placeholder="Search name/email/phone"
          />
          <button className="px-3 py-2 border rounded" onClick={() => refetch()}><Search size={16} /></button>
        </div>
      </div>

      <div className="bg-white rounded border">
        {isLoading ? (
          <SkeletonTable rows={5} cols={6} />
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-green-50">
              <tr>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Phone</th>
                <th className="text-left p-2">Role</th>
                <th className="text-left p-2">Created</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.users.map(u => (
                <tr key={u.id} className="border-t">
                  <td className="p-2">{u.name || '-'}</td>
                  <td className="p-2">{u.email || '-'}</td>
                  <td className="p-2">{u.phone || '-'}</td>
                  <td className="p-2">{u.role || 'user'}</td>
                  <td className="p-2">{u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <button title="Edit" className="text-blue-600" onClick={() => setEditId(u.id)}>
                        <Edit3 size={16} />
                      </button>
                      <button title="Delete" className="text-red-600" onClick={() => setConfirmId(u.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        open={editId !== null}
        onClose={() => setEditId(null)}
        title="Edit Customer"
        footer={
          <>
            <button className="px-3 py-2 border rounded" onClick={() => setEditId(null)}>Cancel</button>
            <button form="editCustomerForm" type="submit" className="px-3 py-2 bg-green-600 text-white rounded">Save</button>
          </>
        }
      >
        <form id="editCustomerForm" className="space-y-3" onSubmit={async e => {
          e.preventDefault()
          const fd = new FormData(e.currentTarget as HTMLFormElement)
          await update.mutateAsync({
            name: fd.get('name') ? String(fd.get('name')) : undefined,
            role: fd.get('role') ? String(fd.get('role')) : undefined,
            phone: fd.get('phone') ? String(fd.get('phone')) : undefined,
            address: fd.get('address') ? String(fd.get('address')) : undefined
          })
          setEditId(null)
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input name="name" className="w-full border rounded px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Role</label>
              <input name="role" className="w-full border rounded px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone</label>
              <input name="phone" className="w-full border rounded px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Address</label>
              <input name="address" className="w-full border rounded px-3 py-2 text-sm" />
            </div>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        open={confirmId !== null}
        onClose={() => setConfirmId(null)}
        title="Confirm delete customer"
        variant="danger"
        footer={
          <>
            <button className="px-3 py-2 border rounded" onClick={() => setConfirmId(null)}>Cancel</button>
            <button className="px-3 py-2 bg-red-600 text-white rounded" onClick={() => { if (confirmId) del.mutate(confirmId); setConfirmId(null) }}>Delete</button>
          </>
        }
      >
        Are you sure you want to delete this customer? This action cannot be undone.
      </Modal>
    </div>
  )
}


