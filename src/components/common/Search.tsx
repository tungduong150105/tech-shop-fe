import { useState } from 'react'

// @ts-ignore
import SearchIcon from '../../assets/search-icon.svg'

type ModalProps = {
  open: boolean
  onClose: () => void
  onSubmit: (value: string) => void
}

function Modal({ open, onClose, onSubmit }: ModalProps) {
  const [inputValue, setInputValue] = useState('')

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-gray-500/10' : 'invisible'}`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow p-6 min-w-[450px] w-1/2 transition-all ${open ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center items-center mb-10">
          <input
            type="text"
            placeholder="Search..."
            className="flex justify-center w-full border p-2 rounded mr-20"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                onSubmit(inputValue)
                onClose()
              }
            }}
          />
          <button
            onClick={onClose}
            className="flex justify-center rounded-full px-2 py-1 border border-black text-black text-xs"
          >
            X
          </button>
        </div>
        <div className="flex flex-row">
          <div className="mr-20">
            <h2>The Most Searched Items</h2>
          </div>
          <div>
            <h2>Most Used Keywords</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  function Submit(value: string) {
    setSearchTerm(value)
    console.log('Search Term:', value)
  }
  return (
    <div>
      {isOpen && (
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={value => Submit(value)}
        />
      )}
      <button>
        <img
          src={SearchIcon}
          alt="Search"
          className="h-15 w-15"
          onClick={() => setIsOpen(true)}
        />
      </button>
    </div>
  )
}

export default Search
