const LANDING_HTML = `
<!DOCTYPE html><html>
<head>
  <title>mark</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Bootstrap 5 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <style>
    html, body {
      height: 100%;
    }
    body {
      display: -webkit-box;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      vertical-align: center;
      flex-wrap: wrap;
      align-content: center;

      background-color: #eee;
      overflow: hidden;
    }
    .card {
      width: 700px;
    }
  </style>
</head>
<body>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  
  <div class="card">
    <h5 class="card-header">mark</h5>
    <div class="card-body">
      <p class="card-text">Coming soon...</p>
    </div>
  </div>
</body>
</html>
`

export const landingPage = async (): Promise<Response> => {
  return new Response(LANDING_HTML, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  })
}
