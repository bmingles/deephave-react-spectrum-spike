const metaMap = import.meta.glob('../containers/**', { eager: true })

export interface Meta {
  title: string
  slug: string
}

export interface HasMeta {
  default: React.ComponentType
  meta: Meta
}

function hasMeta(maybeHasMeta: unknown): maybeHasMeta is HasMeta {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return 'meta' in (maybeHasMeta as any)
}

export const routes = Object.keys(metaMap)
  .filter((path) => hasMeta(metaMap[path]))
  .map((path) => {
    const { default: Component, meta } = metaMap[path] as HasMeta
    return { Component, meta }
  })
