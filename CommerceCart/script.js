const products = [
  {
    id: 1,
    name: "iPhone 13",
    price: 70000,
    image: "images/iphone.jpg",
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    price: 60000,
    image: "images/samsung.jpg",
  },
  {
    id: 3,
    name: "OnePlus 11",
    price: 55000,
    image: "images/oneplus.jpg",
  },
  {
    id: 4,
    name: "Realme Narzo",
    price: 15000,
    image: "images/realme.jpg",
  },
  {
    id: 5,
    name: "Boat Headphones",
    price: 2000,
    image: "images/boatheadpones.jpg",
  },
  {
    id: 6,
    name: "HP Laptop",
    price: 50000,
    image: "images/hplaptop.jpg",
  },
];

let totalCost = JSON.parse(localStorage.getItem("totalCost")) || 0;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("card-count");

const content = document.querySelector(".content");

function saveData() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("totalCost", JSON.stringify(totalCost));
}

function updateCartCount() {
  cartCount.textContent = cart.length;
}

function renderCards() {
  content.innerHTML = ``;

  products.forEach((product) => {
    content.innerHTML += `
      <div class="product-card">
          <img class="product-card-img" src="${product.image}" alt="${product.name} image"/>
          <div class="product-card-title">${product.name}</div>
          <div class="product-card-price">₹${product.price}</div>
          <button class="product-card-add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
  });
}

function addEventListeners() {
  const buttons = document.querySelectorAll(".product-card-add-to-cart-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const getProduct = products.find((p) => p.id === Number(id));
      const existingItem = cart.find((item) => item.id === Number(id));

      if (existingItem) {
        alert("existing item");
      }

      cart.push(getProduct);
      totalCost += getProduct.price;
      saveData();
      updateCartCount();
      console.log(cart, totalCost);
    });
  });
}

function main() {
  renderCards();
  addEventListeners();
  updateCartCount();
}

main();
