const menuData = [
  { id: 1, name: 'Pizza', price: 12.99, desc: 'Cheesy pepperoni pizza with thin crust.', icon: '🍕' },
  { id: 2, name: 'Burger', price: 8.50, desc: 'Juicy beef patty with fresh lettuce and cheese.', icon: '🍔' },
  { id: 3, name: 'Hot Dog', price: 5.00, desc: 'Classic grilled hot dog with mustard and ketchup.', icon: '🌭' },
  { id: 4, name: 'Sarma', price: 7.20, desc: 'Traditional middle eastern sarma with spicy filling.', icon: '🌯' },
  { id: 5, name: 'Ramen', price: 10.00, desc: 'Hot Japanese ramen with boiled egg and noodles.', icon: '🍜' },
  { id: 6, name: 'Nuggets', price: 6.50, desc: 'Crispy golden chicken nuggets with dip.', icon: '🍗' },
  { id: 7, name: 'Pasta', price: 11.00, desc: 'Creamy fettuccine with mushrooms.', icon: '🍝' },
  { id: 8, name: 'Steak', price: 15.00, desc: 'Grilled ribeye steak with garlic butter.', icon: '🥩' },
  { id: 9, name: 'Sushi', price: 14.20, desc: 'Premium salmon and avocado rolls.', icon: '🍣' }
];

let cart = [];

function renderMenu() {
  const foodContainer = document.getElementById('food-grid');
  // ছবির মতো লেআউট: আইকন ও নাম উপরে, নিচে বামে প্রাইস এবং ডানে বাটন
  foodContainer.innerHTML = menuData.map(item => `
        <div class="bg-[#1e293b] p-6 rounded-[2.5rem] shadow-xl border border-transparent hover:border-gray-700 transition">
            <div class="flex items-start gap-4 mb-6">
                <div class="text-4xl bg-[#0f172a] p-3 rounded-2xl">${item.icon}</div>
                <div>
                    <h3 class="text-xl font-bold">${item.name}</h3>
                    <p class="text-[11px] text-gray-400 mt-1">${item.desc}</p>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-orange-500 font-bold text-2xl leading-none">$${item.price.toFixed(2)}</span>
                <button onclick="addToCart(${item.id})" class="bg-orange-500 hover:bg-orange-600 px-6 py-2.5 rounded-full text-xs font-bold shadow-lg shadow-orange-900/20 active:scale-95 transition">Add to cart</button>
            </div>
        </div>
    `).join('');
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('translate-x-full');
  overlay.classList.toggle('hidden');
}

function addToCart(id) {
  const selectedItem = menuData.find(food => food.id === id);
  cart.push(selectedItem);
  updateCartUI();
  if (document.getElementById('sidebar').classList.contains('translate-x-full')) toggleSidebar();
}

function updateCartUI() {
  document.getElementById('cart-count').innerText = cart.length;
  const cartList = document.getElementById('sidebar-cart-list');

  cartList.innerHTML = cart.map((item, index) => `
        <div class="flex justify-between items-center bg-[#0f172a] p-3 rounded-xl border border-gray-800">
            <span class="text-sm font-medium">${item.name}</span>
            <div class="flex items-center gap-3">
                <span class="text-orange-500 font-bold">$${item.price}</span>
                <button onclick="removeFromCart(${index})" class="text-red-500 text-xs"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');

  const total = cart.reduce((sum, current) => sum + current.price, 0);
  document.getElementById('total-price').innerText = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function openCheckout() {
  if (cart.length === 0) return alert("Your cart is empty!");
  toggleSidebar();
  document.getElementById('menu-page').classList.add('hidden');
  document.getElementById('main-header').classList.add('hidden');
  document.getElementById('checkout-page').classList.remove('hidden');
}

function closeCheckout() {
  document.getElementById('menu-page').classList.remove('hidden');
  document.getElementById('main-header').classList.remove('hidden');
  document.getElementById('checkout-page').classList.add('hidden');
}

document.getElementById('final-order-form').onsubmit = (e) => {
  e.preventDefault();
  alert("Order Successful!");
  cart = [];
  updateCartUI();
  closeCheckout();
};

renderMenu();