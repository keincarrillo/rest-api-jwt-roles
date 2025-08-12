import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import sequelize from './db/database.js'
import { createRoles } from './libs/initialSetup.js'

// Relations
import './models/User_Roles.js'

// Routes
import productsRoutes from './routes/products.routes.js'
import authRoutes from './routes/auth.routes.js'

// Database && initial setup
try {
  await sequelize.sync({ force: true })
  await createRoles()
} catch (error) {
  console.error(error)
}

const app = express()

// Settings
app.set('pkg', pkg)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  })
})

// Routes
app.use('/api/products', productsRoutes)
app.use('/api/auth', authRoutes)

export default app
