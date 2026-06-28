import room1 from '@/assets/images/gallery/rooms/img1.jpeg'
import room2 from '@/assets/images/gallery/rooms/img2.jpeg'
import room3 from '@/assets/images/gallery/rooms/img3.jpeg'
import room4 from '@/assets/images/gallery/rooms/img4.jpeg'
import room5 from '@/assets/images/gallery/rooms/img5.jpeg'
import room6 from '@/assets/images/gallery/rooms/img6.jpeg'

export interface RenovationImage {
  title: string
  src: string
}

export interface RenovationDepartment {
  id: string
  name: string
  description: string
  beforeImages: RenovationImage[]
  afterImages: RenovationImage[]
}

export const renovationProgram = {
  title: 'Ремонтные работы',
  subtitle: 'Модернизация и обновление отделений больницы',
  description:
    'Масштабная программа модернизации клиники была запущена в 2023 году с целью улучшения условий оказания медицинской помощи и внедрения современных технологий. Ремонтные работы затронули ключевые отделения больницы.',
}

export const renovationDepartments: RenovationDepartment[] = [
  {
    id: 'cardiology',
    name: 'Кардиология',
    description: 'Обновление палат и рабочих помещений кардиологического профиля',
    beforeImages: [{ title: 'Кардиология до ремонта', src: room4 }],
    afterImages: [
      { title: 'Кардиология после ремонта', src: room1 },
      { title: 'Палата после обновления', src: room2 },
    ],
  },
  {
    id: 'surgery',
    name: 'Хирургия',
    description: 'Обновление процедурных и послеоперационных зон',
    beforeImages: [{ title: 'Хирургия до ремонта', src: room6 }],
    afterImages: [{ title: 'Процедурный кабинет после ремонта', src: room5 }],
  },
  {
    id: 'diagnostics',
    name: 'Диагностическое отделение',
    description: 'Создание более удобной среды для диагностических исследований',
    beforeImages: [{ title: 'Диагностика до ремонта', src: room4 }],
    afterImages: [{ title: 'Диагностический кабинет после ремонта', src: room3 }],
  },
]
