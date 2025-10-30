import http from 'node:http';
import { URL } from 'node:url';

const port = Number(process.env.PORT || 3002);

const server = http.createServer((req, res) => {
  if (!req.url || !req.method) {
    res.writeHead(400, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'bad request' }));
    return;
  }

  const url = new URL(req.url, `http://localhost:${port}`);

  if (url.pathname === '/' && req.method === 'GET') {
    res.writeHead(302, { 'Location': '/home' });
    res.end();
    return;
  }

  if (url.pathname === '/api/users/123' && req.method === 'GET') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ id: '123', email: 'user123@example.com', name: 'Test User' }));
    return;
  }

  if (url.pathname === '/login' && req.method === 'GET') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(`<!doctype html>
      <html><body>
        <form>
          <input data-testid="email" />
          <input data-testid="password" type="password" />
          <button data-testid="login">Login</button>
        </form>
        <script>
          document.querySelector('[data-testid="login"]').addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/home';
          });
        </script>
      </body></html>`);
    return;
  }

  if (url.pathname === '/home' && req.method === 'GET') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(`<!doctype html><html><body><div data-testid="welcome">Welcome</div></body></html>`);
    return;
  }

  if (url.pathname === '/users/123' && req.method === 'GET') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(`<!doctype html><html><body><div data-testid="profile-header">Profile 123</div></body></html>`);
    return;
  }

  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(port, () => {
  console.log(`Mock server listening on http://localhost:${port}`);
});


