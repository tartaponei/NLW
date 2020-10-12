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

function convertHoursToMinutes(time) {
    //ponho o primeiro em hour e o segundo em minute
    const [hour, minutes] = time.split(":")
    return Number((hour * 60) + minutes)
}

module.exports = {subjects, weekdays, getSubject, convertHoursToMinutes}