import app from './src/app.js'
import sequelize from './src/db/database.js'

const port = process.env.PORT || 3000

try {
  await sequelize.sync({ force: true })
} catch (error) {
  console.error(error)
}

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
