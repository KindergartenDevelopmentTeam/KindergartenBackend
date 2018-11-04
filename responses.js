module.exports = {
    notFound: () => {
        let error = new Error('Not found')
        error.code = 404;
        return error;
    },
    success: (message) => ({
            code: 200,
            message: message || 'Success!'
    })
}