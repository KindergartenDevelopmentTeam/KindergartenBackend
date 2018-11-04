'use strict';

require('dotenv').config()

const fs = require('fs')
const path = require('path')
const http = require('http')

const app = require('connect')()
const swaggerTools = require('swagger-tools')
const jsyaml = require('js-yaml')
const serverPort = process.env.PORT

const writer = require('./utils/writer')

// swaggerRouter configuration
const options = {
    swaggerUi: path.join(__dirname, '/swagger.json'),
    controllers: path.join(__dirname, './controllers')
    //useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
}

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8')
const swaggerDoc = jsyaml.safeLoad(spec)

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

    app.use((req, res, next) => {
        console.log(`query is: ${JSON.stringify(req.query, null, 2)}`)
        next()
    })

    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata())

    // Validate Swagger requests
    app.use(middleware.swaggerValidator())

    app.use('/generatePassword', (req, res, next) => {
        const bcrypt = require('bcrypt')
        bcrypt.hash('parent', 10, function(err, hash) {
            if (err) return next(err)
            res.end(hash)
        });
    })

    // authentication
    app.use(require('./auth'))

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options))

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi())

    app.use((error, req, res, next) => {
        if (isNaN(error.code)) {
            error.code = 500
        }

        if (error.code === 500)
            console.error(error)

        writer.writeJson(res)({
            code: error.code,
            message: error.message
        }, error.code)
    })

    // Start the server
    http.createServer(app).listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });

});
