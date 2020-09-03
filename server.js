const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const app = express();
app.use(bodyParser.json());
app.use(cors());


const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
});

app.get ('/', res.send('It\'s working'));
app.post('/signin', signin.handleRegister(req, res, db, bcrypt));
app.post('/register', register.handleRegister(req, res, db, bcrypt));
app.get ('/profile:id', register.handleGetProfile(req, res, db));
app.put ('/image', image.handleImage(req, res, db));

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT}`)
})

/*

</>             res = this is working
</signin>       POST = success / fail
</register>     POST = user
</profile/:id>  GET = user:id
</image>        PUT = user:updated 

*/