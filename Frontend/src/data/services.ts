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
    title: 'Первичный прием и консультации специалистов',
    description: 'Амбулаторный прием врачей разных направлений, включая терапевта, педиатра и профильных специалистов',
    icon: 'stethoscope',
    category: 'treatment',
  },
  {
    id: 2,
    title: 'Стоматология',
    description: 'Лечение зубов, профилактика и диагностика стоматологических заболеваний',
    icon: 'tooth',
    category: 'treatment',
  },
  {
    id: 3,
    title: 'Диагностическое отделение',
    description: 'УЗИ, ЭКГ, рентгенография и функциональная диагностика',
    icon: 'activity',
    category: 'diagnostics',
  },
  {
    id: 4,
    title: 'Медицинская реабилитация',
    description: 'Восстановительное лечение, физиотерапия, массаж и лечебная физкультура',
    icon: 'activity',
    category: 'treatment',
  },
  {
    id: 5,
    title: 'Дневной стационар',
    description: 'Лечение в условиях дневного пребывания без госпитализации',
    icon: 'bed',
    category: 'treatment',
  },
  {
    id: 6,
    title: 'Лабораторные исследования',
    description: 'Клинические, биохимические, иммунологические и микробиологические исследования',
    icon: 'flask',
    category: 'diagnostics',
  },
  {
    id: 7,
    title: 'Вакцинация',
    description: 'Вакцинация детей и взрослых, профилактические осмотры и диспансеризация',
    icon: 'syringe',
    category: 'prevention',
  },
  {
    id: 8,
    title: 'Хирургическая помощь',
    description: 'Плановая и экстренная хирургическая помощь, послеоперационный уход',
    icon: 'scissors',
    category: 'treatment',
  },
  {
    id: 9,
    title: 'Скорая помощь',
    description: 'Осмотр врача, выезд санитарной машины и экстренная помощь',
    icon: 'ambulance',
    category: 'treatment',
  },
  {
    id: 10,
    title: 'Компьютерная томография',
    description: 'КТ одной анатомической зоны, КТ с контрастированием и выдача заключений',
    icon: 'scan',
    category: 'diagnostics',
  },
]

export const serviceCategories = [
  { id: 'all' },
  { id: 'treatment' },
  { id: 'diagnostics' },
  { id: 'prevention' },
]
