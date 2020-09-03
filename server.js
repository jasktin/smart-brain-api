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

app.use(cors());
app.use(bodyParser.json());

const { Client } = require('pg');

const db = knex({
    client: 'pg',
    connection: {
      connectionString: 'postgres://laeokamcudgheu:e68af02f4740bb6dd52e5194e5a77435563b98906e832d152d71580511a6ab58@ec2-54-146-4-66.compute-1.amazonaws.com:5432/d66gnuiceile5',
      ssl: true
    }
});

app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

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