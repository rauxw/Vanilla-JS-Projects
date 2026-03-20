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
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let totalCost = JSON.parse(localStorage.getItem("totalCost")) || getTotalCost();

cart = cart.reduce((acc, item) => {
  const existing = acc.find((i) => i.id === item.id);

  if (existing) {
    existing.quantity += item.quantity || 1;
  } else {
    acc.push({
      ...item,
      quantity: item.quantity || 1,
    });
  }

  return acc;
}, []);

const cardPageBtn = document.getElementById("cart-header-btn");

const cartCount = document.getElementById("card-count");

const content = document.querySelector(".content");

function saveData() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("totalCost", JSON.stringify(totalCost));
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
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
        existingItem.quantity += 1;
      } else {
        cart.push({ ...getProduct, quantity: 1 });
      }

      totalCost += getProduct.price;
      saveData();
      updateCartCount();
    });
  });
}
function getTotalCost() {
  return cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

cardPageBtn.addEventListener("click", () => {
  const cartPagePath = "./Cartpage/Cartpage.html";
  window.location.href = cartPagePath;
});

function main() {
  renderCards();
  addEventListeners();
  updateCartCount();
}

main();
