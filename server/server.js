const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../database/index.js');
const passport = require('./config/passport.js');
const session = require('express-session');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));









// // initialize passposrt and and session for persistent login sessions
app.use(session({
    secret: "tHiSiSasEcRetStr",
    resave: true,
    saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
 
 
// // route middleware to ensure user is logged in, if it's not send 401 status
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated())
//         return next();
 
//     res.sendStatus(401);
// }
 
// // home page
// // app.get("/", function (req, res) {
// //     res.send("Hello!");
// // });
 
// // login page
// app.get("/login", function (req, res) {
//     res.send("<a href='/auth/facebook'>login through facebook</a>");
// });
 
 
// // send to facebook to do the authentication
app.get("/auth/facebook", 
	passport.authenticate("facebook", { scope : "email" }),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // Then you can send your json as response.
    res.send("success");
  }
	);

// // handle the callback after facebook has authenticated the user
app.get("/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect : "/",
        failureRedirect : "/login"
		}),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // Then you can send your json as response.
    res.send("success");
  }
);
 
 
// // content page, it calls the isLoggedIn function defined above first
// // if the user is logged in, then proceed to the request handler function,
// // else the isLoggedIn will send 401 status instead
// app.get("/trips", isLoggedIn, function (req, res) {
//     // alert("Congratulations! you've successfully logged in.");
//       res.sendFile(path.join(__dirname, '/../client/dist/index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// });
 
// // logout request handler, passport attaches a logout() function to the req object,
// // and we call this to logout the user, same as destroying the data in the session.
// app.get("/logout", function(req, res) {
//     req.logout();
//     res.send("logout success!");
// });










//TRIPS

app.delete('/api/trips/delete', function(req,res) {
	db.one(`DELETE FROM trips WHERE id = ${req.body.trip_id} RETURNING (id)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.post('/api/trips/add', function(req,res) {
	db.one(`INSERT INTO trips (trip, start_date, end_date) VALUES ('${req.body.trip}', '${req.body.start_date}', '${req.body.end_date}') RETURNING (id, trip, end_date, start_date)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.get('/api/trips', (req,res) => {
	db.many("SELECT * FROM public.trips")
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

//PACK

app.get('/api/pack/shared/:trip_id', (req,res) => {
	db.many(`SELECT s.id, s.item, s.claimed_by FROM public.shared_items s JOIN public.trips t ON s.trip_id = t.id WHERE t.id = ${req.params.trip_id}`)
		.then(result => {
			console.log(result)
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.get('/api/pack/favor/:trip_id', (req,res) => {
	db.many(`SELECT s.id, s.item, s.claimed_by, s.added_by FROM public.favor_items s JOIN public.trips t ON s.trip_id = t.id WHERE t.id = '${req.params.trip_id}'`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.get('/api/pack/personal/:trip_id', (req,res) => {
	db.many(`SELECT s.id, s.item, s.trip_id FROM public.personal_items s JOIN public.trips t ON s.trip_id = t.id WHERE t.id = '${req.params.trip_id}'`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.post('/api/pack/add/:type', function(req,res) {
	req.params.type === 'personal_items' ?
	db.one(`INSERT INTO ${req.params.type} (trip_id, item) VALUES (${req.body.trip_id}, '${req.body.item}') RETURNING (item, id)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
	:
	db.one(`INSERT INTO ${req.params.type} (trip_id, item, added_by) VALUES (${req.body.trip_id}, '${req.body.item}', '${req.body.added_by}') RETURNING (item, id)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.delete('/api/pack/delete/:type', function(req,res) {
	db.one(`DELETE FROM ${req.params.type} WHERE id = ${req.body.item_id} AND trip_id = ${req.body.trip_id} RETURNING (id)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.patch('/api/pack/claim/:type', function(req,res) {
	db.one(`UPDATE ${req.params.type} SET claimed_by='${req.body.claimed_by}' WHERE id=${req.body.id} AND trip_id=${req.body.trip_id} RETURNING (id, claimed_by)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.patch('/api/pack/unclaim/:type', function(req,res) {
	db.one(`UPDATE ${req.params.type} SET claimed_by=NULL WHERE id=${req.body.id} AND trip_id=${req.body.trip_id} RETURNING (id, claimed_by)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.get('/sw.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/../sw.js'));
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

module.exports = app;
