import { ChangeEvent } from "react";

interface FilterProps {
  setTermToFilter: (value: string) => void;
  setData:(value: Policy[]) => void;
  rawData: Policy[];
  termToFilter: string;
}

const Filter = ({ setTermToFilter, termToFilter, rawData, setData }: FilterProps) => {

    const filterByName = (value: string) => {
      const filteredNames = rawData.filter((element: { customer: { firstName: string; lastName: string; }; }) => {
        return (
        element.customer.firstName
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        element.customer.lastName
          .toLowerCase()
          .includes(value.toLowerCase())
        )
      });
      return setData(filteredNames);
    };

    const handleInputSearch = (event: ChangeEvent<HTMLInputElement>) => {
      setTermToFilter(event.target.value);
      filterByName(event.target.value);
    };
  
  return (
      <div className="flex justify-center md:justify-start">
        <div className="mt-3 md:mt-6 md:ml-2 lg:inset-y-0 left-0  items-center pointer-events-none">
        <svg
            className="w-5 h-5 text-primary dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
            ></path>
          </svg>
       </div> 
      <input
          className="input w-40 md:w-64 border-b-2 border-gray-100 focus:outline-none focus:border-primary md:pb-3 md:pt-6 pt-3 pb-2 pl-6 m-0 mb-3"
          type="search"
          role="search"
          data-testid="search-field"
          id="name-search"
          value={termToFilter}
          onChange={handleInputSearch}
          aria-label="Name Filter"
          placeholder="Name Filter">
        </input>
    </div>
  );
};

export default Filter;
