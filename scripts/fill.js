const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '..', '.env.development.local')
});
const data = require('./responses.json');

fetch(`${process.env.KV_REST_API_URL}/set/qrs`, {
  headers: {
    Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`
  },
  body: JSON.stringify(data),
  method: 'POST'
})
  .then((response) => response.json())
  .then((data) => console.log(data));
