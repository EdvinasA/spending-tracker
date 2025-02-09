import { useState, useCallback } from "react";

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (body?: any, method?: string) => Promise<void>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export function useApi<T>(
  url: string,
  defaultMethod: string = "GET",
  defaultHeaders: HeadersInit = { "Content-Type": "application/json" }
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (body?: any, method: string = defaultMethod) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
          method,
          headers: defaultHeaders,
          body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [url, defaultMethod, defaultHeaders]
  );

  return { data, loading, error, execute };
}
