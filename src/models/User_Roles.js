import Role from './Role.js'
import User from './User.js'

// Establece la relacion de muchos a muchos, 'user_roles' sera el nombre de la tabla intermedia
Role.belongsToMany(User, { through: 'user_roles' })
User.belongsToMany(Role, { through: 'user_roles' })

export { Role, User }
