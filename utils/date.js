function date() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2,0);
    const year = date.getFullYear()
    const month = (date.getMonth()+1).toString().padStart(2,0);

    return `${year}-${month}-${day}`;
}

module.exports = date;