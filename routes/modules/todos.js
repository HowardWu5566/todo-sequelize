const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/', (req, res) => {
  const UserId = req.user.id
  const name = req.body.name
  return Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { UserId, id } })
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(err => console.log(err))
})
router.put('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findOne({ where: { UserId, id } })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => {
      req.flash('success_msg', '修改成功')
      res.redirect(`/todos/${id}`)
    })
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { UserId, id } })
    .then(todo => todo.destroy())
    .then(() => {
      req.flash('success_msg', '已刪除')
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { UserId, id } })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

module.exports = router