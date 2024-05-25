import { createApi } from "unsplash-js";

// Create an instance of the Unsplash API
export const unsplash = createApi({
  // Access key for Unsplash API, retrieved from environment variables
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
  // Fetch function to be used for API requests
  fetch: fetch,
});
