export const API_URL =
  typeof window === 'undefined' ? process.env.BUILD_API_URL : process.env.NEXT_PUBLIC_API_URL;
export const ASSET_URL = process.env.NEXT_PUBLIC_ASSET_URL;
