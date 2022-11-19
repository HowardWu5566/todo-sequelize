const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/', (req, res) => {
  const UserId = req.user.id
  console.log(db)
  return Todo.findAll({
    raw: true,
    nest: true,
    where: { UserId }
  })
    .then(todos => {
      return res.render('index', { todos })
    })
    .catch(err => { return res.status(422).json(err) })
})

module.exports = router