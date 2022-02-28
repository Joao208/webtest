import { Router } from 'express'
import multer from 'multer'
import multerConfig from '../config/multerConfig'
import execute from '../controller/execute'

const routes = Router()

routes.post('/', multer(multerConfig).single('file'), execute)

export default routes
