import User from '../models/User.js'
import Role from '../models/Role.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res) => {
  const { email, password, rol } = req.body
  try {
    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // Crear el usuario
    const newUser = await User.create({ email, password: passwordHash })

    // Asignar los roles al usuario
    const foundRol = await Role.findOne({
      where: {
        name: rol
      }
    })

    // Si no encuentra el rol que pasa el cliente le asigna user por defecto
    if (!foundRol) {
      const defaultRole = await Role.findOne({ where: { name: 'user' } })
      await newUser.setRoles(defaultRole)
    } else {
      await newUser.setRoles(foundRol)
    }

    // Enviar respuesta con token(funciona para darle un pase al cliente de hacer ciertas acciones)
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      // Se encripta la id del usuario, se le da una semilla, se le da un tiempo de expiracion
      expiresIn: 60 * 60 * 24 // 24 horas en segundos
    })

    res
      .status(201)
      .json({ message: `Usuario creado con exito, email: ${email}`, token }) // Se envia el token
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

export const signIn = async (req, res) => {
  res.send('signin')
}
