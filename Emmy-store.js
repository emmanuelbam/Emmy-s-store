
const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const app = express();

const products = [];

axios.get('https://shop.html/products').then((response) => {
  const $ = cheerio.load(response.data);
  const productElements = $('.PRO');
  productElements.each((index, element) => {
    const product = {};
    product.id = $(element).attr('data-product-id');
    product.name = $(element).find('h5').text();
    product.description = $(element).find('.des').text();
    product.image = $(element).find('img').attr('src');
    product.price = $(element).find('h4').text();
    products.push(product);
  });
}).catch((error) => {
  console.log(error);
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

const port = 5500;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
