import User from '../models/User.js'
import Role from '../models/Role.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
    const foundRol = await Role.findOne({
      where: {
        name: roles
      }
    })

    if (!foundRol) {
      const defaultRole = await Role.findOne({ where: { name: 'user' } })
      await newUser.setRoles(defaultRole)
    } else {
      console.log(foundRol)
      await newUser.setRoles(foundRol)
    }

    // Enviar respuesta con token(funciona para poder validar que el usuario esta logueado)
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 horas en segundos
    })

    res
      .status(201)
      .json({ message: `Usuario creado con exito, email: ${email}`, token })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}
