name = "mark"
type = "javascript"
account_id = "op://Private/CloudFlare/account id"
zone_id = "op://Private/CloudFlare/imranh.org zone id"
workers_dev = true
compatibility_date = "2022-04-19"
route = "op://Private/mark/route"

[[kv_namespaces]]
binding = "MARKS"
id = "op://Private/mark/kv/marks"
preview_id = "op://Private/mark/kv/marks-preview"

[build]
command = "pnpm install && pnpm run build"
[build.upload]
format = "service-worker"
