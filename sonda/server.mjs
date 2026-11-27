import http from 'http';
const server = http.createServer((req, res) => 
    { res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('Ahoj svete!'); }); server.listen(3000);