const http = require('http');
const fs = require('fs');

// SERVER
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/Data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
      const pathName = req.url;
      
      // Overview page
      if (pathName === '/' || pathName === '/overview') {
            res.writeHead(200, {'Content-type': 'text/html'});
            res.end(tempOverview);
      
      // Product page
      } else if (pathName === '/product') {
            res.writeHead(200, {'Content-type': 'text/html'});
            res.end(tempProduct);

      // API page
      } else if (pathName === '/api') {
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(data);

      // Not found
      } else {
            res.writeHead(404, {
                  'Content-type': 'text/html',
                  'my-own-header': 'hello-word'
            })
            res.end('<h1>Page not found</h1>');
      }
});

server.listen(3000, '127.0.0.1', () => {
      console.log('Server is listening on port 3000');
      console.log('To view the server, visit http://localhost:3000');
});