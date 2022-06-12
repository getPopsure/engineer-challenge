import React from 'react';

const useBounce = (value: string, delay: number) => {
  const [bounce, setBounce] = React.useState(value);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setBounce(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return bounce;
};

export default useBounce;
