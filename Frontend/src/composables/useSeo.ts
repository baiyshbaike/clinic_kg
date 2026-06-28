import { onMounted, onUnmounted } from 'vue'

interface SeoMeta {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
}

export function useSeo(meta: SeoMeta) {
  const setTitle = (title: string) => {
    document.title = title
  }

  const setMeta = (name: string, content: string) => {
    let element = document.querySelector(`meta[name="${name}"]`)
    if (!element) {
      element = document.createElement('meta')
      element.setAttribute('name', name)
      document.head.appendChild(element)
    }
    element.setAttribute('content', content)
  }

  const setProperty = (property: string, content: string) => {
    let element = document.querySelector(`meta[property="${property}"]`)
    if (!element) {
      element = document.createElement('meta')
      element.setAttribute('property', property)
      document.head.appendChild(element)
    }
    element.setAttribute('content', content)
  }

  onMounted(() => {
    setTitle(meta.title)
    setMeta('description', meta.description)
    if (meta.keywords) setMeta('keywords', meta.keywords)

    // Open Graph
    setProperty('og:title', meta.title)
    setProperty('og:description', meta.description)
    if (meta.image) setProperty('og:image', meta.image)
    if (meta.url) setProperty('og:url', meta.url)

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', meta.title)
    setMeta('twitter:description', meta.description)
    if (meta.image) setMeta('twitter:image', meta.image)
  })
}
