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

/*
Article:
	id STRING
	isApproved BOOLEAN
	title STRING
	user_id Foreign Key : default ""
	submit_date DATE
	description STRING
	content STRING
	section Foreign Key : default ""

Opportunity:
	isApproved
	title
	organization_name
	deadline

Chapter:
	id
	name
	email
	university

User:
	id
	username
	email
	created
	isAdmin
	isOrg
*/

connPool.query('CREATE TABLE IF NOT EXISTS sections(id INTEGER PRIMARY KEY AUTOINCREMENT, section TEXT)');
connPool.query('CREATE TABLE IF NOT EXISTS chapters(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, university TEXT)');
connPool.query('CREATE TABLE IF NOT EXISTS users(id STRING, username TEXT, email TEXT, created DATETIME, password TEXT, isAdmin BOOLEAN, isOrg BOOLEAN)');
connPool.query('CREATE TABLE IF NOT EXISTS articles(id INTEGER PRIMARY KEY AUTOINCREMENT, isApproved BOOLEAN, title TEXT, content TEXT, url TEXT, submitted DATETIME, section TEXT, user_id TEXT, image_url TEXT, source TEXT)');
connPool.query('CREATE TABLE IF NOT EXISTS opportunities(id INTEGER PRIMARY KEY AUTOINCREMENT, isApproved BOOLEAN, title TEXT, organization_name TEXT, deadline DATETIME, description TEXT, qualifications TEXT, commitment TEXT, how_to_apply TEXT, about TEXT, url TEXT, position TEXT)');

//=== GET METHODS ====//

/** 

LEARN PAGE

**/

//GET ALL SECTIONS
app.get('/learn/sections', function (request, response) {
	const sectionQuery = 'SELECT DISTINCT section FROM sections';
	const allSections = connPool.query(sectionQuery, function(error, data) {
		response.send(data.rows);
	});
});

//GET ALL ARTICLES GIVEN A SECTION
app.get('/learn/sections/:section', function (request, response) {
	const sectionArticles = 'SELECT * FROM articles WHERE section IS $1';
	connPool.query(sectionArticles, [request.body.section], function (error, data) {
		response.send(data.rows);
	})
})

//GET ARTICLE GIVEN ARTICLE ID
app.get('/learn/:articleid', function (request, response) {
	const articleQuery = 'SELECT * FROM artciles WHERE id = $1';
	connPool.query(articleQuery, [request.body.articleid], function (error, data) {
		response.send(data.rows);
	})
})








//=== POST METHODS ===//




// --- LISTEN ON PORT 9999 --- //
console.log("Listening on port 9999");
app.listen(9999);