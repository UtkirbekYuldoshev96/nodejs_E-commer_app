const http = require('http');
const fs = require('fs');


const replaceTemplate = (temp, product) => {
      let output = temp.replace(/{%productName%}/g, product.productName);
      output = output.replace(/{%image%}/g, product.image);
      output = output.replace(/{%From%}/g, product.from);
      output = output.replace(/{%nutrients%}/g, product.nutrients);
      output = output.replace(/{%quantity%}/g, product.quantity);
      output = output.replace(/{%price%}/g, product.price);
      output = output.replace(/{%description%}/g, product.description);

            if(!product.organic) {
                  output = output.replace(/{%organic%}/g, 'not-organic');
            } else {
                  output = output.replace(/{%organic%}/g, 'organic');
            }

      return output;
}
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


            const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
            const output = tempOverview.replace('{%Product_Cards%}', cardsHtml);
            res.end(output);
      
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