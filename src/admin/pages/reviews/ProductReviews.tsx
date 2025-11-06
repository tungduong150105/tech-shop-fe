import { useParams } from 'react-router-dom'
import { useAdminProductReviews, useDeleteAdminReview } from '../../hooks'

export default function AdminProductReviews() {
  const { id } = useParams()
  const pid = Number(id)
  const { data, isLoading } = useAdminProductReviews(pid, {
    page: 1,
    limit: 10
  })
  const del = useDeleteAdminReview(pid)

  if (isLoading) return <div>Loading...</div>

  const reviews = data?.data.reviews || []
  const summary = data?.data.summary

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Product Reviews</h1>
      {summary && (
        <div className="bg-white rounded border p-4 text-sm text-gray-700">
          Avg rating: {summary.average_rating} • Total: {summary.total_reviews}
        </div>
      )}
      <div className="bg-white rounded border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">User</th>
              <th className="text-left p-2">Rating</th>
              <th className="text-left p-2">Comment</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(r => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.user?.name ?? r.user_id}</td>
                <td className="p-2">{r.rating}</td>
                <td className="p-2">{r.comment}</td>
                <td className="p-2">
                  <button
                    className="text-red-600"
                    onClick={() => del.mutateAsync(r.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
