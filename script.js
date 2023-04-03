
// const navbarLinks = document.querySelectorAll("#navbar li a");

// navbarLinks.forEach(function(navbarLink) {
//   navbarLink.addEventListener("click", function(event) {
//     event.preventDefault();
//     navbarLinks.forEach(function(link) {
//       link.classList.remove("active");
//     });
//     this.classList.add("active");
//   });
// });

const items = document.querySelector("#product1")

let productsData = [];

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(datas => {
        productsData = datas;
        console.log(productsData, "Products Data");

          // Generate initial product(data) grid
productsData.forEach((data) => {
  const productDiv = generateProductCard(data);
  items.appendChild(productDiv);
});
    });

function generateProductCard(data) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("PRO");
  productDiv.innerHTML = `
<img src="${data.image}" alt="${data.title}">
<div class="des">
<h5>${data.title}</h5>

<span>${data.description}</span>
<h6>${data.category}</h6>

<div class="star">
${
  data.rating.rate >= 1 && data.rating.rate < 2
    ? `<i class="fas fa-star"></i>`
    : data.rating.rate >= 2 && data.rating.rate < 3
    ? `<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
`
    : data.rating.rate >= 3 && data.rating.rate < 4
    ? `<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
`
    : data.rating.rate >= 4 && data.rating.rate < 5
    ? `<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
`
    : `<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
`
}

</div>
<h4>${data.price}</h4>
<a href="#"><i class="fa fa-shopping-cart cart"></i></a>
</div>
        `;
  return productDiv;
}


    const buttons = document.querySelectorAll('.button-value');

buttons[0].classList.add('btn-active');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((button) => {
      button.classList.remove('btn-active');
    });
    button.classList.add('btn-active');
  });
});


function filterProducts(category) {
    const filteredProducts = productsData.filter(
      (data) => data.category === category || category === "All"
    );
    items.innerHTML = "";
    filteredProducts.forEach((data) => {
      const productDiv = generateProductCard(data);
      items.appendChild(productDiv);
    });
  }

  function searchProducts(query) {
    const filteredProducts = productsData.filter(
      (data) =>
        data.title.toLowerCase().includes(query.toLowerCase()) ||
        data.category.toLowerCase().includes(query.toLowerCase())
    );
    items.innerHTML = "";
    filteredProducts.forEach((data) => {
      const productDiv = generateProductCard(data);
      items.appendChild(productDiv);
    });
  }

  document
  .querySelector("#search-container input[type='text']")
  .addEventListener("input", (event) => {
    const query = event.target.value;
    searchProducts(query);
  });

   document.querySelector(".category-btn").addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const category = event.target.textContent;
      filterProducts(category);
    }
  });
      
      