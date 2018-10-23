module.exports = () => {
    let error = new Error('Content not found')
    error.status = 404;
    return error;
}