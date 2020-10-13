const program = require('commander');
const faker = require('faker');
const fs = require('fs');
const slug = require('slug')
const paths = require('../paths')
const imageSize = require('image-size')
const {
    map
} = require('p-iteration');
const sequelize = require('../config/sequelize')
const User = require('../models/index').User
const Invest = require('../models/index').Invest
const Point = require('../models/index').Point
const Contact = require('../models/index').Contact
const Article = require('../models/index').Article
const Slide = require('../models/index').Slide
const Password = require('../helpers/password')
const cache = require('../config/cache')


program
    .command('sync-orm')
    .action(() => {
        sequelize.sync({
            force: true
        })
    })

program
    .command('create-user')
    .action(() => {
        Password.getHash('!NPDeco421').then(pass => {
            User.create({
                email: 'admin@napollo.pl',
                password: pass,
                status: 1
            }).then(r => {
                console.log(r)
            })
        })
    })


async function makeImagesFolders() {

    var nlist = fs.readFileSync(paths.root + '/config/resources/invest.json')
    nlist = JSON.parse(nlist)
    var data = []
    await map(nlist, async (n, i) => {

        var folder = slug(n.nazwa_glowna_projektu + ' ' + n.lokalizacja_lista, {
            lower: true
        })
        var nn = n;
        nn.folder = '/images/invest/' + folder
        data.push(nn)

        var np = paths.root + '/static/images/invest/' + folder

        if (!fs.existsSync(np))
            fs.mkdirSync(np)

        if (!fs.existsSync(np + '/gallery'))
            fs.mkdirSync(np + '/gallery')


        if (!fs.existsSync(np + '/plans'))
            fs.mkdirSync(np + '/plans')

    })

    return data

}

program
    .command('make-folders')
    .action(() => {

        makeImagesFolders().then(nj => {
            // console.log(nj)
            fs.writeFileSync(paths.root + '/config/resources/invest.json', JSON.stringify(nj))
        })

    })

async function checkIsMap(folder) {

    var bool = false
    var bool2 = false
    // console.log(folder)
    var files = fs.readdirSync(paths.root + '/static' + folder)
    await map(files, async (fl, i) => {
        if (fl == 'mapa.jpg')
            bool = true
    })

    await map(files, async (fl, i) => {
        if (fl == 'mapa2.jpg')
            bool2 = true
    })

    // console.log(bool)
    return bool && bool2

}

async function checkIsHeader(folder) {
    var bool = false
    var files = fs.readdirSync(paths.root + '/static' + folder)
    await map(files, async (fl, i) => {
        if (fl == 'naglowek.jpg')
            bool = true
    })

    return bool
}



async function checkIsHorizont(folder) {
    var bool = false
    var files = fs.readdirSync(paths.root + '/static' + folder)
    await map(files, async (fl, i) => {
        if (fl == 'panorama.jpg')
            bool = true
    })

    return bool
}

async function checkIsGalleryGetValues(folder) {

    var files = fs.readdirSync(paths.root + '/static' + folder + '/gallery')
    var gallery = []
    await map(files, async (p, i) => {
        var size = await imageSize(paths.root + '/static' + folder + '/gallery/' + p)
        // console.log(size)
        gallery.push({
            image: folder + '/gallery/' + p,
            sizeString: size.width + 'x' + size.height,
        })
    })
    return gallery

}


