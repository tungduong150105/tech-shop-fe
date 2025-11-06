import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import type { Review } from '../../types/review'

interface ReviewProps {
  review: Review[] | null
}

const StarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 text-blue-600"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
)

const LikeIcon = () => (
  <svg
    width="24"
    height="48"
    viewBox="0 0 24 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.2804 34.1H12.4804C11.9204 34.1 10.7004 33.93 10.0504 33.28L7.02035 30.94L7.94035 29.75L11.0404 32.15C11.2904 32.39 11.9204 32.59 12.4804 32.59H16.2804C17.1804 32.59 18.1504 31.87 18.3504 31.06L20.7704 23.71C20.9304 23.27 20.9004 22.87 20.6904 22.58C20.4704 22.27 20.0704 22.09 19.5804 22.09H15.5804C15.0604 22.09 14.5804 21.87 14.2504 21.49C13.9104 21.1 13.7604 20.58 13.8404 20.04L14.3404 16.83C14.4604 16.27 14.0804 15.64 13.5404 15.46C13.0504 15.28 12.4204 15.54 12.2004 15.86L8.10035 21.96L6.86035 21.13L10.9604 15.03C11.5904 14.09 12.9704 13.64 14.0504 14.05C15.3004 14.46 16.1004 15.84 15.8204 17.12L15.3304 20.27C15.3204 20.34 15.3204 20.44 15.3904 20.52C15.4404 20.57 15.5104 20.6 15.5904 20.6H19.5904C20.5704 20.6 21.4204 21.01 21.9204 21.72C22.4104 22.41 22.5104 23.32 22.1904 24.2L19.8004 31.48C19.4304 32.93 17.8904 34.1 16.2804 34.1Z"
      fill="#0C68F4"
    />
    <path
      d="M5.37988 32.9999H4.37988C2.52988 32.9999 1.62988 32.1299 1.62988 30.3499V20.5499C1.62988 18.7699 2.52988 17.8999 4.37988 17.8999H5.37988C7.22988 17.8999 8.12988 18.7699 8.12988 20.5499V30.3499C8.12988 32.1299 7.22988 32.9999 5.37988 32.9999ZM4.37988 19.3999C3.28988 19.3999 3.12988 19.6599 3.12988 20.5499V30.3499C3.12988 31.2399 3.28988 31.4999 4.37988 31.4999H5.37988C6.46988 31.4999 6.62988 31.2399 6.62988 30.3499V20.5499C6.62988 19.6599 6.46988 19.3999 5.37988 19.3999H4.37988Z"
      fill="#0C68F4"
    />
  </svg>
)

const DislikeIcon = () => (
  <svg
    width="24"
    height="48"
    viewBox="0 0 24 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.7996 34.0999C10.5096 34.0999 10.2196 34.0499 9.94955 33.9499C8.69955 33.5399 7.89955 32.1599 8.17955 30.8799L8.66955 27.7299C8.67955 27.6599 8.67955 27.5599 8.60955 27.4799C8.55955 27.4299 8.48955 27.3999 8.40955 27.3999H4.40955C3.42955 27.3999 2.57955 26.9899 2.07955 26.2799C1.58955 25.5899 1.48955 24.6799 1.80955 23.7999L4.19955 16.5199C4.56955 15.0699 6.11955 13.8999 7.71955 13.8999H11.5196C12.0796 13.8999 13.2996 14.0699 13.9496 14.7199L16.9796 17.0599L16.0596 18.2499L12.9596 15.8499C12.7096 15.5999 12.0796 15.3999 11.5196 15.3999H7.71955C6.81955 15.3999 5.84955 16.1199 5.64955 16.9299L3.22955 24.2799C3.06955 24.7199 3.09955 25.1199 3.30955 25.4099C3.52955 25.7199 3.92955 25.8999 4.41955 25.8999H8.41955C8.93955 25.8999 9.41955 26.1199 9.74955 26.4999C10.0896 26.8899 10.2396 27.4099 10.1596 27.9499L9.65955 31.1599C9.53955 31.7199 9.91955 32.3499 10.4596 32.5299C10.9396 32.7099 11.5796 32.4499 11.7996 32.1299L15.8996 26.0299L17.1396 26.8699L13.0396 32.9699C12.5696 33.6699 11.6796 34.0999 10.7996 34.0999Z"
      fill="#0C68F4"
    />
    <path
      d="M19.6201 30.1H18.6201C16.7701 30.1 15.8701 29.23 15.8701 27.45V17.65C15.8701 15.87 16.7701 15 18.6201 15H19.6201C21.4701 15 22.3701 15.87 22.3701 17.65V27.45C22.3701 29.23 21.4701 30.1 19.6201 30.1ZM18.6201 16.5C17.5301 16.5 17.3701 16.76 17.3701 17.65V27.45C17.3701 28.34 17.5301 28.6 18.6201 28.6H19.6201C20.7101 28.6 20.8701 28.34 20.8701 27.45V17.65C20.8701 16.76 20.7101 16.5 19.6201 16.5H18.6201Z"
      fill="#0C68F4"
    />
  </svg>
)

