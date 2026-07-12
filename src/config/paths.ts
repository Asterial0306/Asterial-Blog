export const BASE_URL = process.env.NODE_ENV === 'production' ? '/Asterial-Blog' : '';

export const getAssetUrl = (path: string) => {
  if (path.startsWith('/')) {
    return `${BASE_URL}${path}`;
  }
  return `${BASE_URL}/${path}`;
};
