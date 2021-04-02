import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ msg: 'Get all the notes' })
})

router.post('/', (req, res) => {
  res.json({ msg: 'Create a Note' })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  res.json({ msg: `getting note ${id}` })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  res.json({ msg: `updating note ${id}` })
})

router.delete('/', (req, res) => {
  const { id } = req.params

  res.json({ msg: `deleting note  ${id} ` })
})

export default router
