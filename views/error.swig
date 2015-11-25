<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Error page</title>
</head>
<body>
  <h1>{{ message }}</h1>
  <h2>{{ error.status }}</h2>
  <pre>{{ error.stack }}</pre>
</body>
</html>
