import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).json({ message: 'No token provided' })
  }

  try {
    const { id } = await jwt.verify(token, process.env.JWT_SECRET)
    req.userId = id

    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
  next()
}

export const isModerator = async (req, res, next) => {
  // El userId ya debería estar en req.userId si el middleware verifyToken se ejecuta antes
  const { userId } = req

  const user = await User.findByPk(userId)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const roles = await user.getRoles()

  if (!roles || roles.length === 0) {
    return res.status(403).json({ message: 'No roles assigned to user' })
  }

  // Ahora puedes desestructurar de forma segura
  const [
    {
      dataValues: { name }
    }
  ] = roles

  if (name !== 'moderator') {
    return res.status(403).json({ message: 'Require moderator role' })
  }
  next()
}

export const isAdmin = async (req, res, next) => {
  const { userId } = req

  const user = await User.findByPk(userId)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const roles = await user.getRoles()

  if (!roles || roles.length === 0) {
    return res.status(403).json({ message: 'No roles assigned to user' })
  }

  const [
    {
      dataValues: { name }
    }
  ] = roles

  if (name !== 'admin') {
    return res.status(403).json({ message: 'Require admin role' })
  }
  next()
}
