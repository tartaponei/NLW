//=======================================================servidor
const express = require("express")
const server = express()

const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require("./pages")

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
//recebe os dados do req.body
.use(express.urlencoded({extended:true}))
.use(express.static("public")) //pega a pasta public e lê como se fosse a raiz (arquivos estáticos -> css, imagens...)
//rotas:
.get("/", pageLanding) // no endereço '/' ele vai mostrar o arquivo que tá lá na função
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
//start do server
.listen(5500)