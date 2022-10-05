import {useState} from 'react';

interface PaginationProps {
  maxPages: number
  dispatchGetPage: Function
}

export const ITEMS_PER_PAGE = 3;

export default function Pagination({ maxPages, dispatchGetPage}: PaginationProps){
  const [currentPage, setCurrentPage] = useState(1);

  const getPageNumber = (nextPageNumber: number) => {
    setCurrentPage(nextPageNumber)
    const skip = currentPage * ITEMS_PER_PAGE;
    const take = ITEMS_PER_PAGE;
    dispatchGetPage({skip, take});
  }

  let paginationButtons = [];
  
  for (let index = 0; index < maxPages ; index++) {
    paginationButtons.push(<button key={Math.floor(Math.random() * 1000)} onClick={(e) => {
      e.preventDefault()
      getPageNumber(index + 1)
   }} aria-current="page" 
   className={`relative cursor-pointer z-10 inline-flex items-center border bg-white hover:bg-gray-50 bg-indigo-50 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 focus:z-20 ${currentPage === index + 1 ? 'font-bold text-gray-900': ''} `}>
    {index + 1}
    </button>)
  }

  return (
  <div className="flex items-center justify-center border-t border-gray-200  px-4 py-3 sm:px-6">
  <div>
    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        {paginationButtons}
    </nav>
    </div> 
</div>
  )
}