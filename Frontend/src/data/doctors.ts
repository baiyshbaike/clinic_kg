import abakirova from '@/assets/images/doctors/abakirova.jpeg'
import abdyldaeva from '@/assets/images/doctors/abdyldaeva.jpeg'
import abduraimov from '@/assets/images/doctors/abduraimov.jpeg'
import akmatova from '@/assets/images/doctors/akmatova.jpeg'
import amankulov from '@/assets/images/doctors/amankulov.jpeg'
import bubusaira from '@/assets/images/doctors/bubusaira.jpeg'
import karataev from '@/assets/images/doctors/karataev.jpeg'
import keneeva from '@/assets/images/doctors/keneeva.jpeg'
import mamatalieva from '@/assets/images/doctors/mamatalieva.jpeg'
import nazarkulova from '@/assets/images/doctors/nazarkulova.jpeg'
import prem from '@/assets/images/doctors/prem.jpeg'
import sherimbekova from '@/assets/images/doctors/sherimbekova.jpeg'
import tashbulatova from '@/assets/images/doctors/tashbulatova.jpeg'
import usupova from '@/assets/images/doctors/usupova.jpeg'
import yacuba from '@/assets/images/doctors/yacuba.jpeg'
import doctorDefault from '@/assets/images/doctors/doctor-default.png'

export interface Doctor {
  id: number
  name: string
  specialtyKey: string
  image: typeof doctorDefault
  experience: string
}

export const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Айгуль Абакирова',
    specialtyKey: 'cardiology',
    image: abakirova,
    experience: '15+',
  },
  {
    id: 2,
    name: 'Нургуль Абдылдаева',
    specialtyKey: 'therapy',
    image: abdyldaeva,
    experience: '12+',
  },
  {
    id: 3,
    name: 'Руслан Абдураимов',
    specialtyKey: 'surgery',
    image: abduraimov,
    experience: '18+',
  },
  {
    id: 4,
    name: 'Чынара Акматова',
    specialtyKey: 'pediatrics',
    image: akmatova,
    experience: '10+',
  },
  {
    id: 5,
    name: 'Бакыт Аманкулов',
    specialtyKey: 'orthopedics',
    image: amankulov,
    experience: '14+',
  },
  {
    id: 6,
    name: 'Айша Бубусаира',
    specialtyKey: 'ophthalmology',
    image: bubusaira,
    experience: '11+',
  },
  {
    id: 7,
    name: 'Нурлан Каратаев',
    specialtyKey: 'neurology',
    image: karataev,
    experience: '16+',
  },
  {
    id: 8,
    name: 'Айжан Кенеева',
    specialtyKey: 'gynecology',
    image: keneeva,
    experience: '13+',
  },
  {
    id: 9,
    name: 'Гульнур Маматалиева',
    specialtyKey: 'generalPractice',
    image: mamatalieva,
    experience: '17+',
  },
  {
    id: 10,
    name: 'Надежда Назаркулова',
    specialtyKey: 'ent',
    image: nazarkulova,
    experience: '12+',
  },
  {
    id: 11,
    name: 'Сергей Прем',
    specialtyKey: 'anesthesiology',
    image: prem,
    experience: '20+',
  },
  {
    id: 12,
    name: 'Аида Шеримбекова',
    specialtyKey: 'dermatology',
    image: sherimbekova,
    experience: '9+',
  },
  {
    id: 13,
    name: 'Жанна Ташбулатова',
    specialtyKey: 'endocrinology',
    image: tashbulatova,
    experience: '14+',
  },
  {
    id: 14,
    name: 'Батма Усупова',
    specialtyKey: 'urology',
    image: usupova,
    experience: '11+',
  },
  {
    id: 15,
    name: 'Олег Якуба',
    specialtyKey: 'radiology',
    image: yacuba,
    experience: '19+',
  },
]

export const specialtyKeys = [
  'cardiology',
  'therapy',
  'surgery',
  'pediatrics',
  'orthopedics',
  'ophthalmology',
  'neurology',
  'gynecology',
  'generalPractice',
  'ent',
  'anesthesiology',
  'dermatology',
  'endocrinology',
  'urology',
  'radiology',
]
