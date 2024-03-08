'use strict'

import { Router } from 'express'
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'
import { deleteU, get, getA, getZ, save, search, update } from './book.controller.js'

const api = Router()

api.post('/save', [validateJwt, isAdmin], save)
api.put('/update/:id', [validateJwt, isAdmin],update)
api.delete('/delete/:id', [validateJwt, isAdmin], deleteU)

api.get('/get', get)
api.get('/getZ', getZ)
api.get('/getA', getA)
api.post('/search', search)

export default api