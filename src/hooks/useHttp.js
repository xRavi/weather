import { useState, useEffect } from 'react';

export const useHttp = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    if (url && url[0]) {
      setIsLoading(true);
      fetch(`https://api.openweathermap.org/data/2.5/forecast?APPID=3f2dfade3b05b90e671ea82426434282&q=${url[0]}&wt=${url[1] || 'today'}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('No Records.');
          }
          return response.json();
        })
        .then(data => {
          setIsLoading(false);
          setFetchedData(data);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
          setFetchedData(err);
        });
    }
  }, dependencies);

  return [isLoading, fetchedData];
};