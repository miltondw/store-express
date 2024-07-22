require('module-alias/register');
const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');
const { checkApiKey } = require('./middlewares/auth.handler');

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
require('./utils/auth')
// require('./utils/auth/jwtTest')

app.get('/',  (req, res) => {
  res.send(
    'Esto es una api de prueba en express rutas:api/v1/ products,users,categories',
  );
});
app.get('/api', checkApiKey, (req, res) => {
  res.send('Esto es una api de prueba en express');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
