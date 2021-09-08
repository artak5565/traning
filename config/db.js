const mongoose = require('mongoose')
const {mongoUri, port} = require('config')

module.exports = async (app) => {
  try {
      await mongoose.connect(mongoUri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
      })
      app.listen(port, () => console.log(`App has been started on port ${port}...`))
  } catch (error) {
      console.log('Server Error', error.message)
      process.exit(1)
  }
}