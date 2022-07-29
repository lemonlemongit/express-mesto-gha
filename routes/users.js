const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexp } = require('../regexp');

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

router.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  }),
  getUserById,
);

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
);

router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(regexp),
    }),
  }),
  updateAvatar,
);

router.get('/user/me', getUserInfo);

module.exports = router;
