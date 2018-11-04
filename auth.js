const authenticate = require('./oauth/components/oauth/authenticate')

function getScopes(url) {
    switch (url) {
        case 'createChildren': return 'admin'
        case 'getChild': return 'admin teacher parent'

        default: return 'admin'
    }
}

module.exports = (req, res, next) => {
    const scopes = getScopes(req.baseUrl)
    console.log(`baseUrl: ${req.baseUrl}`)

    authenticate({scope:'admin teacher parent'})(req, res, next)
}