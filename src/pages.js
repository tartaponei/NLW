const Database = require("./database/db")

const {subjects, weekdays, getSubject, convertHoursToMinutes} = require("./utils/format")

//=======================================================variáveis (listas - atributos?)
function pageLanding(req, res) {
    //return res.sendFile(__dirname + "/views/index.html") //__dirname é a pasta src
    //já coloquei lá no nunjucks a pasta que eu quero
    return res.render("index.html")
}

async function pageStudy (req, res) {
    //req.query são as respostas do formulário (requerimento...)
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time) { //se um dos filtros estiver vazio 
        return res.render("study.html", {filters, subjects, weekdays}) //no endereço study ele vai renderizar o study.html
    }

    const timeToMinutes = convertHoursToMinutes(filters.time) //converte hora em minuto

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = "${filters.subject}";
    `
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render("study.html", {proffys, subjects, filters, weekdays})

    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(req, res) {
    return res.render("give-classes.html", {subjects, weekdays}) // no endereço give-classes ele vai mostrar o give-classes.html
}

async function saveClasses(req, res) {
    const createProffy = require("./database/createProffy")
    
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost,
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValues})

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]
        return res.redirect("/study" + queryString)
    }
    catch (error) {
        console.log(error)
    }

    //Object.keys tranforma em um array e guarda o tamanho desse array
    //const isNotEmpty = Object.keys(data).length > 0 //guardo na variável um boolean

    //if (isNotEmpty){
        //data.subject = getSubject(data.subject) // usa a função pra poder pegar o nome da matéria pelo id
        //proffys.push(data) //add à lista de proffys (append)
        //return res.redirect("/study")
    //}
}

module.exports = {pageLanding, pageStudy, pageGiveClasses, saveClasses}