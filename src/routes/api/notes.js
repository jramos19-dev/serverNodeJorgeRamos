import { Router } from 'express'

import * as notes from '../../helpers/db'
import logger from '../../helpers/logger'

const router = Router()

router.get('/', (req, res) => {
  res.send(notes.getAll())
})

router.post('/', (req, res) => {
  const { note: newNote } = req.body
  if (newNote) {
    const note = notes.add(newNote)
    res.send(note)
  } else {
    res.status(400).send({ msg: 'Bad Status' })
  }
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const note = notes.getById(id)

  if (note) {
    res.send(note)
  } else {
    logger.warn(`Note ${id} doesnt exist`)
    res.status(404).send({})
  }
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { note: updatedNote } = req.body
  res.json(notes.update(id, updatedNote))
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  res.send(notes.remove(id))
})

export default router
