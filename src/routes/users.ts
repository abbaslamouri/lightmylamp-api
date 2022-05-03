import { Router } from 'express'

// import { updateLoggedInData, deleteLoggedIn, fetchLoggedIn } from '../controllers/users'

import { fetchAll, createDoc } from '../controllers/users'
// import { protect, authorize } from '../controllers/auth'

const router = Router()

// router.use(protect)

// router.route('/fetchLoggedIn').get(fetchLoggedIn, fetchDoc(Model))
// router.route('/updateLoggedInData').patch(updateLoggedInData)
// router.route('/deleteLoggedIn').delete(deleteLoggedIn)

// router.use(authorize('admin'))

router.route('/').get(fetchAll).post(createDoc)
// router.route('/:id').get(fetchDoc(Model)).patch(updateDoc(Model)).delete(deleteDoc(Model))

export default router
