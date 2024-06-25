
// let cartItems = [];

const product = JSON.parse(localStorage.getItem('selectedProduct'));
console.log(product);
const addtocartfunc_localstorage = ()=> {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; 
    const product = JSON.parse(localStorage.getItem('selectedProduct')); 

    product.quantity = 1; 
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
        //cartItems[existingItemIndex].quantity++;
        showPopup("Item already added to the cart!");
    } else {
        cartItems.push(product);
        showPopup("Item  added to the cart!");
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    const popup = document.getElementById('popup');
    popup.classList.remove('hidden');
    setTimeout(function() {
        popup.classList.add('hidden');
    }, 3000);
}
const showPopup =(message) => {
    const popup = document.getElementById('popup');
    popup.textContent = message;
    popup.classList.remove('hidden');
    setTimeout(function() {
        popup.classList.add('hidden');
    }, 3000);
}

console.log(localStorage.cartItems);

const content=
`
<div class="left flex-col">
           <div class="view mt-10 "><img class="h-96 w-96  object-contain " src=" ${product.image}"/>
           </div> 
    <div>
        <div class="buttons flex">
            <div class="cartbutton">
            <button id="addtocart" class="ml-2 mt-8 bg-yellow-500 rounded w-40 h-10 text-white" onclick="addtocartfunc_localstorage()"  type="button">Add to cart
            <i class="fa-solid fa-cart-shopping ml-2 text-white"></i>
          </button>
          <div id="popup" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 w-64 p-4 rounded-lg text-white text-center hidden">
          <p>Item added to cart!</p>
          
      </div>
            </div>
              <button class="ml-3 mt-8 bg-orange-500 rounded w-40 h-10 text-white" type="button">  Buy now
                   <i class="fas fa-bolt ml-2 text-white "></i>
               </button>
        </div>
     </div>
</div>
       
       <div class="details  ml-[90px] flex-col mt-10 ">
           <p class="category font-medium uppercase  text-gray-400 ">${product.category}</p>
           <p class="  mt-2 text-lg font-sans  ">${product.title}</p>
           <div class="price">
            <p class="text-green-600 mt-2 font-medium font-sans">Special price</p>
              <div class="flex mt-3 ">
               <p class="rupee text-3xl font-semibold">₹${product.price} <s class="font-normal text-gray-400 text-lg ml-1">₹1999</s> </p>
               <p class="mt-3 ml-3 text-green-600 font-medium">81% off</p>
              </div>
           </div>
           <div class="ratings mt-3 flex">
               <div class=" flex bg-green-600 w-16 h-6 rounded-2xl pl-2">
                   <p class=" font-medium  ml-1  text-white">${product.rating}</p> 
                   <i class="fa-solid fa-star  ml-1 mt-1 text-white text-xs "></i>
                   
               </div>
               <span class="text-gray-400 font-medium  ml-2">${product.count} ratings </span>
               <img class="h-4 w-16 ml-3 mt-2 justify-end" src="fa_62673a.png" alt="">
               
           </div>
           <p class="text-gray-400 font-medium mt-2">Color</p>
               <p class="text-gray-400 font-medium mt-3">Size</p>
               <div class="address flex">
                   <img class="mt-4" src="images/download.svg" alt="">
                   <span class=" ml-3 mt-2 font-normal text-gray-400">Delivered to</span>
                   
               </div>
               <input class="ml-1 mt-2 font-normal underline decoration-sky-500 " type="text" placeholder="Enter delivery pincode">
           <div class="productdes mt-2 ml-1">
               <p class=" font-semibold text-lg">Product details</p>
               <p class="descontent ">${product.description}</p>
           </div>
      </div>
      
`
     
           document.querySelector('.thispage').innerHTML=content;







        //    console.log(localStorage.cartItem);

    // console.log(product);
