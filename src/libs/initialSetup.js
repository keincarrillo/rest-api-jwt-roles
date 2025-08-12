import Role from '../models/Role'

export const createRoles = async () => {
  try {
    const count = await Role.count() // Cuenta el numero de roles
    if (count > 0) return // Si hay roles no hace nada
    await Promise.all([
      Role.create({ name: 'user' }),
      Role.create({ name: 'admin' }),
      Role.create({ name: 'moderator' })
    ])
  } catch (error) {
    console.error(error)
  }
}
