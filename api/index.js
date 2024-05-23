const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const {
  LogError,
  SequelizeErrors,
  ErrorHandler,
  BoomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
/* 
* Create cors with witheList
const witheList = ['http://localhost:3000', 'http://localhost:5000'];
const options = {
  origin: (origin, callback) => {
    if (witheList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Error Cors'));
    }
  },
};
app.use(cors(options));
*/

app.use(cors());

app.get('/',(req,res)=>{
  res.send('Esto es una api de prueba en express rutas:api/v1/ products,users,categories')
})
app.get('/api',(req,res)=>{
  res.send('Esto es una api de prueba en express')
})

routerApi(app);

app.use(LogError);
app.use(SequelizeErrors);
app.use(BoomErrorHandler);
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
