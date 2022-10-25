import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Table } from '../../components/Table';

export const Policies = () => {
  const [error, setError] = useState<string | null>('my error');

  useEffect(() => {
    const fetchPolicies = async () => {
      await fetch('http://localhost:4000/policies')
        .then((r) => r.json())
        .then((data) => console.log(data))
        .catch((e) => setError(e.message));
    };
    fetchPolicies();
  }, []);

  if (error)
    return <p className="text-red-500">Error loading policies: {error}</p>;

  return (
    <div>
      <Header>Policies</Header>
      <Table />
    </div>
  );
};
