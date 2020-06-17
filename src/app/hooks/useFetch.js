import { useCallback, useEffect, useState } from "react";

const useFetch = ({
  endpoint,
  method = "GET",
  headers,
  shouldFetch = true,
}) => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState(null);

  const getPayload = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://academy-video-api.herokuapp.com/${endpoint}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        }
      );
      setPayload(await response.json());
      setLoading(false);
    } catch (e) {
      setError(e.message);
    }
  }, [setPayload, setLoading, setError, endpoint, method, headers]);

  useEffect(() => {
    if (shouldFetch) {
      getPayload();
    }
  }, [getPayload, shouldFetch]);
  return {
    error,
    payload,
    loading,
  };
};

export default useFetch;
