const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const _ = require('lodash');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

function getRandomDate() {
	const month = Math.trunc(Math.random() * 10);
	const day = Math.trunc(Math.random() * 10) + 10;
	const hours = Math.trunc(Math.random() * 10);
	return new Date(2018, month, day, hours);
}

function getRandomText() {
	/// implement the function
	
	return `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aut doloremque excepturi facilis illo
  numquam sint, tenetur veniam! Dicta, iure magni molestias repellendus saepe tempore.
  Ad laborum numquam sapiente totam!`;
}

const posts = [
	{
		id: 1,
		title: 'AAAAThis is a post #' + 234,
		body: getRandomText(),
		userId: 1,
		date: getRandomDate()
	},
	{
		id: 2,
		title: 'BBBThis is a post #' + 234,
		body: getRandomText(),
		userId: 1,
		date: getRandomDate()
	},
	{
		id: 3,
		title: 'CCCThis is a post #' + 123,
		body: getRandomText(),
		userId: 2,
		date: getRandomDate()
	},
	{
		id: 4,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 1,
		date: getRandomDate()
	},
	
	{
		id: 5,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 4,
		date: getRandomDate()
	},
	{
		id: 6,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 1,
		date: getRandomDate()
	},
	{
		id: 7,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 3,
		date: getRandomDate()
	},
	{
		id: 8,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 1,
		date: getRandomDate()
	},
	{
		id: 9,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 6,
		date: getRandomDate()
	},
	{
		id: 10,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 1,
		date: getRandomDate()
	},
	{
		id: 11,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 1,
		date: getRandomDate()
	},
	{
		id: 12,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 1,
		date: getRandomDate()
	},
	{
		id: 13,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 4,
		date: getRandomDate()
	},
	{
		id: 14,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 3,
		date: getRandomDate()
	},
	{
		id: 15,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 1,
		date: getRandomDate()
	},
	{
		id: 16,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 10,
		date: getRandomDate()
	},
	{
		id: 17,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 1,
		date: getRandomDate()
	},
	{
		id: 18,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 51,
		date: getRandomDate()
	},
	
	{
		id: 19,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 14,
		date: getRandomDate()
	},
	{
		id: 20,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 12,
		date: getRandomDate()
	},
	
	{
		id: 21,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 71,
		date: getRandomDate()
	},
	{
		id: 22,
		title: 'This is a post #' + 123,
		body: getRandomText(),
		userId: 999,
		date: getRandomDate()
	},
];


app.get('/posts', (req, res, err) => {
	const itemsPerPage = 5;
	const data = [];
	const {query} = req;
	let page = parseInt(query.page) || 1;
	let sort = (query.sort || 'asc').toLowerCase();
	_posts = _.sortBy(posts, 'date');
	if (sort !== 'asc' && sort !== 'desc') {
      err(createError(400));
      return;
    }
	if (sort === 'desc') {
		_posts = _posts.reverse();
	}
	
	if (page < 1) {
		page = 1;
	}
	data.push(..._posts.slice(itemsPerPage * (page - 1), itemsPerPage * page));
	res.json(data);
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
