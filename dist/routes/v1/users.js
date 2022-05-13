"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { updateLoggedInData, deleteLoggedIn, fetchLoggedIn } from '../controllers/users'
const users_1 = require("../../controllers/users");
// import { protect, authorize } from '../controllers/auth'
const router = (0, express_1.Router)();
// router.use(protect)
// router.route('/fetchLoggedIn').get(fetchLoggedIn, fetchDoc(Model))
// router.route('/updateLoggedInData').patch(updateLoggedInData)
// router.route('/deleteLoggedIn').delete(deleteLoggedIn)
// router.use(authorize('admin'))
router.route('/').get(users_1.fetchAll).post(users_1.createDoc);
// router.route('/:id').get(fetchDoc(Model)).patch(updateDoc(Model)).delete(deleteDoc(Model))
exports.default = router;
