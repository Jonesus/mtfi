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

export const containerTransitions = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 1, ease: [0.48, 0.15, 0.25, 0.96], staggerChildren: 0.2 },
  },
};

export const itemTransitions = {
  initial: { y: 30, opacity: 0 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.48, 0.15, 0.25, 0.96] },
  },
};
