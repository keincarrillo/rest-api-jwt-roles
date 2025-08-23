import User from '../models/User.js'

export const checkEmail = async (req, res, next) => {
  const { email } = req.body
  const userFound = await User.findOne({ where: { email } })
  if (userFound)
    return res.status(400).json({ message: 'Email already in use' })
  next()
}
