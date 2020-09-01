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
      host : '127.0.0.1',
      user : 'postgres',
      password : '123cuoicai',
      database : 'smart-brain'
    }
});

app.get ('/', (req, res) => res.send(database.users));
app.post('/signin', (req, res) => { signin.handleRegister(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get ('/profile:id', (req, res) => { register.handleGetProfile(req, res, db) });
app.put ('/image', (req, res) => { image.handleImage(req, res, db) } );

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