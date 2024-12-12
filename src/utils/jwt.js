import jwt from 'jsonwebtoken'



 const sign = (payload) => {
  return jwt.sign(payload, "aliev_davlat",{
    expiresIn:'48h'
  })
}

const verify = (token) => jwt.verify(token ,'aliev_davlat' )


export  {
  sign,
  verify
}

