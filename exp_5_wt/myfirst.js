var http = require('http');
var url = require('url');
var querystring = require('querystring');

function onRequest(req, res) {
  var path = url.parse(req.url).pathname;
  console.log('Request for ' + path + ' received');
  
  var query = url.parse(req.url).query;
  console.log(query);
  var params = querystring.parse(query);
  var username = params["username"];
  var id = params["id"];
  var branch = params["branch"];
  var mobileNo = params["phno"];
  var gender = params["gender"];
  var branchadd = params["branchadd"];

 
  var htmlResponse = `
    <html>
    <head>
    <title>employee Details</title>
    <style>
      body
      {
        font-family: Arial, sans-serif;
        background-repeat:no-repeat;
        background-size:1700px;
        background-color:pink;
        backdrop-filter: blur(20px);
      }
      
      table {
        font-family: Arial, sans-serif;
        border-collapse: collapse;
        width: 50%;
        margin: 20px auto;
        border: 3px solid black;
      }
      td, th {
        border: 3px solid black;
        text-align: left;
        padding: 8px;
      }
      th {
        background-color: #f2f2f2;
      }

      h2{
        text-align:center;
        color:black;
        padding:40px;
      }
      
    </style>
    </head>
    <body>
    <h2>Employee Details</h2>
    <table>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>Username</td>
        <td>${username}</td>
      </tr>
      <tr>
        <td>ID</td>
        <td>${id}</td>
      </tr>
      <tr>
        <td>Branch</td>
        <td>${branch}</td>
      </tr>
      <tr>
        <td>Mobile No</td>
        <td>${mobileNo}</td>
      </tr>
      <tr>
        <td>gender</td>
        <td>${gender}</td>
      </tr>
      <tr>
        <td>branch address</td>
        <td>${branchadd}</td>
      </tr>
    </table>
    </body>
    </html>`;

  
  
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(htmlResponse);
  res.end();
}

http.createServer(onRequest).listen(8080);
console.log('Server is running...');
