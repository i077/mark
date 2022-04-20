import { Request } from "itty-router"

// This gets bound to the KV namespace
declare const MARKS: KVNamespace

export const getLink = async (request: Request): Promise<Response> => {
  // Get a link from KV
  const key = request.params?.key
  if (key == null) return new Response('No key provided.', { status: 400 })
  const link = await MARKS.get(key)

  // Give a 404 if the link doesn't exist
  if (link == null) return new Response('No link with this key.', { status: 404 })

  return Response.redirect(link, 301)
}
