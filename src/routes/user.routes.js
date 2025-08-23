import { Router } from 'express'
import {
  createUser,
  getUsers,
  deleteUser
} from '../controllers/user.controller.js'
import { isAdmin, verifyToken } from '../middlewares/authJwt.js'
import { checkEmail } from '../middlewares/verifySignup.js'

const router = Router()

router.get('/', getUsers)

router.post('/', [checkEmail, verifyToken, isAdmin], createUser)

router.delete('/:userId', [verifyToken, isAdmin], deleteUser)

export default router
