import bcrypt from 'bcrypt'

const hashPassword  = async ( password:string) => {
  return await bcrypt.hash(password, 10)
}


const comparePassword = async (password:string, checkedPassword:string) => {
 return  await bcrypt.compare(password, checkedPassword);
}


export {
  hashPassword,
  comparePassword
}