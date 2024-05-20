import { useCallback, useEffect, useState } from "react";

const useSearch = ({
  url = "https://picsum.photos/v2/list",
  page,
  limit = 50,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const fetchList = useCallback(
    async (pageInfo) => {
      try {
        setLoading(true);
        const response = await fetch(
          `${url}?page=${pageInfo.page}&limit=${pageInfo.limit}`
        );
        const data = await response.json();
        setList((prevData) => [...prevData, ...data]);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [url]
  );
  useEffect(() => {
    fetchList({ page, limit });
  }, [page]);

  return {
    data: list,
    loading,
    error,
  };
};

export default useSearch;
