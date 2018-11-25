module.exports = {
    notFound: () => {
        let error = new Error('Not found')
        error.code = 404;
        return error;
    },
    noPermission: () => {
        let error = new Error('You have no permission to do this!')
        error.code = 403;
        return error;
    },
    success: (message) => ({
            code: 200,
            message: message || 'Success!'
    }),
    customError: (code, message = "") => {
        let error = new Error(message)
        error.code = code
        return error
    }
}