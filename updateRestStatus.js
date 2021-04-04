
// This file updates the status of the restaurants
// ------------------------------------------------------------
var updateRestStatus = (knex) => {
    let _ = require('lodash');

    let now = new Date

    // Day of the week
    let today = now.getDay()

    // local time
    let auxTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    let seconds = ((now.getHours() * 60 * 60) + (now.getMinutes() * 60))

    // Get all
    knex('horario').where('horario_semana', today).where('horario_inicio', '<=', auxTime).where('horario_fim', '>', auxTime).then((times) => {
        let insideRange = []
        
        // add to range the times
        times.forEach(time => {
            let timeStart = time.horario_inicio.split(':')
            let secondsStart = ((parseInt(timeStart[0]) * 60 * 60) + (parseInt(timeStart[1]) * 60))

            let timeEnd = time.horario_fim.split(':')
            let secondsEnd = ((parseInt(timeEnd[0]) * 60 * 60) + (parseInt(timeEnd[1]) * 60))

            if (seconds >= secondsStart && seconds <= secondsEnd ) {
                insideRange.push(time.horario_restaurante)
            }
        });

        // removes the duplicates
        insideRange = _.uniq(insideRange)

        // update the status of the restaurants
        if (insideRange.length > 0) {
            knex.raw(`update restaurante set restaurante_aberto = CASE when restaurante_id in (${insideRange}) then 1 else 0 end`).then((e) => {
                !e ? console.log('Erro ao atualizar o status do restaurante') : console.log('Status atualizado com sucesso')
            })
        } else {
            knex.raw(`update restaurante set restaurante_aberto = 0`).then((e) => {
                !e ? console.log('Erro ao atualizar o status do restaurante') : console.log('Status atualizado com sucesso')
            })
        }

        
    })
}
module.exports = updateRestStatus