async function checkIsPlansGetValues(folder) {

    var files = fs.readdirSync(paths.root + '/static' + folder + '/plans')
    var plans = []
    var details = [{
        title: "PODSTAWOWE DANE PROJECT DATA",
        type: "list",
        data: [{
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
        data: [{
            label: "Wrocław, woj. dolnośląskie ul. Jurija Gagarina 27",
            value: ""
        }]
    }
    ]
    await map(files, async (p, i) => {

        if (p.indexOf('.pdf') === -1) {
            var size = await imageSize(paths.root + '/static' + folder + '/plans/' + p)
            // console.log(size)
            var pdf = p.replace(/\.jpg/gi, '')
            plans.push({
                image: folder + '/plans/' + p,
                sizeString: size.width + 'x' + size.height,
                file: folder + '/plans/' + pdf + '_pobierz.pdf',
                details: details
            })
        }

    })
    return plans

}


async function checkIsZoneGetValues(folder) {

    var files = fs.readdirSync(paths.root + '/static' + folder + '/strefa')
    var zone = null

    await map(files, async (p, i) => {

        if (p == 'strefa_zasiegu.jpg') {
            var size = await imageSize(paths.root + '/static' + folder + '/strefa/' + p)
            zone = {}
            zone.sizeString = size.width + 'x' + size.height
            zone.image = folder + '/strefa/strefa_zasiegu.jpg'
            zone.pdf = folder + '/strefa/strefa_zasiegu_pobierz.pdf'
        }

    })
    return zone

}


async function makeImages() {

    var nlist = fs.readFileSync(paths.root + '/config/resources/invest.json')
    nlist = JSON.parse(nlist)
    var data = []
    await map(nlist, async (n, i) => {

        var nn = n;

        var isMap = await checkIsMap(n.folder)
        var isHeader = await checkIsHeader(n.folder)
        var isHorizont = await checkIsHorizont(n.folder)
        var gallery = await checkIsGalleryGetValues(n.folder)
        var plans = await checkIsPlansGetValues(n.folder)
        var zone = await checkIsZoneGetValues(n.folder)



        if (isMap) {
            var mSize = await imageSize(paths.root + '/static' + n.folder + '/mapa2.jpg')
            nn.map = {
                image: n.folder + '/mapa.jpg',
                imageBig: n.folder + '/mapa2.jpg',
                sizeString: mSize.width + 'x' + mSize.height
            }
        } else {
            nn.map = null
        }

        if (isHeader) {
            var hSize = await imageSize(paths.root + '/static' + n.folder + '/naglowek.jpg')
            nn.headerImage = {
                image: n.folder + '/naglowek.jpg',
                sizeString: hSize.width + 'x' + hSize.height
            }
        } else {
            nn.headerImage = null
        }

        if (isHorizont) {
            nn.horizontImage = n.folder + '/panorama.jpg'
        } else {
            nn.horizontImage = null
        }




        nn.gallery = gallery
        nn.plans = plans
        nn.zone = zone

        data.push(nn)

    })

    return data

}


program
    .command('make-images')
    .action(() => {

        makeImages().then(nj => {
            fs.writeFileSync(paths.root + '/config/resources/invest.json', JSON.stringify(nj))
        })

    })


async function makeContacts() {
    var nlist = fs.readFileSync(paths.root + '/config/resources/invest.json')
    nlist = JSON.parse(nlist)
    var data = []
    await map(nlist, async (n, i) => {

        var nn = n;

        var contacts = []

        if (n.kontakt_stanowisko_1 != "") {
            contacts.push({
                who: n.kontakt_stanowisko_1,
                name: n.kontakt_osoba_1,
                email: n.kontakt_mail_1,
                phone: n.kontakt_telefon_1
            })
        }

        if (n.kontakt_stanowisko_2 != "") {
            contacts.push({
                who: n.kontakt_stanowisko_2,
                name: n.kontakt_osoba_2,
                email: n.kontakt_mail_2,
                phone: n.kontakt_telefon_2
            })
        }

        if (n.kontakt_stanowisko_3 != "") {
            contacts.push({
                who: n.kontakt_stanowisko_3,
                name: n.kontakt_osoba_3,
                email: n.kontakt_mail_3,
                phone: n.kontakt_telefon_13
            })
        }

        nn.contacts = contacts


        var rentiersContacts = []

        if (n.najem_stanowisko != "") {
            rentiersContacts.push({
                who: n.najem_stanowisko,
                name: n.najem_osoba,
                email: n.najem_mail,
                phone: n.najem_telefon
            })
        }

        nn.rentiersContacts = rentiersContacts

        var managementContacts = []

        if (n.zarzadca_stanowisko != "") {
            managementContacts.push({
                who: n.zarzadca_stanowisko,
                name: n.zarzadca_osoba,
                email: n.zarzadca_mail,
                phone: n.zarzadca_telefon
            })
        }

        nn.managementContacts = managementContacts

        data.push(nn)

    })

    return data

}

program
    .command('make-contacts')
    .action(() => {

        makeContacts().then(nj => {
            fs.writeFileSync(paths.root + '/config/resources/invest.json', JSON.stringify(nj))
        })


    })


async function makeSiteContacts() {

    var clist = fs.readFileSync(paths.root + '/config/resources/contacts.json')
    clist = JSON.parse(clist)

    await map(clist, async (n, i) => {

        var contact = Object.assign({}, n)
        contact.ordering = (i + 1)
        var c = await Contact.create(contact)

    })

}

program
    .command('make-site-contacts')
    .action(() => {

        makeSiteContacts().then(c => {

        })


    })

async function makeArticles() {

    var arts = fs.readFileSync(paths.root + '/config/resources/articles.json')
    arts = JSON.parse(arts)

    await map(arts, async (a, i) => {

        var art = Object.assign({}, a)
        if (art.customData) {
            art.customData = JSON.stringify(a.customData)
        }
        var a = await Article.create(art)

    })

}

program
    .command('make-articles')
    .action(() => {

        makeArticles().then(a => {

        })


    })


async function makeSiteLink() {
    var nlist = fs.readFileSync(paths.root + '/config/resources/invest.json')
    nlist = JSON.parse(nlist)
    var data = []
    await map(nlist, async (n, i) => {

        var nn = n;
        var siteLink = null

        if (n.link_http != "") {
            siteLink = {}
            siteLink.link = n.link_http
            if (n.link_nazwa != "") {
                siteLink.name = n.link_nazwa
            } else {
                siteLink.nazwa = n.link_http
            }
        }

        nn.siteLink = siteLink

        data.push(nn)

    })

    return data;
}


program
    .command('make-sitelink')
    .action(() => {

        makeSiteLink().then(nj => {
            fs.writeFileSync(paths.root + '/config/resources/invest.json', JSON.stringify(nj))
        })


    })



function makeInvestObjectToCreate(n, i) {

    var textLeft = n.text_left.replace(/<\/?[^>]+(>|$)/g, "");
    var textRight = n.text_right.replace(/<\/?[^>]+(>|$)/g, "");

    var elem = {
        mainName: n.nazwa_glowna_projektu,
        projectName: n.nazwa_projektu,
        slug: null,
        address: n.adres,
        city: n.lokalizacja,
        areaSize: n.powierzchnia_najmu,
        parkingAreaSize: n.parking,
        rentiers: n.najemcy,
        textLeft,
        textRight,
        headerImage: (n.headerImage) ? JSON.stringify(n.headerImage) : null,
        horizontImage: n.horizontImage,
        map: (n.map) ? JSON.stringify(n.map) : null,
        logo: '/logotypes/' + n.logo,
        lat: n.map_lat,
        lng: n.map_long,
        siteLink: (n.map) ? JSON.stringify(n.siteLink) : null,
        openDate: n.data_otwarcia,
        remodeling: n.remodeling,
        buyDate: n.data_zakupu,
        gallery: JSON.stringify(n.gallery),
        plans: JSON.stringify(n.plans),
        zone: (n.zone) ? JSON.stringify(n.zone) : null,
        contacts: JSON.stringify(n.contacts),
        rentiersContacts: JSON.stringify(n.rentiersContacts),
        managementContacts: JSON.stringify(n.managementContacts),
        ordering: (i + 1)
    }

    if (n.status == 2) {
        elem.status = 'open-invest'
    }
    if (n.status == 3) {
        elem.status = 'plan-invest'
    }

    return elem

}


async function makeInvests() {

    var nlist = fs.readFileSync(paths.root + '/config/resources/invest.json')
    nlist = JSON.parse(nlist)
    var data = []
    await map(nlist, async (n, i) => {

        // if (n.nazwa_glowna_projektu == "N-PARK") {
        var d = makeInvestObjectToCreate(n, i)
        data.push(d)
        // }

    })

    fs.writeFileSync(paths.root + '/config/resources/invest_filtered_list.json', JSON.stringify(data))

}

program
    .command('make-data')
    .action(() => {

        makeInvests()

    })


async function insertInvests() {


    var nlist = fs.readFileSync(paths.root + '/config/resources/invest_filtered_list.json')
    nlist = JSON.parse(nlist)

    await map(nlist, async (n, i) => {

        var inv = await Invest.create(n)
        var slugData = slug(inv.mainName + ' ' + inv.city + '-' + inv.id, {
            lower: true
        })
        await Invest.update({
            slug: slugData
        }, {
            where: {
                id: inv.id
            }
        })

    })

}

program
    .command('insert-invests')
    .action(() => {

        insertInvests()

    })

async function refactorPoints() {

    var mapPoland = fs.readFileSync(paths.root + '/config/resources/map_poland.json')
    mapPoland = JSON.parse(mapPoland)
    var nJson = []

    await map(mapPoland, async (n, i) => {

        if (n.type == 'single') {
            if (n.child) {
                var inv = await Invest.findOne({
                    where: {
                        id: n.child.investId
                    }
                })
                var slugData = slug(inv.mainName + ' ' + inv.city + '-' + inv.id, {
                    lower: true
                })
                var nob = Object.assign({}, n)
                nob.child.url = "/" + slugData
                nJson.push(nob)
            }
        }

        if (n.type == 'collection') {
            var nob = Object.assign({}, n)
            await map(n.childs, async (el, j) => {
                var inv = await Invest.findOne({
                    where: {
                        id: n.childs[j].investId
                    }
                })
                var slugData = slug(inv.mainName + ' ' + inv.city + '-' + inv.id, {
                    lower: true
                })
                nob.childs[j].url = "/" + slugData

            })
            nJson.push(nob)
        }


    })

    return nJson

}


program
    .command('refactor-points')
    .action(() => {

        refactorPoints().then(nJson => {
            fs.writeFileSync(paths.root + '/config/resources/map_poland_links.json', JSON.stringify(nJson))
        })

    })

async function insertPoints() {

    var plist = fs.readFileSync(paths.root + '/config/resources/map_poland_links.json')
    plist = JSON.parse(plist)

    await map(plist, async (p, i) => {

        var np = Object.assign({}, p)
        np.child = JSON.stringify(p.child)
        np.childs = JSON.stringify(p.childs)
        await Point.create(np)

    })

}


program
    .command('insert-points')
    .action(() => {

        insertPoints()

    })


async function insertSlides() {
    var files = fs.readdirSync(paths.root + '/static/images/slides')
    await map(files, async (p, i) => {
        await Slide.create({
            image: '/images/slides/' + p,
            ordering: (i + 1),
            status: true
        })
    })
}


program
    .command('insert-slides')
    .action(() => {

        insertSlides()

    })


async function cloudsPointUpdate() {
    var points = await Point.findAll()

    await map(points, async (p, i) => {

        var newChilds = []
        await map(p.childs, async (ch, j) => {
            ch.isShow = true
            newChilds.push(ch)
        })

        p.childs = newChilds
        await p.save()

    })
}

program
    .command('points-clouds-update')
    .action(() => {

        cloudsPointUpdate()
    })


async function refactorPlans() {

    var invests = await Invest.findAll()

    await map(invests, async (inv, i) => {

        if (inv.plans) {
            if (inv.plans != '') {

                var plans = []
                await map(inv.plans, async (p, j) => {
                    p.showFile = true
                    plans.push(p)
                })

                await Invest.update({
                    plans
                }, {
                    where: {
                        id: inv.id
                    }
                })

            }
        }

    })

}

program
    .command('refactor-plans')
    .action(() => {
        refactorPlans()
    })

async function refactorZones() {

    var invests = await Invest.findAll()

    await map(invests, async (inv, i) => {

        if (inv.zone) {
            if (inv.zone != '') {

                var zone = Object.assign({}, inv.zone)
                zone.showFile = true

                await Invest.update({
                    zone
                }, {
                    where: {
                        id: inv.id
                    }
                })

            }
        }

    })

}


program
    .command('refactor-zones')
    .action(() => {
        refactorZones()
    })

program
    .command('cachement-if-set')
    .action(() => {
        var cachmentPlaceChange = async () => {
            var invests = await Invest.findAll()
            await map(invests, async (inv, i) => {
                var pln = Object.assign([], inv.plans)
                if (inv.plans && inv.plans != '') {
                    pln.map(p => {
                        p.isAsZone = false
                        return p
                    })
                    console.log(pln)
                }
                inv.plans = pln
                await inv.save()
            })

        }
        cachmentPlaceChange()
    })

program
    .command('cachement-place-change')
    .action(() => {
        var cachmentPlaceChange = async () => {
            var invests = await Invest.findAll()
            await map(invests, async (inv, i) => {
                var pln = inv.plans
                var zone = inv.zone
                if (inv.zone && inv.zone != '') {
                    var nplanZone = Object.assign({}, zone)
                    var pdfToFile = nplanZone.pdf
                    var {
                        pdf,
                        ...reducePlan
                    } = nplanZone
                    reducePlan.file = pdfToFile
                    reducePlan.details = []
                    reducePlan.isAsZone = true
                    // console.log(reducePlan)
                    pln.push(reducePlan)
                    inv.plans = pln
                    await inv.save()
                }
            })
        }
        cachmentPlaceChange()
    })

program
    .command('set-movies')
    .action(() => {

        var setMovies = async () => {
            var invest = await Invest.findOne({
                where: {
                    id: 11
                }
            })
            invest.movie = [{
                ytId: 'po_Mpl6r3hs'
            }]
            await invest.save()
        }

        setMovies()

    })


program
    .command('area-set')
    .action(() => {

        var setArea = async () => {
            var invests = await Invest.findAll()
            await map(invests, async (inv, i) => {
                var pln = Object.assign([], inv.plans)
                if (inv.plans && inv.plans != '') {
                    pln.map(p => {
                        p.freeArea = {
                            showArea: false,
                            valueArea: ''
                        }
                        return p
                    })
                    // console.log(pln)
                }
                inv.plans = pln
                await inv.save()
            })
        }

        setArea()

    })

program.parse(process.argv)