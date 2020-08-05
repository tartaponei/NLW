//meudeus pq javascript tem que ter os comandos tão grandes?
//sdds jquery
function cloneField() {
    //copia o node de classe schedule-item (o true é pra pegar todos os nodes dentro tbm):
    const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true) //const = constante

    //pega todos os inputs (time-from e time-to) de newFieldContainer e salva numa lista
    const fields = newFieldContainer.querySelectorAll("input")
    console.log(fields)

    // for i in fields: fields[i] = ""
    // pelo oq eu entendi tem que ser uma função no forEach()
    fields.forEach(function(field) {
        field.value = ""
    })

    //coloca o newFieldContainer no item de id schedule-items:
    document.querySelector("#schedule-items").appendChild(newFieldContainer)
}

// quando o item de id add-time for submetido ao evento click, a função cloneField é chamada:
document.querySelector("#add-time").addEventListener("click", cloneField)