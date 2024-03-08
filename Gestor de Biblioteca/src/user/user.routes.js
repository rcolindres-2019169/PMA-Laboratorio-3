'use strict'

import { Router } from 'express'
import { register, login, update, deleteU, get, search, newPassword, registerAdmin } from './user.controller.js';
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()


api.post('/register', register)
api.post('/login', login)

api.put('/update/:id', [validateJwt],update)
api.delete('/delete/:id', [validateJwt],deleteU)
api.put('/updatePassword/:id', [validateJwt], newPassword)
api.post('/registerAdmin' , [validateJwt,isAdmin], registerAdmin)

api.get('/get', [validateJwt, isAdmin], get)
api.post('/search', [validateJwt, isAdmin], search)

export default api