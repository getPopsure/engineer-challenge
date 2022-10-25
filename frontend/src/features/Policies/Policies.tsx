import { useEffect, useState } from 'react';

import { Policy } from './Policies.model';

import { Header } from 'components/Header';
import { Table } from 'components/Table';

export const Policies = () => {
  const [error, setError] = useState<string | undefined>();
  const [policies, setPolicies] = useState<Policy[] | undefined>();

  useEffect(() => {
    const fetchPolicies = async () => {
      await fetch('http://localhost:4000/policies')
        .then((r) => r.json())
        .then((data) => setPolicies(data))
        .catch((e) => setError(e.message));
    };

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

  return (
    <div>
      <Header>Policies</Header>
      <Table policies={policies} />
    </div>
  );
};
