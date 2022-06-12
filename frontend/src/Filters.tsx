import React, { useState } from 'react';
import { InsuranceType, PolicyStatus } from './App';

type handleProps = {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInsuranceType: (insurance: string) => void;
  handleStatus: (status: string) => void;
};

const Filters: React.FC<handleProps> = ({
  handleSearch,
  handleInsuranceType,
  handleStatus,
}) => {
  const [selectedInsuranceType, setSelectedInsuranceType] = useState<string>(
    InsuranceType.None
  );
  const [activeStatus, setActiveStatus] = useState<string>(PolicyStatus.None);

  const insuranceFilterOptions = ['HEALTH', 'HOUSEHOLD', 'LIABILITY'];
  const statusFilterOptions = ['ACTIVE', 'PENDING'];

  const handleInsuranceChange = (insurance: string) => {
    if (insurance === selectedInsuranceType) {
      handleInsuranceType(InsuranceType.None);
      setSelectedInsuranceType(InsuranceType.None);
    } else {
      setSelectedInsuranceType(insurance);
      handleInsuranceType(insurance);
    }
  };

  const handleStatusChange = (status: string) => {
    if (status === activeStatus) {
      handleStatus(PolicyStatus.None);
      setActiveStatus(PolicyStatus.None);
    } else {
      setActiveStatus(status);
      handleStatus(status);
    }
  };

  return (
    <div className=' flex'>
      <div className='border-r-2 mr-4'>
        <div>
          <label
            className=' text-gray-500 font-bold mb-1 md:mb-0 pr-4'
            htmlFor='search'
          >
            Search
          </label>
        </div>
        <div>
          <input
            className='border-2 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-2'
            onChange={handleSearch}
            autoFocus
            id='search'
            type='text'
            placeholder='name or provider'
          />
        </div>
      </div>
      <div className='border-r-2 mr-4 '>
        <p className='text-gray-500 font-bold mb-1 md:mb-0 pr-4'>
          Policy Options:
        </p>
        {insuranceFilterOptions.map((value: string) => (
          <button
            className={`text-gray-800 font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2 ${
              selectedInsuranceType === value
                ? 'bg-green-100 hover:bg-green-200'
                : 'bg-gray-100 hover:bg-gray-200 '
            }`}
            onClick={() => handleInsuranceChange(value)}
            key={value}
          >
            {value}
          </button>
        ))}
      </div>
      <div>
        <p className='text-gray-500 font-bold mb-1 md:mb-0 pr-4'>
          Status Options:{' '}
        </p>
        {statusFilterOptions.map((status) => (
          <button
            className={`bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2 ${
              activeStatus === status
                ? 'bg-green-100 hover:bg-green-200'
                : 'bg-gray-100 hover:bg-gray-200 '
            }`}
            onClick={() => handleStatusChange(status)}
            key={status}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
