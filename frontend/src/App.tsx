import Navbar from './Navbar';
import Header from './Header';
import Table from './Table';

import './index.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useBounce from './useBounce';
import Filters from './Filters';
import { Status } from './Badge';

export type PoliciesData = {
  id: number;
  provider: string;
  insuranceType: InsuranceType;
  status: Status;
  endDate: string | null;
  customer: Customer;
  relatives: Relative[];
};

export enum InsuranceType {
  None = '',
  Health = 'HEALTH',
  Household = 'HOUSEHOLD',
  Liability = 'LIABILITY',
}

export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

export type Relative = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

export enum PolicyStatus {
  None = '',
  Active = 'ACTIVE',
  Pending = 'PENDING',
}

const App = () => {
  const [data, setData] = useState<PoliciesData[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(PolicyStatus.None);
  const [insurance, setInsurance] = useState<string>(InsuranceType.None);

  const BACKEND_URL = 'http://localhost:4000';
  const POLICIES_ENDPOINT = `/policies`;

  const retrieveData = async (
    searchQuery: string,
    insuranceQuery: string,
    statusQuery: string,
    callback: Dispatch<SetStateAction<PoliciesData[]>>
  ) => {
    try {
      const endpoint = `${BACKEND_URL}${POLICIES_ENDPOINT}?${
        searchQuery ? `search=${searchQuery}` : ''
      }${insuranceQuery ? `&insurance=${insuranceQuery}` : ''}${
        statusQuery ? `&status=${statusQuery}` : ''
      }`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setLoading(true);
      callback(data);
    } catch (error) {
      callback([]);
      console.error(error);
    }
  };

  useEffect(() => {
    retrieveData('', InsuranceType.None, PolicyStatus.None, setData);
  }, []);

  const debounceSearch = useBounce(search, 300);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleInsuranceType = (insurance: string) => {
    setInsurance(insurance);
  };

  const handleStatus = (status: string) => {
    setStatus(status);
  };

  useEffect(() => {
    retrieveData(debounceSearch, insurance, status, setData);
  }, [debounceSearch, insurance, status]);

  return (
    <div>
      <Navbar />
      <div className='w-full p-8'>
        <Header />
        <Filters
          handleSearch={handleSearch}
          handleInsuranceType={handleInsuranceType}
          handleStatus={handleStatus}
        />
        {loading ? <Table policies={data} /> : <p>loading</p>}
      </div>
    </div>
  );
};

export default App;
