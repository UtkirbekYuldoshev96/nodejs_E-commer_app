const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
      const pathName = req.url;

      if (pathName === '/' || pathName === '/overview') {
            res.end('This is the overview');
      } else if (pathName === '/product') {
            res.end('This is the Products');
      } else if (pathName === '/api') {
            fs.readFile(`${__dirname}/Data/data.json`, 'utf-8', (err, data) => {
                  const productData = JSON.parse(data);
                  res.writeHead(200, {'Content-type': 'application/json'});
                  res.end(data);
                  // console.log(productData);
            });

            
            // res.end('This is the Api');
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