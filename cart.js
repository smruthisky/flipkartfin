const cartItems = JSON.parse(localStorage.getItem('cartItems'));

console.log(cartItems);
if (cartItems) {
    let content = ''; 
    cartItems.forEach((item, idx) => {
        content += `
        <div class="review flex">
            <div class="image w-24 h-24 mt-9 ml-8">
                <img src="${item.image}" alt="${item.title}" />
            </div>
            <div class="info mt-3 ml-10">
                <div class="flex mt-5">
                    <h1 class="text-sm w-64 font-sans uppercase">${item.title}</h1>
                    <p class="ml-14 text-sm">Delivered by Sun Mar 24 |</p>
                    <p class="text-sm ml-2 text-green-700"><s class="mr-1 text-gray-400">₹40</s>Free</p>
                </div>
                <p class="mt-1 text-gray-500 font-sans text-sm">Size:</p>
                <div class="flex">
                    <p class="mt-3 text-gray-500 font-sans text-sm">Seller:</p>
                    <img class="mt-4 ml-6 w-18 h-4" src="fa_62673a.png" alt="">
                </div>
                <div class="flex mt-5">
                    <p class="text-lg font-semibold"><s class="text-sm mr-3 text-gray-400 font-normal">₹199</s>₹${item.price}</p>
                    <p class="text-green-500 text-sm font-semibold mt-1 ml-3">65% off 2 offers applied</p>
                </div>
                <div class="flex uppercase font-semibold mt-3">
                    <p class="hover:text-blue-600">save for later</p>
                    <button class="ml-10 hover:text-blue-600" onclick="removeItem(${idx})">Remove</button>

                </div>
            </div>
        </div>
        <div class="quantity ml-8"onclick="pricedetails()">
            <button class="minus bg-gray-200 rounded-3xl w-8 h-8" onclick="decreaseQuantity${idx}">-</button>
            <span class="count ml-2 text-sm">${item.quantity}</span>
            <button class="plus  bg-gray-200 rounded-3xl w-8 h-8 ml-3" onclick="increaseQuantity${idx}">+</button>
        </div>
        `;
    });

    document.querySelector('.cart-page-content').innerHTML = content; 
}

const plusBtns = document.querySelectorAll('.plus');

const minusBtns = document.querySelectorAll('.minus');
const quantityElements = document.querySelectorAll('.count');

const increaseQuantity = (index) => {
    cartItems[index].quantity++;
    quantityElements[index].textContent = cartItems[index].quantity;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    pricedetails();
};
const decreaseQuantity = (index) => {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        quantityElements[index].textContent = cartItems[index].quantity;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        pricedetails();
    }
};

plusBtns.forEach((plusBtn, index) => {
    plusBtn.onclick = () => increaseQuantity(index);
});

minusBtns.forEach((minusBtn, index) => {
    minusBtn.onclick = () => decreaseQuantity(index);
});


const removeItem=(index) =>{
   
    cartItems.splice(index, 1);

    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    location.reload();
    pricedetails();
}

const pricedetails = ()=> {
    let totalPrice = 0;
    let totalItems = 0;

    if (cartItems) {
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
            totalItems += item.quantity;
        });
        const ordereditems={
            totalPrice : totalPrice,
            totalItems : totalItems
        }
        localStorage.setItem('order', JSON.stringify(ordereditems ));
    }

    const discount = 20; 
    const finalTotal = totalPrice- discount ;
    document.getElementById('totalItems').textContent = totalItems;
    document.getElementById('totalPrice').textContent = `₹${totalPrice.toFixed(2)}`;
    document.getElementById('discount').textContent = discount;
    document.getElementById('finalTotal').textContent = `₹${finalTotal.toFixed(2)}`;
    document.getElementById('savings').textContent = discount;
}
pricedetails();
const clearthecart=()=>{
     localStorage.clear();
     location.reload();
}