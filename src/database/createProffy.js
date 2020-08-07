//pego os parâmetros que o test me mandou quando chamei esse arquivo 
//o await não funciona dentro de função se não tiver o async antes
module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) { // é como se esses objetos fossem classes com seus atributos
    //await é tipo um substituto do then -> ele espera a execução da linha acabar
    //melhor que fazer trilhões de funções uma atrelada na outra
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    //pega o id do proffy inserido na variável anterior
    const proffy_id = insertedProffy.lastID

    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)

    const class_id = insertedClass.lastID

    //podem ser várias aulas, preciso de um for (map é um tipo de for)
    //o map pega o retorno e insere num array -> um db.run() pra cada item do array
    const insertedAllClassScheduleValues = classScheduleValues.map((value) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${value.weekday}",
                "${value.time_from}",
                "${value.time_to}"
            );
        `)
    })

    //roda cada item do array gerado no map e espera a execução acabar pra começar a próxima
    await Promise.all(insertedAllClassScheduleValues)
}