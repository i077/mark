# mark: A private shortlinking service

mark is a serverless shortlinking service powered by [CloudFlare Workers](https://workers.cloudflare.com/),
mostly for my own private use.
The name comes from vim's [marks](https://vimhelp.org/motion.txt.html#mark-motions),
which let you jump to a position in a file (and is also conveniently short for bookmark).
My motivation for making this was to have a short way of referring to links on paper without having to write the
full URL out by hand.
I also wanted a service that I was in control of, so services like bit.ly were out of the question (besides,
this was pretty fun to make).

## Usage

Sending a GET request to any path under [https://mark.imranh.org](https://mark.imranh.org)
will attempt to find a link with that path.
Try it with the key [`EGFa`](https://mark.imranh.org/EGFa)!

This is a "private" service, i.e. the intent here is that only one person is generating new links
(but obviously anyone can visit existing ones).
To create new shortlinks, send a POST request to `/new` with a JSON object containing keys:
- `url`: The URL to be shortened
- `authkey`: A password

This will output a new four-character [base62](https://en.wikipedia.org/wiki/Base62) path that can be easily written down.
This only allows for around 15 million links, but that should be plenty for one person :)

## How it works

Note that there is no frontend or GUI, this is meant to be as simple as possible.
It's pretty easy to send POST requests from the command line, and this can be easily scripted.
Below is a script I made for myself to make managing links easier:
[![asciicast](https://asciinema.org/a/k8BMSvVxKy1W62YOlNupukyrS.svg)](https://asciinema.org/a/k8BMSvVxKy1W62YOlNupukyrS)

The backend is run by CloudFlare Workers, and links are stored in
[Workers KV](https://www.cloudflare.com/products/workers-kv/), a global eventually-consistent key-value store.
`GET /:key` will redirect (HTTP 301) with the value of `key` from the KV namespace.
`POST /new` (with the correct authkey) will write a new random base62 key to that namespace
with the given link as the value.

## Development

This repo uses CloudFlare's [wrangler](https://github.com/cloudflare/wrangler) to manage development and deployment,
as well as [pnpm](https://pnpm.io/) to manage Node packages.
It also uses [itty-router](https://github.com/kwhitley/itty-router) to make this easier to write.

Since the wrangler.toml file will contain account-specific info (like account & zone IDs),
I use 1Password's [CLI](https://developer.1password.com/docs/cli/) to inject these into a [template file](./wrangler.toml.tpl).

## Future work

I'd like to add an archive function to this eventually, so webpages with different types of media can be stored
and retrieved, even if the original page becomes [unavailable](https://en.wikipedia.org/wiki/Link_rot).
