/* eslint-disable semi */

var express = require('express')
var find = require('array-find')
var slug = require('slug')
var bodyParser = require('body-parser')
const port = 3000

var members = []

express()
  .use(express.static('static'))
  .use(bodyParser.urlencoded({extended: true}))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', discover)
  .post('/', add)
  .get('/question', form)
  .get('/:name', profile)
  .use(notFound)
  .listen(port, () => console.log(`Server started on port ${port}!`))

  function discover(req, res) {
    res.render('discover.ejs', {members: members})
  }
  
  function profile(req, res, next) {
    var name = req.params.name
    var profile= find(members, function (value) {
      return value.name === name
    })
  
    if (!profile) {
      next()
      return
    }
  
    res.render('profile.ejs', {members: profile})
  }

  function form(req, res) {
    res.render('question.ejs')
  }  

  function add(req, res) {
    var name = slug(req.body.name)
  
    members.push({
      name: req.body.name,
      question1: req.body.question1,
      question2: req.body.question2,
      question3: req.body.question3,
      question4: req.body.question4,
      question5: req.body.question5
    })
  
    res.redirect('/' + name)
  }
  
  function notFound(req, res) {
    res.status(404).render('not-found.ejs')
  }

