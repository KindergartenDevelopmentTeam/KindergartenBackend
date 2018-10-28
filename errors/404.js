module.exports = () => {
    let error = new Error('Not found')
    error.status = 404;
    return error;
}