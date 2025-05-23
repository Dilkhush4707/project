import express from 'express'
import {CreateTask ,deleteTaskById,getAllTask, upadateTaskById} from '../controllers/taskController.js'

  export const router =express.Router();

  router.get('/',getAllTask)

  router.post('/' , CreateTask )

  router.put('/:id', upadateTaskById)

  router.delete('/:id',deleteTaskById)

