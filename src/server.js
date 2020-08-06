//=======================================================variáveis (listas - atributos?)
const proffys = [ //lista
    { //objeto
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "899746347",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject:"Química",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Daniele Evangelista",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "899746347",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject:"Química",
        cost: "20",
        weekday: [1],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Mayk Brito",
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
        whatsapp: "899746347",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject:"Química",
        cost: "20",
        weekday: [1],
        time_from: [720],
        time_to: [1220]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

//=======================================================funções:
function getSubject(subjectNum) {
    const arrayPos = +subjectNum - 1
    return subjects[arrayPos]
}

function pageLanding(req, res) {
    //return res.sendFile(__dirname + "/views/index.html") //__dirname é a pasta src
    //já coloquei lá no nunjucks a pasta que eu quero
    return res.render("index.html")
}

function pageStudy(req, res) {
    //req.query são as respostas do formulário (requerimento...)
    const filters = req.query
    return res.render("study.html", {proffys, filters, subjects, weekdays}) // no endereço study ele vai renderizar o study.html junto com a lista de proffys
}

function pageGiveClasses(req, res) {
    const data = req.query

    //Object.keys tranforma em um array e guarda o tamanho desse array
    const isNotEmpty = Object.keys(data).length > 0 //guardo na variável um boolean

    if (isNotEmpty){
        data.subject = getSubject(data.subject) // usa a função pra poder pegar o nome da matéria pelo id
        proffys.push(data) //add à lista de proffys (append)
        return res.redirect("/study")
    }

    return res.render("give-classes.html", {subjects, weekdays}) // no endereço give-classes ele vai mostrar o give-classes.html
}

//=======================================================servidor
const express = require("express")
const server = express()

//=======================================================configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})

//require espécie de import??

// /=======================================================configuração do servidor
server
//.use é pra configurar o server
.use(express.static("public")) //pega a pasta public e lê como se fosse a raiz (arquivos estáticos -> css, imagens...)
//rotas:
.get("/", pageLanding) // no endereço '/' ele vai mostrar o arquivo que tá lá na função
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
//start do server
.listen(5500)