import { Router } from 'itty-router'

// This gets bound to the KV namespace
declare const MARKS: KVNamespace

const router = Router()

router.get('/:key', async (request) => {
  // Get a link from KV
  const url = new URL(request.url)
  const key = url.pathname.split('/')[1]
  const link = await MARKS.get(key)

  // Give a 404 if the link doesn't exist
  if (link == null) return new Response('No link with this key.', { status: 404 })

  return Response.redirect(link, 301)
})
// Only GETs allowed for keys
router.all('/:key', async () => new Response('Method not allowed.', { status: 405 }))

router.all('*', () => new Response('Not Found.', { status: 404 }))

addEventListener('fetch', (event) => {
  event.respondWith(router.handle(event.request, event))
})
