// Function to fetch data from a given URL
export const fetcher = (url: string) => fetch(url).then((res) => res.json());
