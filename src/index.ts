import { Router } from 'itty-router'
import { getLink } from './handlers/getLink'
import { landingPage } from './handlers/landingPage'

const router = Router()

// Landing page
router.get('/', landingPage)

router.get('/:key', getLink)
// Only GETs allowed for keys
router.all('/:key', async () => new Response('Method not allowed.', { status: 405 }))

// 404 for uhhhhhh everything else
router.all('*', () => new Response('Not found.', { status: 404 }))

addEventListener('fetch', (event) => {
  event.respondWith(router.handle(event.request, event))
})
