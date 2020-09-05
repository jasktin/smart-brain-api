const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./controllers/authorization');

// Database Set-up
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send(db.users) });
app.post('/signin', signin.signinAuthentication(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db)});
app.post('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db)});
app.put('/image', auth.requireAuth, (req, res) => { image.handleImage(req, res, db)});
app.post('/imageurl', auth.requireAuth, (req, res) => { image.handleApiCall(req, res)});

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`)
})

/*

</>             res = this is working
</signin>       POST = success / fail
</register>     POST = user
</profile/:id>  GET = user:id
</image>        PUT = user:updated 

*/