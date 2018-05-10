const express = require('express');
const bodyParser = require('body-parser');
const anyDB = require('any-db');
const path = require('path');
const dbURL = 'sqlite3://smartlink.db';

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database Connection Pool =======
const connPool = anyDB.createPool(dbURL, {min: 0, max: 50});

/* Sections Table */
connPool.query('CREATE TABLE IF NOT EXISTS section(' +
	'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
	'section TEXT)');

/* Chapters Table */
connPool.query('CREATE TABLE IF NOT EXISTS chapter(' +
	'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
 'name TEXT,' +
 'email TEXT,' + 
 'university TEXT)');

/* User Table */
connPool.query('CREATE TABLE IF NOT EXISTS user(' +
	'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
 'username TEXT,' +
 'email TEXT,' +
 'created DATETIME,' + 
 'password TEXT,' + 
 'isAdmin BOOLEAN,' + 
 'isOrg BOOLEAN)');

/* Article Table */
connPool.query('CREATE TABLE IF NOT EXISTS article(id INTEGER PRIMARY KEY AUTOINCREMENT,' +
 'title TEXT,' + 
 'content TEXT,' + 
 'date DATETIME,' + 
 'section TEXT,' + 
 'author TEXT,' + 
 'image TEXT,' + 
 'source TEXT)');

/* Opportunities Table*/
connPool.query('CREATE TABLE IF NOT EXISTS opportunity(id INTEGER PRIMARY KEY AUTOINCREMENT,' + 
	'type TEXT,' +
	'title TEXT,' +
	'organization TEXT,' +
	'compensation TEXT,' +
	'location TEXT,' + 
	'deadline TEXT,' +
	'description TEXT,' + 
	'qualifications TEXT, ' + 
	'committment TEXT, ' +
	'howToApply TEXT, ' +
	'about TEXT,' +
	'link TEXT)'); 


/** LEARN PAGE **/

//GET ALL SECTIONS
app.get('/learn/sections', function (request, response) {
	console.log("GET ALL SECTIONS REQUEST");
	const sectionQuery = 'SELECT DISTINCT section FROM article ORDER BY section;';
	const allSections = connPool.query(sectionQuery, function(error, data) {
		if (error) {
			response.send( {success: false, data: []})
		}
		response.send({success: true, data: data.rows});
	});
});

//GET ALL ARTICLES GIVEN A SECTION
app.get('/learn/sections/:section', function (request, response) {
	console.log("GET ALL ARTICLES FOR A GIVEN SECTION");
	const sectionArticles = 'SELECT * FROM article WHERE section IS $1;';
	console.log(data)
	connPool.query(sectionArticles, [request.body.section], function (error, data) {
		console.log(data);
		if (error) {
			response.send( {success: false, data: []})
		}
		response.send({success: true, data: data.rows});
	});
});

//GET ARTICLE GIVEN ARTICLE ID
app.get('/learn/:articleid', function (request, response) {
	console.log("GET AN ARTICLE GIVEN AN ARTICLE ID");
	const articleQuery = 'SELECT * FROM article WHERE id = $1;';
	connPool.query(articleQuery, [request.body.articleid], function (error, data) {
		if (error) {
			response.send( {success: false, data: []})
		}
		response.send({success: true, data: data.rows});
	});
});

//POST ARTICLE FROM FORM
app.post('/learn/article', function (request, response) {
	console.log("POST ARTICLE TO DB");
	const params = request.body;
	const article = [
		null, //autoincrement id
		params.title,
		params.content,
		Date.now(),
		params.section,
		params.author,
		params.image,
		params.source,
	];
	console.log("Inserting Article: " + article  + " into the database");
	const insertArticleQuery = 'INSERT into article VALUES($1, $2, $3, $4, $5, $6, $7, $8)';
	connPool.query(insertArticleQuery, article, function(error, data) {
		if (error) {
			console.error(error);
			response.send({success: false});
		}  else {
		console.log("Article succesfully inserted");
		response.send({success: true});
			
		}
	});
});





/* 

Connect Page


*/

app.post('/opportunities', function(request, response) {
	const params = request.body;
	const opportunity = [null, //id (AUTOINCREMENT)
	params.type,
	params.title,
	params.organization,
	params.compensation, 
	params.location,
	params.deadline,
	params.description,
	params.qualifications,
	params.committment,
	params.howToApply,
	params.about,
	params.link,
	];

	const insertOppprtunityQuery = 'INSERT into opportunity VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';
	connPool.query(insertOppprtunityQuery, opportunity, function(error, data) {
		if (error) {
			console.error(error);
			response.send({success: false});
		} else {
			console.log("Successfully added opportunity to database.");
			response.send({success: true});
		}
	});

});


app.get('/connect', function(request, response) {
	console.log("Request recieved for all opportunities");
	const opportunitiesQuery = 'SELECT * FROM opportunity;';
	connPool.query(opportunitiesQuery, function (error, data) {
		if (error) {
			response.send({success: false, data: []});
		} 

		response.send({success: true, data: data.rows});
	});
});

//GET opportunities given an organization
app.get('/connect/:organization_name', function(request, response) {
	const params = request.body;
	const opportunitiesQuery = 'SELECT * FROM opportunity WHERE id IS $1';
	connPool.query(opportunitiesQuery, [params.organization], function (error, data) {
		if (error) {
			response.send( {success: false, data: []})
		}
		response.send({success: true, data: data.rows});
	});
});

//GET opportunity given id
app.get('/connect/opportunities/:id', function (request, response) {
	console.log("GET AN OPPORTUNITY GIVEN AN ID");
	const params = request.body;
	const opportunityQuery = 'SELECT * FROM opportunity WHERE id IS $1';

	connPool.query(opportunityQuery, [params.id], function (request, response) {
		if (error) {
			response.send( {success: false, data: []});
		}

		response.send({success: true, data: data.rows});
	});
});


// --- LISTEN ON PORT 9999 --- //
console.log("Listening on port 9999");
app.listen(9999);