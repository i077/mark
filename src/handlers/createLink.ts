import { Request } from 'itty-router'
import { customAlphabet } from 'nanoid'

// This gets bound to the KV namespace
declare const MARKS: KVNamespace

// base62 alphamet used to generate random keys
const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const nanoid = customAlphabet(ALPHABET, 4)

export const createLink = async (request: Request): Promise<Response> => {
  const { host } = new URL(request.url)
  const { url } = await request.json?.()
  
  // Validate URL
  if (url == null) return new Response('No URL provided.', { status: 400 })
  if (!/^https?:\/\//.test(url)) return new Response('Invalid URL.', { status: 400 })

  // Keep generating keys until we find one that doesn't exist
  let newKey: string
  do {
    newKey = nanoid()
  } while ((await MARKS.get(newKey)) !== null)
  
  // Store the link in KV
  await MARKS.put(newKey, url)

  // Respond with the new key
  return new Response(`https://${host}/${newKey}`, { status: 201 })
}
