
import joi  from 'joi'


const loginValidation = joi.object().keys({
  username: joi.string().required().max(70),
  password:joi.string().required().max(100)
})

export {
  loginValidation
}