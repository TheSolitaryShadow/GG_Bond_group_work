//Framework's CSS
let nav = document.querySelectorAll(".nav li");
    function activeLink() {
        nav.forEach((item) => item.classList.remove("active"));
        this.classList.add("active");
    }
    nav.forEach((item) => item.addEventListener("click", activeLink));


//Mouse's js
    let img = document.querySelector('.mouse');
    // Define the rotation angle of the small image
    let deg = 0;
    // Define the position of the small image located on the left side of the webpage.
    let imgx = 0;
    // Define the position of the small image located on the top side of the webpage.
    let imgy = 0;
    // Define the position of the x-axis for the small image
    let imgl = 0;
    // Define the position of the y-axis for the small image
    let imgt = 0;
    // Define the angle for flipping small images
    let y = 0;
    // Define a counter
    let index = 0;

    
/*可跟踪不可旋转*/
    window.addEventListener('mousemove', function(event) {

        imgx = event.clientX - img.offsetLeft - img.clientWidth / 2+ window.scrollX;
        imgy = event.clientY - img.offsetTop- img.clientHeight / 2+ window.scrollY;
        
        deg = 360 * Math.atan2(imgy,imgx) / (2 * Math.PI);
        
        index = 0;
        
        if (img.offsetLeft < event.clientX) {
            y = -180;
        } else {
            y = 0;
        }
    });

    setInterval(() => {
        img.style.transform = "rotateZ(" + deg + "deg) rotateY(" + y + "deg)";
        index++;
        
        if (index < 10) {
            imgl += imgx  / 10;
            imgt += imgy  / 10;
        }
        
        img.style.left = imgl  + "px";
        img.style.top = imgt  + "px";
    }, 10);





//News alert window's js
const openPopupButtons = document.querySelectorAll('[id^="openPopupButton"]');
const closePopupButtons = document.querySelectorAll('.close-button');

// Add event listeners to each button
openPopupButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popupId = button.getAttribute('data-popup');
        const popup = document.getElementById(popupId);
        popup.style.display = 'block';
    });
});

// Add event listeners to each close button
closePopupButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        popup.style.display = 'none';
    });
});




//Shopping' Js
let cart = [];
let products = [];
document.addEventListener('DOMContentLoaded', async () => {
  showSection('shopping');
  const response = await fetch('games.json');
  products = await response.json();
  renderProducts(products);
  document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = products.filter(product => {
      return product.name.toLowerCase().includes(searchTerm);
    });
    renderProducts(filtered);
  });
});

function renderProducts(products) {
  const container = document.getElementById('productsList');
  container.innerHTML = '';
  
  products.forEach(product => {
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'product-card';
    
    const cardContent = `
      <div>
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="description">${product.description}</p>
        <p class="price">$${product.price}</p>
        <button onclick="addToCart('${product.id}')" class="shoppingButton">Add to Cart</button>
      </div>
    `;
    
    cardWrapper.innerHTML = cardContent;
    container.appendChild(cardWrapper);
  });
}
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCartUI();
}
function updateCartUI() {
  const cartBtn = document.querySelector('.cart-btn');
  if (!cartBtn) {
    const btn = document.createElement('button');
    btn.className = 'cart-btn';
    btn.textContent = `Cart (${cart.length})`;
    btn.onclick = () => showSection('cart');
    document.querySelector('#shopping').prepend(btn);
  } else {
    cartBtn.textContent = `Cart (${cart.length})`;
  }
  const itemsContainer = document.getElementById('cartItems');
  itemsContainer.innerHTML = '';
  cart.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price}</span>
    `;
    itemsContainer.appendChild(itemEl);
  });
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('cartTotal').textContent = total;
}
function showSection(sectionId) {
  document.querySelectorAll('#productsList, #cart, #checkout, #confirmation')
    .forEach(el => el.classList.add('hidden'));
  
  switch(sectionId) {
    case 'shopping':
      document.getElementById('productsList').classList.remove('hidden');
      document.querySelector('.search-container').style.display = 'block';
      break;
    case 'cart':
      document.getElementById('cart').classList.remove('hidden');
      document.querySelector('.search-container').style.display = 'none';
      break;
    case 'checkout':
      document.getElementById('checkout').classList.remove('hidden');
      break;
    case 'confirmation':
      document.getElementById('confirmation').classList.remove('hidden');
      break;
  }
}
document.getElementById('paymentForm').addEventListener('submit', function(e) {
  e.preventDefault();
  if (this.checkValidity()) {
    const formData = new FormData(this);
    document.getElementById('confirmName').textContent = formData.get('fullname');
    document.getElementById('confirmAddress').textContent = formData.get('address');
    document.getElementById('itemCount').textContent = cart.length;
    document.getElementById('orderTotal').textContent = cart.reduce((sum, item) => sum + item.price, 0);
    showSection('confirmation');
  }
});

function handleBackToShopping() {
  showSection('shopping');
  cart = [];
  updateCartUI();
}




//The button back to the top's js
function scrollToTop() {
  window.scrollTo({
  top: 0, 
  behavior: 'smooth' // Smooth scrolling
  });
}


//User survey's js
const openVueButton = document.getElementById('openVueButton');
const closeVueButton = document.getElementById('closeVueButton');
const vuebutton = document.getElementById('Vue');

// open the window
openVueButton.addEventListener('click', () => {
    vuebutton.style.display = 'block';
});

// close the window
closeVueButton.addEventListener('click', () => {
    vuebutton.style.display = 'none';
});