import User from '../models/User'
import bcrypt from 'bcryptjs'

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'email'] })
    if (users.length === 0) {
      res.status(404).json({ message: 'Not users found' })
    }
    res.json(users)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

export const createUser = async (req, res) => {
  const { email, password, role } = req.body
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const userCreated = await User.create({
      email,
      password: hashPassword
    })

    const foundRol = await Role.findOne({
      where: {
        name: role
      }
    })
    if (!foundRol) {
      const defaultRole = await Role.findOne({ where: { name: 'user' } })
      await userCreated.setRoles(defaultRole)
    } else {
      await userCreated.setRoles(foundRol)
    }
    res.status(201).json(userCreated)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

export const deleteUser = async (req, res) => {
  const { userId } = req.params
  try {
    const userDeleted = await User.destroy({ where: { id: userId } })
    if (!userDeleted) return res.status(404).json({ message: 'User not found' })
    res.sendStatus(204)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}
