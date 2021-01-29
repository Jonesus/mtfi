export function prefixWithSlash(slug: string) {
  return slug.startsWith('/') ? slug : `/${slug}`;
}

export function throttle(callback: () => void, limit: number) {
  let wait = false;
  return function () {
    if (!wait) {
      callback.call(this);
      wait = true;
      setTimeout(function () {
        wait = false;
      }, limit);
    }
  };
}

export const truncateString = (string: string, maxLength = 50) => {
  if (string.length <= maxLength) return string;
  const trimmedString = string.substring(0, maxLength);
  return `${trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
  )}...`;
};
