/*

headerImage: {
image: "/images/invest/n-park-ul-trakt-brzeski-warszawa/naglowek.jpg",
sizeString: "1176x655"
},
map: {
image: "/images/invest/n-park-ul-trakt-brzeski-warszawa/mapa.jpg",
imageBig: "/images/invest/n-park-ul-trakt-brzeski-warszawa/mapa2.jpg",
sizeString: "2560x1440"
},
siteLink: {
link: "http://wesola.npark.pl/",
name: "WESOLA.NPARK.PL"
},
movie: null,
gallery: [
{
image: "/images/invest/n-park-ul-trakt-brzeski-warszawa/gallery/galeria.jpg",
sizeString: "1176x786"
}
],
plans: [
{
image: "/images/invest/n-park-ul-trakt-brzeski-warszawa/plans/plan1.jpg",
sizeString: "1176x786",
file: "/images/invest/n-park-ul-trakt-brzeski-warszawa/plans/plan1_pobierz.pdf",
details: [
{
title: "PODSTAWOWE DANE PROJECT DATA",
type: "list",
data: [
{
label: "Powierzchnia najmu",
value: "2716 m2"
},
{
label: "Poziom Level",
value: 1
}
]
},
{
title: "LOKALIZACJA LOCATION",
type: "content",
data: [
{
label: "Wrocław, woj. dolnośląskie ul. Jurija Gagarina 27",
value: ""
}
]
}
]
},
{
image: "/images/invest/n-park-ul-trakt-brzeski-warszawa/plans/plan2.jpg",
sizeString: "1176x786",
file: "/images/invest/n-park-ul-trakt-brzeski-warszawa/plans/plan2_pobierz.pdf",
details: [
{
title: "PODSTAWOWE DANE PROJECT DATA",
type: "list",
data: [
{
label: "Powierzchnia najmu",
value: "2716 m2"
},
{
label: "Poziom Level",
value: 1
}
]
},
{
title: "LOKALIZACJA LOCATION",
type: "content",
data: [
{
label: "Wrocław, woj. dolnośląskie ul. Jurija Gagarina 27",
value: ""
}
]
}
]
},
{
image: "/images/invest/n-park-ul-trakt-brzeski-warszawa/plans/plan3.jpg",
sizeString: "1176x786",
file: "/images/invest/n-park-ul-trakt-brzeski-warszawa/plans/plan3_pobierz.pdf",
details: [
{
title: "PODSTAWOWE DANE PROJECT DATA",
type: "list",
data: [
{
label: "Powierzchnia najmu",
value: "2716 m2"
},
{
label: "Poziom Level",
value: 1
}
]
},
{
title: "LOKALIZACJA LOCATION",
type: "content",
data: [
{
label: "Wrocław, woj. dolnośląskie ul. Jurija Gagarina 27",
value: ""
}
]
}
]
}
],
contacts: [
{
who: "Manager ds. Komercjalizacji",
name: "AGATA GRYMUZA",
email: "a.grymuza@napollo.pl",
phone: "kom.: 665 101 906"
},
{
who: "Manager ds. Komercjalizacji",
name: "JUSTYNA WĄSOWSKA",
email: "j.wasowska@napollo.pl",
phone: "kom.: 602 123 999"
}
],
rentiersContacts: [
{
who: "Kierownik ds. Zarządzania Nieruchomościami",
name: "Monika Miksa",
email: "m.miksa@napollo.pl ",
phone: "kom.: 519 031 415"
}
],
managementContacts: [
{
who: "Kierownik ds. Zarządzania Nieruchomościami",
name: "Monika Miksa",
email: "m.miksa@napollo.pl",
phone: "kom.: 519 031 415"
}
],
id: 16,
mainName: "N-PARK",
projectName: "N-Park",
slug: "n-park-warszawa-16",
address: "ul. Trakt Brzeski",
city: "Warszawa",
areaSize: "3200 m<sup>2",
parkingAreaSize: "120",
rentiers: "Hebe, klub fitness Zdrofit, Biedronka, sklep mięsny Stanisławów",
textLeft: "N-Park przy ul. Trakt Brzeski to dwupiętrowy park handlowy typu convenience z parkingiem naziemnym. Powstał w Dzielnicy Wesoła m.st. Warszawy. Projekt jest doskonale skomunikowany z pobliskim Sulejówkiem oraz znajduje się tuż przy drodze krajowej nr 2 - trasa Warszawa - Terespol. ",
textRight: "W obiekcie działają m.in. market spożywczy Biedronka, fitness klub Zdrofit oraz drogeria Hebe. Doskonały układ komunikacyjny i wygodny parking sprawiają, że jest to komfortowe miejsce codziennych zakupów i usług.",
horizontImage: "/images/invest/n-park-ul-trakt-brzeski-warszawa/panorama.jpg",
logo: "/logotypes/LOGO_N-PARK.png",
lat: "52.22",
lng: "21.24",
openDate: "2019 r.",
remodeling: "",
buyDate: "",
status: "open-invest",
ordering: 16,
metaKeywords: null,
metaDescription: null,


*/

export interface HeaderImage {
  image: string
  sizeString: string
}

export interface MapImage {
  image: string
  imageBig: string
  sizeString: string
}

export interface SiteLink {
  link: string
  name: string
}

export interface GalleryImage {
  image: string
  sizeString: string
}

export interface PlanDetailData {
  label: string
  value: string
}

export interface PlanDetail {
  title: string
  type: string
  data: PlanDetailData[]
}

export interface FreeArea {
  showArea: boolean
  valueArea: string
}

export interface Plan {
  image: string
  sizeString: string
  file: string
  showFile?: boolean
  isAsZone?: boolean
  details: PlanDetail[]
  freeArea?: FreeArea
}

export interface InvestContact {
  who: string
  name: string
  email: string
  phone: string
}

export interface InvestRentiersContact {
  who: string
  name: string
  email: string
  phone: string
}

export interface InvestMenagmentsContact {
  who: string
  name: string
  email: string
  phone: string
}

export interface Zone {
  image: string
  sizeString: string
  pdf: string
  showFile?: boolean
}

export interface Invest {
  id?: number
  headerImage: HeaderImage
  map: MapImage
  siteLink: SiteLink
  movie: any
  gallery: GalleryImage[],
  plans: Plan[]
  contacts: InvestContact[]
  rentiersContacts: InvestRentiersContact[]
  managementContacts: InvestMenagmentsContact[]
  zone: Zone
  mainName: string
  projectName: string
  slug: string
  address: string
  city: string
  areaSize: string
  parkingAreaSize: string
  rentiers: string
  textLeft: string
  textRight: string
  horizontImage: string
  logo: string
  lat: string
  lng: string
  openDate: string
  remodeling: string
  buyDate: string
  status: "open-invest" | "plan-invest",
  ordering: number
  isShow?: boolean
  metaKeywords: string
  metaDescription: string
}
