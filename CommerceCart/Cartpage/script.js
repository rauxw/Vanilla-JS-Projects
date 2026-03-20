let cart = JSON.parse(localStorage.getItem("cart"));

const productListPageBtn = document.getElementById("product-list-page-btn");

const totalPrice = document.getElementById("total-price-el");
const content = document.querySelector(".content");

function saveData() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  content.innerHTML = ``;

  cart.forEach((product) => {
    content.innerHTML += `
      <div class="product-card">
          <button class="product-card-delete-btn" data-id="${product.id}">❌</button>
          <img class="product-card-img" src="../${product.image}" alt="" />
          <div class="product-card-name">${product.name}</div>
          <div class="product-card-btns">
            <button class="product-add-quantity-btn" data-id="${product.id}">+</button>
            <div class="product-quantity-text">${product.quantity}</div>
            <button class="product-delete-quantity-btn" data-id="${product.id}">-</button>
          </div>
          <div class="product-card-price">₹${product.price}</div>
      </div>
    `;
  });
}

function addAllEventListeners() {
  const addQuantityBtn = document.querySelectorAll(".product-add-quantity-btn");
  const deleteQuantityBtn = document.querySelectorAll(
    ".product-delete-quantity-btn"
  );
  const deleteWholeItem = document.querySelectorAll(".product-card-delete-btn");

  deleteWholeItem.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      cart = cart.filter((c) => c.id !== id);
      saveData();
      renderCart();
      renderTotalCost();
      addAllEventListeners();
    });
  });

  addQuantityBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const item = cart.find((c) => c.id === id);
      item.quantity += 1;
      saveData();
      renderCart();
      renderTotalCost();
      addAllEventListeners();
    });
  });

  deleteQuantityBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const item = cart.find((c) => c.id === id);
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart = cart.filter((p) => p.id !== id);
      }

      saveData();
      renderCart();
      renderTotalCost();
      addAllEventListeners();
    });
  });
}

function getTotalCost() {
  return cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

function renderTotalCost() {
  const totalCost = getTotalCost();
  totalPrice.textContent = "Total: ₹" + totalCost;
}

productListPageBtn.addEventListener("click", () => {
  const productListPagePath = "../index.html";
  window.location.href = productListPagePath;
});

function main() {
  renderCart();
  renderTotalCost();
  addAllEventListeners();
}

main();
