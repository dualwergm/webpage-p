function buildMsg(jData){
    return `Nombre: ${jData.name}
    E-Mail: ${jData.email}
    Tel: ${jData.phone}
    Desc: ${jData.comment}`;
}

module.exports = buildMsg;