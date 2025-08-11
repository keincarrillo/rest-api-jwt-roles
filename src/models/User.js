import sequelize from '../db/database.js'
import { DataTypes } from 'sequelize'
import Role from './Role.js'

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
)

// Establece la relacion de muchos a muchos
User.belongsToMany(Role, { through: 'user_roles' }) // 'user_roles' sera el nombre de la tabla intermedia

export default User
