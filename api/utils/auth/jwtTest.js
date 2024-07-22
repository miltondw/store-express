const jwt=require('jsonwebtoken')

const secret="I'm a secret"
const jwtConfig = {
    expiresIn: '7d',
  };
const payload={
    sub:'1',
    role:'customer'
}

function signIn(payload,secret) {
   return jwt.sign(payload,secret,jwtConfig)
}

const token=signIn(payload,secret)
console.log('Token= '+token)

function verifyToken(token,secret) {
    return jwt.verify(token,secret)
}
const payloadToken=verifyToken(token,secret)

console.log("payloasd = "+payloadToken.role)