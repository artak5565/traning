const app = require('express')()

require('./config/server')(app)
require('./config/db')(app)

app.use('/api/v1', require('./routes'))