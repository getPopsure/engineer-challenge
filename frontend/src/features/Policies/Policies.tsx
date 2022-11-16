import React, { useEffect, useState } from 'react';

import { Policy, PolicyStatus } from './Policies.model';

import { Header } from 'components/Header';
import { Table } from 'components/Table';
import { SearchInput } from 'components/SearchInput';
import { useDebounce } from 'use-debounce';
import { debounce } from 'lodash-es';
import { Option, SelectInput } from 'components/Select';

type FormType = {
  search?: string;
  status?: PolicyStatus | 'all';
};

const StatusOptions: Option<PolicyStatus | 'all'>[] = [
  { value: 'all', label: 'All' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'PENDING', label: 'Pending' },
];
export const Policies = () => {
  const [error, setError] = useState<string | undefined>();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [formValue, setFormValue] = useState<FormType>({});

  const fetchPolicies = async (query: string = '') => {
    await fetch(`http://localhost:4000/policies?search=${query}`)
      .then((r) => r.json())
      .then((data) => setPolicies(data))
      .catch((e) => setError(e.message));
  };

  const debouncedFetchPolicies = debounce(fetchPolicies, 500);

  useEffect(() => {
    fetchPolicies();

    // Component clean-up
    return () => {
      setPolicies([]);
      setError('');
    };
  }, []);

  if (!error && !policies) return <p>Loading...</p>;

  if (error)
    return <p className="text-red-500">Error loading policies: {error}</p>;

  const handleSearchChange =
    (name: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (name === 'search') {
        debouncedFetchPolicies(e.target.value);
      } else {
        setFormValue((prevForm) => ({ ...prevForm, [name]: e.target.value }));
      }
    };

  const handlePolicesFilter = (policies: Policy[], value: FormType) => {
    if (!value.status || value.status === 'all') return policies;
    return policies.filter((policy) => policy.status === value.status);
  };

  return (
    <div>
      <Header>Policies</Header>
      <form>
        <SearchInput
          label="search"
          id="search"
          name="search"
          onChange={handleSearchChange('search')}
        />
        <SelectInput
          label="status"
          name="status"
          options={StatusOptions}
          onChange={handleSearchChange('status')}
        />
      </form>
      <Table policies={handlePolicesFilter(policies, formValue)} />
    </div>
  );
};
