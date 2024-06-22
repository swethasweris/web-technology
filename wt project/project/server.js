const http = require('http');
const fs = require('fs');
const url = require('url');
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');
let db, studentsCollection, teachersCollection;

client.connect().then(() => {
  db = client.db('markmanagement');
  studentsCollection = db.collection('students');
  teachersCollection = db.collection('teachers');
});

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (pathname === '/register' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const data = new URLSearchParams(body);
      const student = {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password')
      };
      await studentsCollection.insertOne(student);
      res.writeHead(302, { 'Location': '/login.html' });
      res.end();
    });
  } else if (pathname === '/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const data = new URLSearchParams(body);
      const email = data.get('email');
      const password = data.get('password');
      const student = await studentsCollection.findOne({ email, password });
      if (student) {
        // Redirect to success page with status 302 (Found)
        res.writeHead(302, { 'Location': '/subject.html' });
        res.end();
      } else {
        // Redirect to login page with error message and status 302 (Found)
        res.writeHead(302, { 'Location': '/login.html?error=Invalid Credentials' });
        res.end();
      }
    });
  }
   else if (pathname === '/submitMarks' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const data = new URLSearchParams(body);
      const marks = {
        name: data.get('name'),
        roll: data.get('roll'),
        sub: data.get('sub'),
        experimentno: data.get('experiment'),
        amarks: data.get('amarks'),
        cmarks: data.get('cmarks'),
        vmarks: data.get('vmarks'),
        tmarks: data.get('tmarks'),
        experimentno2: data.get('experiment2'),
        amarks2: data.get('amarks2'),
        cmarks2: data.get('cmarks2'),
        vmarks2: data.get('vmarks2'),
        tmarks2: data.get('tmarks2'),
        experimentno3: data.get('experiment3'),
        amarks3: data.get('amarks3'),
        cmarks3: data.get('cmarks3'),
        vmarks3: data.get('vmarks3'),
        tmarks3: data.get('tmarks3'),
        experimentno4: data.get('experiment4'),
        amarks4: data.get('amarks4'),
        cmarks4: data.get('cmarks4'),
        vmarks4: data.get('vmarks4'),
        tmarks4: data.get('tmarks4'),
        experimentno5: data.get('experiment5'),
        amarks5: data.get('amarks5'),
        cmarks5: data.get('cmarks5'),
        vmarks5: data.get('vmarks5'),
        tmarks5: data.get('tmarks5')
      };
      await teachersCollection.insertOne(marks);
      res.writeHead(302, { 'Location': '/form.html?success=Marks Submitted' });
      res.end();
    });
  } else if (pathname === '/viewMarks' && req.method === 'GET') {
    try {
      const cursor = teachersCollection.find({});
      const marks = await cursor.toArray();

      // Generate HTML table dynamically based on retrieved documents
      let tableHtml = `
        <html>
          <head>
            <title>Marks Details</title>
            <style>
              table {
                font-family: Arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
              }
              th, td {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
              }
              th {
                background-color: #f2f2f2;
              }
            </style>
          </head>
          <body>
            <h2>Marks Details</h2>
            <table>
              <tr>
                <th>Name</th>
                <th>Roll</th>
                <th>Experiment 1</th>
                <th>Experiment 2</th>
                <th>Experiment 3</th>
                <th>Experiment 4</th>
                <th>Experiment 5</th>
              </tr>
      `;

      marks.forEach(mark => {
        tableHtml += `
          <tr>
            <td>${mark.name}</td>
            <td>${mark.roll}</td>
            <td>${mark.experimentno} - A: ${mark.amarks}, C: ${mark.cmarks}, V: ${mark.vmarks}, T: ${mark.tmarks}</td>
            <td>${mark.experimentno2} - A: ${mark.amarks2}, C: ${mark.cmarks2}, V: ${mark.vmarks2}, T: ${mark.tmarks2}</td>
            <td>${mark.experimentno3} - A: ${mark.amarks3}, C: ${mark.cmarks3}, V: ${mark.vmarks3}, T: ${mark.tmarks3}</td>
            <td>${mark.experimentno4} - A: ${mark.amarks4}, C: ${mark.cmarks4}, V: ${mark.vmarks4}, T: ${mark.tmarks4}</td>
            <td>${mark.experimentno5} - A: ${mark.amarks5}, C: ${mark.cmarks5}, V: ${mark.vmarks5}, T: ${mark.tmarks5}</td>
          </tr>
        `;
      });

      tableHtml += `
            </table>
          </body>
        </html>
      `;

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(tableHtml);
      res.end();
    } catch (error) {
      console.error('Error displaying marks:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  } else if (pathname === '/updateMarks' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const data = new URLSearchParams(body);
      const roll = data.get('roll');
      const newVmarks = data.get('vmarks');
      const newAmarks=data.get('amarks');
      const newTmarks=data.get('tmarks');
      const newCmarks=data.get('cmarks');

      if (!roll) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Roll number is required');
        return;
      }

      const filter = { roll: roll };
      const updateDoc = {
        $set: { vmarks: newVmarks,tmarks:newTmarks ,cmarks:newCmarks,amarks:newAmarks}
      };

      try {
        const result = await teachersCollection.updateOne(filter, updateDoc);
        if (result.modifiedCount === 1) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Viva marks updated successfully');
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Roll number not found');
        }
      } catch (error) {
        console.error('Error updating marks:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    });
  } else if (pathname === '/deleteMarks' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const data = new URLSearchParams(body);
      const roll = data.get('roll');

      if (!roll) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Roll number is required');
        return;
      }

      const filter = { roll: roll };

      try {
        const result = await teachersCollection.deleteOne(filter);
        if (result.deletedCount === 1) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Marks deleted successfully');
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Roll number not found');
        }
      } catch (error) {
        console.error('Error deleting marks:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    });
  } else {
    let filePath = './public' + pathname;
    if (filePath === './public/') {
      filePath = './public/index.html';
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  }
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
