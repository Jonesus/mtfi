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
