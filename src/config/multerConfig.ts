import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import { Request } from 'express'
import { Readable } from 'stream'

interface File {
  key?: string
  originalname: string
  mimetype: string
  fieldname: string
  size: number
  encoding: string
  stream: Readable
  destination: string
  filename: string
  path: string
  buffer: Buffer
}

export default {
  dest: path.resolve(__dirname, '../tmp/scripts'),
  storage: multer.diskStorage({
    destination: (_req: Request, _file: File, cb: any) => {
      cb(null, path.resolve(__dirname, '../tmp/scripts'))
    },
    filename: (_req: Request, file: File, cb: any) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err)

        const fileName = `${hash.toString('hex')}-${file.originalname}`

        cb(null, fileName)
      })
    },
  }),
  limits: {},
  fileFilter: (_req: Request, file: File, cb: any) => {
    const allowedMimes = ['text/markdown']

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type.'))
    }
  },
}
