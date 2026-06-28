import abdyldaeva from '@/assets/images/doctors/abdyldaeva.jpeg'
import abduraimov from '@/assets/images/doctors/abduraimov.jpeg'
import akmatova from '@/assets/images/doctors/akmatova.jpeg'
import amankulov from '@/assets/images/doctors/amankulov.jpeg'
import karataev from '@/assets/images/doctors/karataev.jpeg'
import mamatalieva from '@/assets/images/doctors/mamatalieva.jpeg'
import nazarkulova from '@/assets/images/doctors/nazarkulova.jpeg'
import prem from '@/assets/images/doctors/prem.jpeg'
import doctorDefault from '@/assets/images/doctors/doctor-default.png'

export interface Doctor {
  id: number
  name: string
  specialtyKey: string
  image: string
  experience: string
  category?: string
  schedule?: string
  department?: string
  specialization?: string[]
}

export const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Акматова Райхан Орозакуновна',
    specialtyKey: 'therapy',
    image: akmatova,
    experience: '45 лет',
    category: 'Врач высшей категории',
    department: 'ОГПМУ',
  },
  {
    id: 2,
    name: 'Кумар Прем',
    specialtyKey: 'therapy',
    image: prem,
    experience: '25 лет',
    category: 'Высшая категория',
    schedule: 'Пн-Сб: 10:00-13:30',
    department: 'ОГПМУ',
  },
  {
    id: 3,
    name: 'Абдылдаева С.М.',
    specialtyKey: 'therapy',
    image: abdyldaeva,
    experience: '41 лет',
    category: 'Высшая категория',
    schedule: 'Пн-Ср-Пт: 9:00-12:15',
    department: 'ОГПМУ',
  },
  {
    id: 4,
    name: 'Назаркулова Б.Т.',
    specialtyKey: 'psychotherapy',
    image: nazarkulova,
    experience: '49 года',
    schedule: 'Вт-Чт: 7:30-14:00',
    department: 'ОГПМУ',
  },
  {
    id: 5,
    name: 'Абдураимов Д.А.',
    specialtyKey: 'urology',
    image: abduraimov,
    experience: '14 лет',
    schedule: 'Вт-Чт: 7:30-14:00',
    department: 'ОГПМУ',
  },
  {
    id: 6,
    name: 'Маматалиева Н.М.',
    specialtyKey: 'gynecology',
    image: mamatalieva,
    experience: '4 года',
    schedule: 'Пн-Ср-Пт: 10:00-16:00',
    department: 'ОГПМУ',
  },
  {
    id: 7,
    name: 'Каратаев М.А.',
    specialtyKey: 'dentistry',
    image: karataev,
    experience: '33 года',
    department: 'ОГПМУ',
  },
  {
    id: 8,
    specialtyKey: 'ent',
    name: 'Аманкулов У.К.',
    image: amankulov || doctorDefault,
    experience: '21 год',
    category: 'Первая категория',
    schedule: 'Вт-Сб: 8:00-15:00',
    department: 'ОГПМУ',
    specialization: ['Эндоскопия ЛОР-органов', 'Слухопротезирование', 'Хирургия носа'],
  },
]

export const specialtyKeys = [
  'therapy',
  'psychotherapy',
  'urology',
  'gynecology',
  'dentistry',
  'ent',
]
