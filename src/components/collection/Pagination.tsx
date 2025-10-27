const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {[1, 2, 3, currentPage].map((page, idx) => (
        <button 
          key={idx}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 border rounded-lg ${currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`}
        >
          {page}
        </button>
      ))}
      <span className="px-2">...</span>
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
      >
        →
      </button>
    </div>
  );
};

export default Pagination;