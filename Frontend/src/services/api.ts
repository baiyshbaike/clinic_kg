import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8002/api/v1'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface AboutUs {
  id: number
  title_kg: string
  title_ru: string
  content_kg: string
  content_ru: string
  status: boolean
  created: string
}

export interface NewsImage {
  id: number
  image: string
  main_image: boolean
  created: string
}

export interface NewsItem {
  id: number
  title_kg: string
  title_ru: string
  content_kg: string
  content_ru: string
  status: boolean
  created: string
  slug: string
  images: NewsImage[]
  main_image_url: string | null
}

export interface ManagementMember {
  id: number
  name_kg: string
  name_ru: string
  job_title_kg: string
  job_title_ru: string
  content_kg: string
  content_ru: string
  phone: string
  email: string
  image_url: string | null
  order: number
  slug: string
  created: string
  status: boolean
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export const getAboutUs = async (): Promise<AboutUs> => {
  const response = await api.get<AboutUs>('/about/')
  return response.data
}

export const getNewsList = async (page = 1, search = ''): Promise<PaginatedResponse<NewsItem>> => {
  const params = new URLSearchParams()
  params.append('page', page.toString())
  if (search) params.append('search', search)
  const response = await api.get<PaginatedResponse<NewsItem>>(`/news/?${params.toString()}`)
  return response.data
}

export const getLatestNews = async (): Promise<NewsItem[]> => {
  const response = await api.get<NewsItem[]>('/news/latest/')
  return response.data
}

export const getNewsDetail = async (slug: string): Promise<NewsItem> => {
  const response = await api.get<NewsItem>(`/news/${slug}/`)
  return response.data
}

export const getManagementList = async (): Promise<ManagementMember[]> => {
  const response = await api.get<ManagementMember[]>('/management/')
  return response.data
}

export interface Vacancy {
  id: number
  title_kg: string
  title_ru: string
  department_kg: string
  department_ru: string
  schedule_kg: string
  schedule_ru: string
  salary_kg: string
  salary_ru: string
  requirements: string[]
  responsibilities: string[]
  order: number
  slug: string
  created: string
  status: boolean
}

export const getVacancyList = async (): Promise<Vacancy[]> => {
  const response = await api.get<Vacancy[]>('/vacancies/')
  return response.data
}

export interface GalleryPhoto {
  id: number
  image_url: string | null
  is_main: boolean
  created: string
}

export interface GalleryAlbum {
  id: number
  title_kg: string
  title_ru: string
  category: string
  category_display: string
  photos: GalleryPhoto[]
  main_image_url: string | null
  status: boolean
  created: string
}

export const getGalleryAlbums = async (): Promise<GalleryAlbum[]> => {
  const response = await api.get<GalleryAlbum[]>('/gallery/')
  return response.data
}

export interface VideoGalleryItem {
  id: number
  title_kg: string
  title_ru: string
  description_kg: string
  description_ru: string
  category: string
  category_display: string
  youtube_url: string
  status: boolean
  created: string
}

export const getVideoGallery = async (): Promise<VideoGalleryItem[]> => {
  const response = await api.get<VideoGalleryItem[]>('/video-gallery/')
  return response.data
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

export const submitContactForm = async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
  const response = await api.post<{ success: boolean; message: string }>('/contact/', data)
  return response.data
}
