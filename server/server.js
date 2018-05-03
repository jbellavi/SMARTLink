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
	'section_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
	'section TEXT)');

/* Chapters Table */
connPool.query('CREATE TABLE IF NOT EXISTS chapter(' +
	'chapter_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
 'name TEXT,' +
 'email TEXT,' + 
 'university TEXT)');

/* User Table */
connPool.query('CREATE TABLE IF NOT EXISTS user(' +
	'user_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
 'username TEXT,' +
 'email TEXT,' +
 'created DATETIME,' + 
 'password TEXT,' + 
 'isAdmin BOOLEAN,' + 
 'isOrg BOOLEAN)');

/* Article Table */
connPool.query('CREATE TABLE IF NOT EXISTS article(article_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
 'isApproved BOOLEAN,' + 
 'title TEXT,' + 
 'content TEXT,' + 
 'submitted DATETIME,' + 
 'section TEXT,' + 
 'user_id TEXT,' + 
 'image_url TEXT,' + 
 'source TEXT,' +
 'FOREIGN KEY (section) REFERENCES section(section))');

/* Opportunities Table*/
connPool.query('CREATE TABLE IF NOT EXISTS opportunity(opportunity_id INTEGER PRIMARY KEY AUTOINCREMENT,' + 
	'isApproved BOOLEAN,' + 
	'about TEXT,' + 
	'commitment TEXT,' + 
	'compensation INTEGER,' +
	'description TEXT,' + 
	'location TEXT,' +
	'deadline DATETIME,' + 
	'qualifications TEXT,' + 
	'how TEXT,' + 
	'title TEXT,' + 
	'link TEXT,' +
	'user_id INTEGER,' + 
	'FOREIGN KEY(user_id) REFERENCES user(user_id))'); 


/** LEARN PAGE **/

//GET ALL SECTIONS
app.get('/learn/sections', function (request, response) {
	console.log("GET ALL SECTIONS REQUEST");
	const sectionQuery = 'SELECT DISTINCT section FROM section;';
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
	const sectionArticles = 'SELECT * FROM articles WHERE section IS $1;';
	connPool.query(sectionArticles, [request.body.section], function (error, data) {
		if (error) {
			response.send( {success: false, data: []})
		}
		response.send({success: true, data: data.rows});
	})
});

//GET ARTICLE GIVEN ARTICLE ID
app.get('/learn/:articleid', function (request, response) {
	console.log("GET AN ARTICLE GIVEN AN ARTICLE ID");
	const articleQuery = 'SELECT * FROM articles WHERE article_id = $1;';
	connPool.query(articleQuery, [request.body.articleid], function (error, data) {
		if (error) {
			response.send( {success: false, data: []})
		}
		response.send({success: true, data: data.rows});
	})
});

// LEARN PAGE POST METHODSS //

//POST ARTICLE
app.post('/learn/article', function (request, response) {
	const params = request.body;
});



/* 

Connect Page


*/

app.post('/opportunities', function(request, response) {
	const params = response.body;
	const opportunity = [null, //id (AUTOINCREMENT)
	false, //isApproved
	params.about,  
	params.commitment, 
	params.compensation, 
	params.deadline,
	params.description,
	params.location,
	params.qualifications,
	params.how,
	params.organization,
	params.title,
	params.link,
	 ];

	const insertOppprtunityQuery = 'INSERT into opportunity VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 13)';
	connPool.query(insertOppprtunityQuery, opportunity, function(error, data) {
		if (error) {
			response.send({success: false});
		}
		response.send({success: true});
	});

});


app.get('/connect', function(request, response) {
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
	console.log("GET ALL OPPORTUNITIES FOR A GIVEN ORGANIZATION")
	const params = request.body;
	const opportunitiesQuery = 'SELECT * FROM opportunity WHERE opportunity_id IS $1';
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
	const opportunityQuery = 'SELECT * FROM opportunity WHERE opportunity_id IS $1';

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