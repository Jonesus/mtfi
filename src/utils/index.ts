export function prefixWithSlash(slug: string) {
  return slug.startsWith('/') ? slug : `/${slug}`;
}
