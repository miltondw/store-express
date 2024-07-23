const boom = require('@hapi/boom');
const {config} = require('@api/config/config')
const ac = require('@api/utils/roles/accessControl');

function checkApiKey(req,res,next){
    const apiKey=req.headers['api']
    if(apiKey===config.apiKey){
        next()
    }else{
        next(boom.unauthorized())
    }
}

function checkPermission(action, resource) {
  return (req, res, next) => {
    const role = req.user.role;
    const permission = ac.can(role)[action](resource);
    console.log(role,permission.granted,req.user)
    if (permission.granted) {
      next(); 
    } else {
      next(boom.unauthorized())
    }
  };
}


  module.exports={checkApiKey,checkPermission}