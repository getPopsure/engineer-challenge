import { useAppContext } from "../context/apiContext";

const Header = () => {
  const { resetFilter, query = [], removeFilter } = useAppContext()
  const handleResetFilter = () => {
    resetFilter()
  }

  const handleRemoveFilter = (key: string) => {
    removeFilter(key)
  }

 return (
   <div>
     <h1 className="text-3xl font-bold text-gray-900 mb-2">Policies</h1>
     <button onClick={handleResetFilter} className="mr-3 bg-gray-200 p-2 rounded">Reset Filters</button>
     {Object.keys(query).map(key => (
       <button className="mx-3 bg-gray-200 p-2 rounded">
         {key}: {query[key]}
         <span className="rounded-full bg-gray-500 text-white ml-2 inline-block px-1.5" onClick={() => handleRemoveFilter(key)}>X</span>
       </button>
     ))}
   </div>
  );
}
export default Header;