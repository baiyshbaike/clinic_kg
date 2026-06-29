export interface ManagementMember {
  id: string
  name: string
  position: string
  phoneNumber: string
  email: string
  description: string
  order: number
}

export const management: ManagementMember[] = [
  {
    id: '1',
    name: 'Иванов Иван Иванович',
    position: 'Главный врач',
    phoneNumber: '+996 (312) 66-35-49',
    email: 'director@clinic.gov.kg',
    description: 'Кандидат медицинских наук, врач высшей категории. Стаж работы более 25 лет.',
    order: 1,
  },
  {
    id: '2',
    name: 'Петрова Марина Сергеевна',
    position: 'Заместитель главного врача по медицинской части',
    phoneNumber: '+996 (312) 66-35-50',
    email: 'med@clinic.gov.kg',
    description: 'Врач высшей категории, специалист по внутренним болезням. Стаж работы 20 лет.',
    order: 2,
  },
  {
    id: '3',
    name: 'Сидоров Алексей Петрович',
    position: 'Заместитель главного врача по хирургии',
    phoneNumber: '+996 (312) 66-35-51',
    email: 'surgery@clinic.gov.kg',
    description: 'Доктор медицинских наук, хирург высшей категории. Стаж работы 22 года.',
    order: 3,
  },
  {
    id: '4',
    name: 'Кузнецова Елена Владимировна',
    position: 'Главная медсестра',
    phoneNumber: '+996 (312) 66-35-52',
    email: 'nursing@clinic.gov.kg',
    description: 'Медсестра высшей категории. Стаж работы 18 лет.',
    order: 4,
  },
]
