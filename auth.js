const authenticate = require('./oauth2/components/oauth/authenticate')

function getScopes(url) {
    switch (url) {
        case 'createChildren': return 'admin'
        case 'getChild': return 'admin teacher parent'

        default: return 'admin'
    }
}

module.exports = (req, res, next) => {
    const scopes = getScopes(req.baseUrl)
    console.log(`baseUrl: ${JSON.stringify(req.url, null, 2)}`)


    authenticate({scope:'admin teacher parent'})(req, res, next)
}