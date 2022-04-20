// This gets bound to the KV namespace
declare const MARKS: KVNamespace

const handleRequest = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);
  // Get a link from KV
  const key = url.pathname.split('/')[1];
  const link = await MARKS.get(key);

  // Give a 404 if the link doesn't exist
  if (link == null) return new Response("No link with this key.", { status: 404 });

  return Response.redirect(link, 301)
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
