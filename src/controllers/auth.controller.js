import User from '../models/User.js'
import Role from '../models/Role.js'
import bcrypt from 'bcryptjs'

export const signIn = async (req, res) => {
  res.send('signin')
}

export const signUp = async (req, res) => {
  const { email, password, roles } = req.body
  try {
    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // Crear el usuario
    const newUser = await User.create({ email, password: passwordHash })
    // Asignar los roles al usuario
    if (roles) {
      const foundRoles = await Role.findAll({
        where: {
          name: roles
        }
      })
      await newUser.setRoles(foundRoles)
    } else {
      // Si no se especifica un rol, asigna el rol por defecto 'user'
      const userRole = await Role.find({ where: { name: 'user' } })
      await newUser.setRoles(userRole)
    }
    res
      .status(201)
      .json({ message: `Usuario creado con exito, email: ${email}` })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}
