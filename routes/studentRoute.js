import express from 'express'
import * as studentRoute from '../controllers/studentController'


const router = express.Router()

router.post('/create', studentRoute.addStudent)
router.get('/all', studentRoute.getAllStudent)
router.get('/get/:id', studentRoute.getStudent)
router.put('/update/:id', studentRoute.updateStudent)
router.delete('/delete/:id', studentRoute.deleteStudent)

export default router