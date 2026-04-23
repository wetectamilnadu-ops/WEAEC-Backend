const http = require('http');

const data = JSON.stringify({
  name: 'Test User',
  email: 'test@example.com',
  phone: '1234567890',
  service: 'Web Development',
  plan: 'Basic',
  message: 'This is a test message.'
});

const options = {
  hostname: 'https://weaec-backend.onrender.com',
  port: 5000,
  path: '/api/inquiry',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
