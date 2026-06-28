export interface Service {
  id: number
  title: string
  description: string
  icon: string
  category: 'treatment' | 'diagnostics' | 'prevention'
}

export const services: Service[] = [
  {
    id: 1,
    title: 'Кардиология',
    description: 'Диагностика и лечение заболеваний сердца и сосудов',
    icon: 'heart',
    category: 'treatment',
  },
  {
    id: 2,
    title: 'Терапия',
    description: 'Комплексное обследование и лечение внутренних заболеваний',
    icon: 'activity',
    category: 'treatment',
  },
  {
    id: 3,
    title: 'Педиатрия',
    description: 'Медицинская помощь детям от рождения до подросткового возраста',
    icon: 'baby',
    category: 'treatment',
  },
  {
    id: 4,
    title: 'Офтальмология',
    description: 'Диагностика и лечение заболеваний глаз',
    icon: 'eye',
    category: 'treatment',
  },
  {
    id: 5,
    title: 'Лаборатория',
    description: 'Медицинские анализы и лабораторная диагностика',
    icon: 'flask',
    category: 'diagnostics',
  },
  {
    id: 6,
    title: 'Вакцинация',
    description: 'Профилактика инфекционных заболеваний',
    icon: 'syringe',
    category: 'prevention',
  },
  {
    id: 7,
    title: 'Хирургия',
    description: 'Современные хирургические вмешательства',
    icon: 'scissors',
    category: 'treatment',
  },
  {
    id: 8,
    title: 'Неврология',
    description: 'Диагностика и лечение заболеваний нервной системы',
    icon: 'brain',
    category: 'treatment',
  },
  {
    id: 9,
    title: 'Ортопедия',
    description: 'Лечение заболеваний опорно-двигательного аппарата',
    icon: 'bone',
    category: 'treatment',
  },
  {
    id: 10,
    title: 'Гинекология',
    description: 'Женское здоровье и акушерско-гинекологическая помощь',
    icon: 'heart',
    category: 'treatment',
  },
  {
    id: 11,
    title: 'Внутренние болезни',
    description: 'Прием, обследование и лечение внутренних заболеваний',
    icon: 'stethoscope',
    category: 'treatment',
  },
  {
    id: 12,
    title: 'ЛОР',
    description: 'Лечение заболеваний уха, горла и носа',
    icon: 'ear',
    category: 'treatment',
  },
]

export const serviceCategories = [
  { id: 'all' },
  { id: 'treatment' },
  { id: 'diagnostics' },
  { id: 'prevention' },
]
