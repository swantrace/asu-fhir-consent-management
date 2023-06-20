const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '..', '.env.development.local')
});

fetch(`${process.env.KV_REST_API_URL}/get/qrs`, {
  headers: {
    Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`
  }
})
  .then((response) => response.json())
  .then((data) => console.log(data));
