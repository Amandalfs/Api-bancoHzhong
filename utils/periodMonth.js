const date = require('./date');

function periodMonth(){
    let dateCustom = date().replaceAll('-', '');
    let ano = dateCustom.slice(0,4);
    let mes = dateCustom.slice(4,6);
    const dia = dateCustom.slice(6,8);
    if(mes==='01'){
        mes = '12';
        ano = `${Number(ano)-1}`
    } else if(mes==='11' || mes==='12') {
        mes = `${Number(mes)-1}`;
    } else {
        mes = `0${Number(mes)-1}`;
    }
    return(`${ano}-${mes}-27`);
}

module.exports = periodMonth;