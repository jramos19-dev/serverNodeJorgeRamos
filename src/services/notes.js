import joi from 'joi'

import logger from '../helpers/logger'

import db from '../helpers/db'

const noteSchema = joi.object({
  title: joi.string().required().min(3).max(20),
  content: joi.string().required().min(5).max(30),
})

export const getAll = async () => {
  const notes = await db('notes')
  
  return notes
}

export const getById = async (id) => {
  const note = await db('notes').where({ id }).first()
  if (note) return note
  return null
}

export const add = async (n) => {
  const { error } = noteSchema.validate(n)
  if (error) {
    logger.error(error)
    return { error: error.details[0].message }
  }
  const id = await db('notes').insert({
    ...n,
    created_at: new Date().toLocaleDateString(),
    updated_at: new Date().toLocaleTimeString(),
  })
  const note = await getById(id[0])
  if (note) return note
}

export const remove = async (id) => {
  await db('notes').where({ id }).del()
  const notes = await getAll()
  return notes
}

export const update = async (id, n) => {
  const { error } = noteSchema.validate(n)
  if (error) {
    logger.error(error)
    return { error: error.details[0].message }
  }
  let note = await getById(id)
  if (note) {
    const { title, content } = n
    await db('notes')
      .where({ id })
      .update({ title, content, updated_at: new Date().toLocaleTimeString() })
      
    note = await getById(id)
    return note
  }
  return null
}