const Review = ({ review }: ReviewProps) => {
  console.log('Review data:', review)
  const [expanded, setExpanded] = useState<{ [id: string]: boolean }>({})
  const [isLiked, setIsLiked] = useState<{ [id: string]: string }>({})
  const [likes, setLikes] = useState<{ [id: string]: number }>({})
  const [dislikes, setDislikes] = useState<{ [id: string]: number }>({})
  const [currentUser, setCurrentUser] = useState('none')

  // useEffect(() => {
  //   for (const comment of comments) {
  //     setLikes(prev => ({ ...prev, [comment.id]: comment.likes }))
  //     setDislikes(prev => ({ ...prev, [comment.id]: comment.dislikes }))
  //     if (currentUser !== 'none') {
  //       setIsLiked(prev => ({ ...prev, [comment.id]: comment.likeStatus }))
  //     }
  //   }
  // }, [comments])

  const toggleExpand = (id: number) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const [textComment, setTextComment] = useState('')

  function CommentSubmit() {
    if (currentUser !== 'none') {
      console.log('Comment submitted:', textComment)
    } else {
      toast.error('Please log in to submit comments.')
    }
  }

  // function setLike(commentId: string, likes: number, dislikes: number) {
  //   if (currentUser !== 'none') {
  //     if (isLiked[commentId] === 'like') {
  //       setIsLiked(prev => ({ ...prev, [commentId]: 'none' }))
  //       setLikes(prev => ({ ...prev, [commentId]: prev[commentId] - 1 }))
  //       console.log('Remove Like from comment:', commentId)
  //     } else {
  //       if (isLiked[commentId] === 'dislike') {
  //         console.log('Remove dislike from comment:', commentId)
  //         setDislikes(prev => ({ ...prev, [commentId]: prev[commentId] - 1 }))
  //       }
  //       setLikes(prev => ({ ...prev, [commentId]: prev[commentId] + 1 }))
  //       setIsLiked(prev => ({ ...prev, [commentId]: 'like' }))
  //       console.log('Add Like to comment:', commentId)
  //     }
  //   } else {
  //     toast.error('Please log in to like comments.')
  //   }
  // }

  // function setDislike(commentId: string, likes: number, dislikes: number) {
  //   if (currentUser !== 'none') {
  //     if (isLiked[commentId] === 'dislike') {
  //       setIsLiked(prev => ({ ...prev, [commentId]: 'none' }))
  //       setDislikes(prev => ({ ...prev, [commentId]: prev[commentId] - 1 }))
  //       console.log('Remove dislike from comment:', commentId)
  //     } else {
  //       if (isLiked[commentId] === 'like') {
  //         console.log('Remove Like from comment:', commentId)
  //         setLikes(prev => ({ ...prev, [commentId]: prev[commentId] - 1 }))
  //       }
  //       setDislikes(prev => ({ ...prev, [commentId]: prev[commentId] + 1 }))
  //       setIsLiked(prev => ({ ...prev, [commentId]: 'dislike' }))
  //       console.log('Add Dislike to comment:', commentId)
  //     }
  //   } else {
  //     toast.error('Please log in to dislike comments.')
  //   }
  // }

  return (
    <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 p-6">
      {/* Left panel */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
            Comments
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            leave your comments here for other customers
          </p>
          <textarea
            placeholder="Share your thoughts about this product here"
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px]"
            value={textComment}
            onChange={e => setTextComment(e.target.value)}
          />
          <button
            className="mt-2 w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 transition"
            onClick={() => CommentSubmit()}
          >
            Comment
          </button>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-6">
        {review?.map(c => {
            const isExpanded = expanded[c.id]
            const visibleText = isExpanded
              ? c.comment
              : c.comment.slice(0, 200) + (c.comment.length > 200 ? '...' : '')

            return (
              <div
                key={c.id}
                className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw2ny9wqZ_8SzwBKHALvZYtS&ust=1762421247977000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOinuvXY2pADFQAAAAAdAAAAABAE'
                      }
                      alt={c.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{c.user.name}</p>
                      <p className="text-xs text-gray-500">{c.updated_at}</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm font-medium">
                    <StarIcon /> {c.rating.toFixed(1)}
                  </div>
                </div>

                <p className="mt-3 text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {visibleText}
                </p>

                {c.comment.length > 200 && (
                  <button
                    onClick={() => toggleExpand(c.id)}
                    className="mt-1 text-blue-600 hover:underline text-sm font-medium"
                  >
                    {isExpanded ? 'Show Less ▲' : 'Show More ▼'}
                  </button>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
export default Review
