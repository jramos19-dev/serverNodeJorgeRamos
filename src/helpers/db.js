import knex from 'knex'

import joi from 'joi'

import logger from './logger'

const noteSchema = joi.object({
  title: joi.string().required().min(3).max(20),
  content: joi.string().required().min(5).max(30),
})

const db = knex({
  client: process.env.DB_TYPE,
  connection: {
    filename: process.env.DB_FILE,
  },
  useNullAsDefault: true,
})

const createTables = async () => {
  const notesTableExist = await db.schema.hasTable('notes')
  if (!notesTableExist) {
    await db.schema.createTable('notes', (table) => {
      table.increments('id').primary()
      table.string('title')
      table.string('content')
      table.timestamps()
    })
  }
}

createTables()

export default db

let notes = []

const note = {
  id: 'randomid',
  title: 'note title',
  content: 'the content of the note, more characters',
}

notes.push(note)

export const getAll = () => notes

export const getById = (id) => notes.find((n) => n.id === id)

export const add = (n) => {
  const { error } = noteSchema.validate(n)
  if (error) {
    logger.error(error)
    return { error: error.details[0].message }
  }
  const id = nanoid()
  notes.push({ id, ...n })
  return getById(id)
}

export const remove = (id) => {
  notes = notes.filter((n) => n.id !== id)
  return notes
}

export const update = (id, n) => {
  const { error } = noteSchema.validate(n)
  if (error) {
    logger.error(error)
    return { error: error.details[0].message }
  }
  let dbNote = getById(id)
  if (dbNote) {
    dbNote = { ...dbNote, ...n }
    remove(id)
    add(dbNote)
    return dbNote
  }
  return null
}
