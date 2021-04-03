import { nanoid } from 'nanoid'

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
  const id = nanoid()
  notes.push({ id, ...n })
  return getById(id)
}

export const remove = (id) => {
  notes = notes.filter((n) => n.id !== id)
  return notes
}

export const update = (id, n) => {
  let dbNote = getById(id)
  if (dbNote) {
    dbNote = { ...dbNote, ...n }
    remove(id)
    add(dbNote)
    return dbNote
  }
  return null
}
