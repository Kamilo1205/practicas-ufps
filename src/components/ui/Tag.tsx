'use client'

interface item{
  id: number
  name: string
}

interface Props{
  item: item
  onDelete: (item:item) => void
}

export const TagComponent = ({item, onDelete }:Props) => { 

  const { id, name } = item
  
  return (
    <div className="w-fit bg-black text-white text-sm rounded-full p-2 m-1 flex items-center">
      <span>{name}</span>
      <button onClick={()=>onDelete(item)} className="ml-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>  
  )
}