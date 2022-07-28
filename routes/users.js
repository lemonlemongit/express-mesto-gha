const router = require('express').Router();

const {
  // createUser,
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

// router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);
router.get('/me', getUserInfo);

module.exports = router;
