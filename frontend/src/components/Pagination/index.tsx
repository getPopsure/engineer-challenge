export const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(pages + 1).keys()].slice(1)

  const nextPage = () => {
    if(currentPage !== pages) setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    if(currentPage !== 1) setCurrentPage(currentPage - 1)
  }

  return (
    <div>
      <ul className='flex flex-row justify-center cursor-pointer'>
        <li className="mx-3" onClick={prevPage}>
            Prev
        </li>
        {pageNumbers.map(pageNumber => (
          <li key={pageNumber} onClick={() => setCurrentPage(pageNumber)}
              className= {`page-item ${currentPage == pageNumber ? 'active' : ''} mx-3 cursor-pointer`} >
              {pageNumber}
          </li>
        ))}
        <li className="mx-3 cursor-pointer" onClick={nextPage}>
            Next
        </li>
      </ul>
    </div>
  )
}
