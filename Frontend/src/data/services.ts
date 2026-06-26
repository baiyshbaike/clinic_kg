export interface Service {
  id: number
  title: string
  description: string
  icon: string
  category: string
}

export const services: Service[] = [
  {
    id: 1,
    title: 'Kardiyoloji',
    description: 'Kalp ve damar hastalıklarının tanı ve tedavisi',
    icon: 'heart',
    category: 'Tedavi',
  },
  {
    id: 2,
    title: 'Terapi',
    description: 'İç hastalıklarının kapsamlı muayene ve tedavisi',
    icon: 'activity',
    category: 'Tedavi',
  },
  {
    id: 3,
    title: 'Pediatri',
    description: 'Doğumdan ergenliğe kadar çocuk sağlığı bakımı',
    icon: 'baby',
    category: 'Tedavi',
  },
  {
    id: 4,
    title: 'Oftalmoloji',
    description: 'Göz hastalıklarının tanı ve tedavisi',
    icon: 'eye',
    category: 'Tedavi',
  },
  {
    id: 5,
    title: 'Laboratuvar',
    description: 'Kapsamlı tıbbi test ve analiz hizmetleri',
    icon: 'flask',
    category: 'Tanı',
  },
  {
    id: 6,
    title: 'Aşılama',
    description: 'Enfeksiyön hastalıkların önlenmesi',
    icon: 'syringe',
    category: 'Korunma',
  },
  {
    id: 7,
    title: 'Cerrahi',
    description: 'Modern cerrahi müdahaleler',
    icon: 'scissors',
    category: 'Tedavi',
  },
  {
    id: 8,
    title: 'Nöroloji',
    description: 'Sinir sistemi hastalıklarının tedavisi',
    icon: 'brain',
    category: 'Tedavi',
  },
  {
    id: 9,
    title: 'Ortopedi',
    description: 'Kas ve iskelet sistemi hastalıkları',
    icon: 'bone',
    category: 'Tedavi',
  },
  {
    id: 10,
    title: 'Kadın Doğum',
    description: 'Kadın sağlığı ve doğum hizmetleri',
    icon: 'heart',
    category: 'Tedavi',
  },
  {
    id: 11,
    title: 'Dahiliye',
    description: 'İç hastalıkları muayene ve tedavisi',
    icon: 'stethoscope',
    category: 'Tedavi',
  },
  {
    id: 12,
    title: 'KBB',
    description: 'Kulak, burun, boğaz hastalıkları tedavisi',
    icon: 'ear',
    category: 'Tedavi',
  },
]

export const serviceCategories = [
  { id: 'all', label: 'Tümü' },
  { id: 'Tedavi', label: 'Tedavi' },
  { id: 'Tanı', label: 'Tanı' },
  { id: 'Korunma', label: 'Korunma' },
]
