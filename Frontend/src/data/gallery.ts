import room1 from '@/assets/images/gallery/rooms/img1.jpeg'
import room2 from '@/assets/images/gallery/rooms/img2.jpeg'
import room3 from '@/assets/images/gallery/rooms/img3.jpeg'
import room4 from '@/assets/images/gallery/rooms/img4.jpeg'
import room5 from '@/assets/images/gallery/rooms/img5.jpeg'
import room6 from '@/assets/images/gallery/rooms/img6.jpeg'
import room7 from '@/assets/images/gallery/rooms/img7.jpeg'
import doctorsTeam from '@/assets/images/hero-3.jpg'

export type GalleryCategory = 'clinic' | 'equipment' | 'doctors'

export interface GalleryImage {
  id: number
  category: GalleryCategory
  title: string
  alt: string
  src: string
}

export const galleryCategories = [
  { id: 'all', labelKey: 'common.all' },
  { id: 'clinic', labelKey: 'gallery.categories.clinic' },
  { id: 'equipment', labelKey: 'gallery.categories.equipment' },
  { id: 'doctors', labelKey: 'gallery.categories.doctors' },
] as const

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    category: 'clinic',
    title: 'Палата',
    alt: 'Палата стационарного отделения',
    src: room1,
  },
  {
    id: 2,
    category: 'clinic',
    title: 'Палата повышенного комфорта',
    alt: 'Палата повышенного комфорта для пациентов',
    src: room2,
  },
  {
    id: 3,
    category: 'equipment',
    title: 'Диагностический кабинет',
    alt: 'Кабинет диагностического отделения',
    src: room3,
  },
  {
    id: 4,
    category: 'clinic',
    title: 'Зона ожидания',
    alt: 'Зона ожидания для пациентов',
    src: room4,
  },
  {
    id: 5,
    category: 'equipment',
    title: 'Процедурный кабинет',
    alt: 'Процедурный кабинет клиники',
    src: room5,
  },
  {
    id: 6,
    category: 'clinic',
    title: 'Санитарная комната',
    alt: 'Санитарная комната после ремонта',
    src: room6,
  },
  {
    id: 7,
    category: 'clinic',
    title: 'Комната для консультаций',
    alt: 'Комната для консультаций и встреч',
    src: room7,
  },
  {
    id: 8,
    category: 'doctors',
    title: 'Медицинская команда',
    alt: 'Команда врачей клинической больницы',
    src: doctorsTeam,
  },
]
