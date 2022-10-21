import { useAppContext } from "../context/apiContext";

const Header = () => {
  const { resetFilter } = useAppContext()
  const handleResetFilter = () => {
    resetFilter()
  }
 return (
   <div>
     <h1 className="text-3xl font-bold text-gray-900 mb-2">Policies</h1>
     <button onClick={handleResetFilter}>Reset Filter</button>
   </div>
  );
}
export default Header;