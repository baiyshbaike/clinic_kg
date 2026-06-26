export interface NewsItem {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  image?: string
}

export const news: NewsItem[] = [
  {
    id: 'yeni-rontgen-cihazi',
    title: 'Yeni Röntgen Cihazı Hizmete Girdi',
    excerpt: 'Hastanemize yeni nesil dijital röntgen cihazı monte edildi. Bu cihaz sayesinde daha hızlı ve doğru tanı konulabilecek.',
    content: 'Hastanemiz tıbbi altyapısını güçlendirmeye devam ediyor. Son teknoloji dijital röntgen cihazımız hasta kabulüne başladı. Yeni cihaz, minimal radyasyon ile yüksek çözünürlüklü görüntü elde etme kapasitesine sahip. Bu yatırım sayesinde hastalarımız daha hızlı ve doğru tanı alabilecekler.',
    date: '15 Mart 2024',
    category: 'Teknoloji',
  },
  {
    id: 'kardiyoloji-kongresi',
    title: 'Uluslararası Kardiyoloji Kongresi Düzenlendi',
    excerpt: 'Hastanemiz organizasyonunda gerçekleştirilen kongreye 200’den fazla doktor katıldı.',
    content: 'Uluslararası Kardiyoloji Kongresi, hastanemizin ev sahipliğinde başarıyla gerçekleşti. 15 ülkeden 200’den fazla doktorun katıldığı kongrede, kalp ve damar hastalıklarındaki son gelişmeler tartışıldı. Kongre boyunca sunulan bildiriler büyük ilgi gördü.',
    date: '10 Mart 2024',
    category: 'Etkinlik',
  },
  {
    id: 'cocuk-bolumu-yenilendi',
    title: 'Çocuk Servisi Yenilendi',
    excerpt: 'Çocuk hastalıkları bölümümüz yeni mobilyalar ve ekipmanlarla yeniden düzenlendi.',
    content: 'Çocuklarımızın daha konforlu bir ortamda tedavi edilmesi için çocuk servisimiz tamamen yenilendi. Yeni mobilyalar, renkli duvar boyaları ve modern tıbbi ekipmanlarla donatılan servisimiz, minik hastalarımıza daha iyi bir deneyim sunacak.',
    date: '5 Mart 2024',
    category: 'Yenileme',
  },
  {
    id: 'ucretsiz-saglik-taramasi',
    title: 'Ücretsiz Sağlık Taraması',
    excerpt: 'Halkımız için ücretsiz genel sağlık taraması düzenlenecektir.',
    content: 'Hastanemiz, toplum sağlığının korunması amacıyla ücretsiz genel sağlık taraması düzenliyor. Tarama kapsamında kan şekeri, tansiyon, kolesterol ve genel muayene yapılacak. Etkinlik 20 Mart tarihinde hastanemizde gerçekleştirilecektir.',
    date: '1 Mart 2024',
    category: 'Etkinlik',
  },
  {
    id: 'doktor-egitimi',
    title: 'Doktorlarımız Eğitim Aldı',
    excerpt: 'Hastane doktorlarımız son tıbbi gelişmeler konusunda eğitim aldı.',
    content: 'Hastanemizde görev yapan doktorlarımız, son tıbbi gelişmeler ve tedavi yöntemleri konusunda yoğun bir eğitim programından geçti. 3 gün süren eğitimde, yeni tanı ve tedavi yöntemleri uygulamalı olarak anlatıldı.',
    date: '25 Şubat 2024',
    category: 'Eğitim',
  },
  {
    id: 'laboratuvar-genisleme',
    title: 'Laboratuvar Genişletildi',
    excerpt: 'Laboratuvar bölümümüz yeni test kapasitesi ile genişletildi.',
    content: 'Hastanemiz laboratuvarı, artan hasta kapasitesini karşılamak amacıyla genişletildi. Yeni eklenen cihazlar sayesinde daha fazla test çeşidi yapılabilecek ve sonuçlar daha hızlı çıkabilecek.',
    date: '20 Şubat 2024',
    category: 'Yenileme',
  },
]
