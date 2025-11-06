import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Edit3, Trash2 } from 'lucide-react'
import {
  useAdminCoupons,
  useCreateAdminCoupon,
  useDeleteAdminCoupon,
  useUpdateAdminCoupon
} from '../../hooks/useCoupons'
import Modal from '../../components/common/Modal'
import SkeletonTable from '../../components/common/SkeletonTable'
import { DiscountType, UpdateCouponRequest } from '../../types'

export default function AdminCouponsList() {
  const navigate = useNavigate()
  const { data, isLoading } = useAdminCoupons()
  const del = useDeleteAdminCoupon()
  const createMut = useCreateAdminCoupon()
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState<null | number>(null)
  const updateMut = useUpdateAdminCoupon(editOpen || 0)

  const onDelete = (id: number) => setConfirmId(id)
  const [confirmId, setConfirmId] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Coupons</h1>
        <button
          className="px-3 py-2 bg-green-600 text-white rounded"
          onClick={() => navigate('/admin/coupons/new')}
        >
          New Coupon
        </button>
      </div>

      <div className="bg-white rounded border">
        {isLoading ? (
          <SkeletonTable rows={5} cols={7} />
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-green-50">
              <tr>
                <th className="text-left p-2">Code</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Value</th>
                <th className="text-left p-2">Min Order</th>
                <th className="text-left p-2">Usage</th>
                <th className="text-left p-2">Expires</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map(c => (
                <tr key={c.id} className="border-t">
                  <td className="p-2 font-medium">{c.code}</td>
                  <td className="p-2">{c.discount_type}</td>
                  <td className="p-2">{Number(c.discount_value)}</td>
                  <td className="p-2">
                    {c.min_order ? Number(c.min_order) : '-'}
                  </td>
                  <td className="p-2">
                    {c.used_count ?? 0}/{c.usage_limit ?? '∞'}
                  </td>
                  <td className="p-2">
                    {c.expires_at
                      ? new Date(c.expires_at).toLocaleDateString()
                      : '—'}
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <button title="Edit" className="text-blue-600" onClick={() => setEditOpen(c.id)}>
                        <Edit3 size={16} />
                      </button>
                      <button title="Delete" className="text-red-600" onClick={() => onDelete(c.id)}>
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

      {/* Create Modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create Coupon"
        footer={
          <>
            <button
              className="px-3 py-2 border rounded"
              onClick={() => setCreateOpen(false)}
            >
              Cancel
            </button>
            <button
              form="createCouponForm"
              type="submit"
              className="px-3 py-2 bg-green-600 text-white rounded"
            >
              Create
            </button>
          </>
        }
      >
        <form
          id="createCouponForm"
          className="space-y-3"
          onSubmit={async e => {
            e.preventDefault()
            const fd = new FormData(e.currentTarget as HTMLFormElement)
            await createMut.mutateAsync({
              code: String(fd.get('code') || ''),
              description: String(fd.get('description') || '') || undefined,
              discount_type: String(
                fd.get('discount_type') || 'percent'
              ) as DiscountType,
              discount_value: Number(fd.get('discount_value') || 0),
              min_order: fd.get('min_order')
                ? Number(fd.get('min_order'))
                : undefined,
              usage_limit: fd.get('usage_limit')
                ? Number(fd.get('usage_limit'))
                : undefined,
              expires_at: fd.get('expires_at')
                ? String(fd.get('expires_at'))
                : undefined
            })
            setCreateOpen(false)
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Code</label>
              <input
                name="code"
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Type</label>
              <select
                name="discount_type"
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="percent">Percent</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Value</label>
              <input
                type="number"
                step="0.01"
                name="discount_value"
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Min Order
              </label>
              <input
                type="number"
                step="0.01"
                name="min_order"
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Usage Limit
              </label>
              <input
                type="number"
                name="usage_limit"
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Expires
              </label>
              <input
                type="date"
                name="expires_at"
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              className="w-full border rounded px-3 py-2 text-sm"
              rows={3}
            />
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={!!editOpen}
        onClose={() => setEditOpen(null)}
        title={`Edit Coupon`}
        footer={
          <>
            <button
              className="px-3 py-2 border rounded"
              onClick={() => setEditOpen(null)}
            >
              Cancel
            </button>
            <button
              form="editCouponForm"
              type="submit"
              className="px-3 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>
          </>
        }
      >
        <form
          id="editCouponForm"
          className="space-y-3"
          onSubmit={async e => {
            e.preventDefault()
            const fd = new FormData(e.currentTarget as HTMLFormElement)
            const payload: UpdateCouponRequest = {
              code: fd.get('code') ? String(fd.get('code')) : undefined,
              description: fd.get('description')
                ? String(fd.get('description'))
                : undefined,
              discount_type: fd.get('discount_type')
                ? (String(fd.get('discount_type')) as DiscountType)
                : undefined,
              discount_value: fd.get('discount_value')
                ? Number(fd.get('discount_value'))
                : undefined,
              min_order: fd.get('min_order')
                ? Number(fd.get('min_order'))
                : undefined,
              usage_limit: fd.get('usage_limit')
                ? Number(fd.get('usage_limit'))
                : undefined,
              expires_at: fd.get('expires_at')
                ? String(fd.get('expires_at'))
                : undefined
            }
            await updateMut.mutateAsync(payload)
            setEditOpen(null)
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Code</label>
              <input
                name="code"
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Type</label>
              <select
                name="discount_type"
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="percent">Percent</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Value</label>
              <input
                type="number"
                step="0.01"
                name="discount_value"
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Min Order
              </label>
              <input
                type="number"
                step="0.01"
                name="min_order"
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Usage Limit
              </label>
              <input
                type="number"
                name="usage_limit"
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Expires
              </label>
              <input
                type="date"
                name="expires_at"
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              className="w-full border rounded px-3 py-2 text-sm"
              rows={3}
            />
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        open={confirmId !== null}
        onClose={() => setConfirmId(null)}
        title="Confirm delete coupon"
        variant="danger"
        footer={
          <>
            <button
              className="px-3 py-2 border rounded"
              onClick={() => setConfirmId(null)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-2 bg-red-600 text-white rounded"
              onClick={() => {
                if (confirmId) del.mutate(confirmId)
                setConfirmId(null)
              }}
            >
              Delete
            </button>
          </>
        }
      >
        Are you sure you want to delete this coupon? This action cannot be
        undone.
      </Modal>
    </div>
  )
}
