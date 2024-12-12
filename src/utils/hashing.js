import bcrypt from 'bcrypt'

const hashPassword  = async ( password) => {
  return await bcrypt.hash(password, 10)
}


const comparePassword = async (password, checkedPassword) => {
 return  await bcrypt.compare(password, checkedPassword);
}


export {
  hashPassword,
  comparePassword
}