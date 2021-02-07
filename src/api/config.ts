export const API_URL =
  typeof window === 'undefined' ? process.env.SERVER_API_URL : process.env.NEXT_PUBLIC_API_URL;
export const ASSET_URL =
  typeof window === 'undefined' ? process.env.SERVER_ASSET_URL : process.env.NEXT_PUBLIC_ASSET_URL;

export const PROD_URL = process.env.SERVER_PRODUCTION_URL;
