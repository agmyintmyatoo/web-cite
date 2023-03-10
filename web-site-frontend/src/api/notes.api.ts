import supabase from './supabase.api'
import { Note } from '../types/notes.types'

export const getNotes = async (userId: string): Promise<Note[]> => {
  const { error, data } = await supabase
    .from('notes')
    .select()
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export const createNote = async ({ userId, title, content, url }) => {
  const { error, data } = await supabase.from('notes').insert({ user_id: userId, title, content, url })
  if (error) throw error
  return data
}

export const getNote = async ({ getBy, value, signal }) => {
  const { data, error } = await supabase.from('notes').select().eq(getBy, value).abortSignal(signal).single()
  if (error) throw error
  return data
}

export const getNoteByKey = async (key: string, signal) => await getNote({ getBy: 'key', value: key, signal })

export const updateNote = async ({ key, note }) => {
  const { data, error } = await supabase
    .from('notes')
    .update({
      title: note.title,
      content: note.content,
      url: note.url,
    })
    .eq('key', key)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteNote = async (key: Number) => {
  const { error } = await supabase.from('notes').delete().eq('key', key)
  if (error) throw error
}
