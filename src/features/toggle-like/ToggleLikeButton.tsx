// src/features/toggle-like/ToggleLikeButton.tsx
import { useProductStore } from '@/entities/product/model/useProductStore'

type Props = {
  productId: number
}

export function ToggleLikeButton({ productId }: Props) {
  const { toggleLike, likedItems } = useProductStore()
  const isLiked = likedItems.includes(productId)

  const iconClass = `w-8 h-8 transition-all duration-300 ${
    isLiked ? 'text-red-500 scale-110' : 'text-gray-300 hover:text-red-400'
  }`

  return (
    <button
      onClick={() => toggleLike(productId)}
      className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full border-none cursor-pointer hover:scale-125 transition-transform z-10"
      aria-label={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
    >
      <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  )
}