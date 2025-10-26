import { useState } from 'react';

const useBaseApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async <T>(apiCall: () => Promise<T>): Promise<T | undefined> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiCall();
      return response;
    } catch (error) {
      setError('Something went wrong. Please try again later.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, execute };
};

export default useBaseApi;
