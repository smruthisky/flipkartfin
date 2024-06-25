const api_url = "https://fakestoreapi.com/products";
var product=[]

 const sizele=document.getElementById("pagesize");


const getpagesize=()=>{
    const pagesize=sizele.value;
    // console.log(pagesize)
    fetchdata();
    return pagesize;
    
}

let currpage=1;

const fetchdata = async()=> {
    try {
        skeletonloading();
        const res = await fetch(api_url);
        const data = await res.json();
        
        product=data;
        // console.log(data);
        search(data); 
      
         renderdata();
        hideSkeleton();
      
        // console.log(product);
        
        
    } catch (err) {
        console.error("Unable to fetch:", err);
    }
}


const passdetails = async(productId)=> {
    console.log("Product ID:", productId);
 
    const title = document.getElementById(`title${productId}`).textContent;
    const image = document.getElementById(`image${productId}`).src;
    const price = document.getElementById(`price${productId}`).textContent.replace('₹', '');

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();
        console.log(product);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        const category = product?.category??"no category data";
        const description = product?.description??"no  descrption data";
        const rating=product?.rating?.rate??"no rate data";
        const count=product?.rating?.count??"no count data";
    
            const productDetails = {
                id: productId,
                title: title,
                price: price,
                image: image,
                rating: rating,
                count: count,
                category: category,
                description: description
            };

            localStorage.setItem('selectedProduct', JSON.stringify(productDetails));
            window.location.href = 'items.html';
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
}

const search= async(data) => {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keyup', (e) => {
        const searchstring = e.target.value.trim().toLowerCase(); // Trim whitespace and convert to lowercase
        const filteredData = data.filter(product => {
            return product.title && product.title.toLowerCase().includes(searchstring);
        });
        console.log(filteredData);
        displayproducts(filteredData);
    });
}
const skeletonloading=()=>{
    const skeletondata= document.querySelector('.skeleton-loading')
    for(let i=0;i<5;i++){   
    const t=
       
        `
        <div class="flex mb-6   animate-pulse">
        <div class="card shadow-lg ml-5 mb-2 w-56 h-80 pr-3">
            
            <div class="gallery ml-9 mt-4">
                <div class="skeleton-image bg-gray-200 h-40 w-40"></div>
            </div>
            <div class="details w-56 pt-10 pl-4 flex bg-white">
                <div class="flex-col ml-4 ">
                <div class="skeleton-text bg-gray-200 h-4 w-24 mb-2"></div>
    
                    <div class="skeleton-text bg-gray-200 h-4 w-36 mb-2"></div>
                    <div class="flex mt-4 ">
                        <div class="skeleton-text bg-gray-200 h-4 w-20 mr-2"></div>
                        <div class="skeleton-text bg-gray-200 h-4 w-10"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>` 
    skeletondata.innerHTML+=t;
}
    

}
const hideSkeleton = () => {
    const skeletonElement = document.querySelector('.skeleton-loading');
    skeletonElement.style.display = 'none'; // Hide the skeleton loading animation
}
const displayproducts = (p) => {

    const contentContainer = document.querySelector('.content');
    const nodataContainer = document.querySelector('.nodata');
    
      if (p.length > 0) {
        const template = p.map(product =>
            `
            <div class="flex mb-6  ">
                <div class="card shadow-lg ml-5 mb-2 w-56 h-80 pr-3 hidden">
                    <div class="gallery ml-9 mt-4">
                        <img id="image${product?.id??"no id present"}" class="h-40 w-40 object-contain product-image" 
                            src="${product?.image??"no image"}" 
                            onclick="passdetails('${product?.id??"no id present"}')" />
                    </div>
                    
                    <div class="details w-56 pt-10 pl-4 flex bg-white">
                        <div class="flex-col">
                            <p class="text-gray-400 ml-2 text-sm">Sponsored</p>
                            <div class="flex">
                                <p id="title${product?.id??"no id present"}" class="caption text-sm w-28 h-6 ml-2 truncate">${product?.title??"no title"}</p>
                                <img class="h-4 w-16 ml-1 mt-1 justify-end" src="fa_62673a.png" alt="">
                            </div>
                            <div class="flex mt-1">
                                <p id="price${product?.id??"no id present"}" class="price ml-2 font-semibold text-base">₹${product?.price??"no price data"}</p>
                                <p class="text-gray-400 pl-2"><s> ₹277</s></p>
                                <p class="text-green-500 text-sm pl-3 font-semibold">71% off</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`).join('');

        contentContainer.innerHTML = template; // Replace content with template
        nodataContainer.innerHTML = ''; // Clear the no data message
        const productElements = document.querySelectorAll('.card');
        productElements.forEach(element => {
            element.classList.remove('hidden');
        });
       
    } else {
        const tm = `<p class="text-lg uppercase block text-red-200 bg-red-800 ml-32 w-96 h-10 pl-10 pt-1">There is no data</p>`;
        nodataContainer.innerHTML = tm; // Show no data message
        contentContainer.innerHTML = ''; // Clear content
    }
}
fetchdata();
const prev = () => {
    if (currpage > 1) {
        currpage--;
        console.log("cuurentpage:", currpage);
        renderdata();

        // Remove opacity-50 and cursor-not-allowed classes from the Next button
        const nextButton = document.getElementById('nextbtn');
        nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        const prevbtn = document.getElementById('prevbtn');
        prevbtn.classList.add('opacity-50', 'cursor-not-allowed')
    }
}

const next=()=>{
    const totalPages = Math.ceil(product.length / getpagesize());

    console.log("totalpages:",totalPages)
    if(currpage < totalPages-1)  {
        currpage++;
        console.log("cuurentpage:",currpage);
        renderdata();
        const prevbtn = document.getElementById('prevbtn');
        prevbtn.classList.remove('opacity-50', 'cursor-not-allowed');

    }
else{    
        const nextButton = document.getElementById('nextbtn');
        nextButton.classList.add('opacity-50', 'cursor-not-allowed')
    }
    
   
}


const renderdata = async () => {
    const pageitems=getpagesize();
    const start = (currpage - 1) * pageitems;
    const end = currpage * pageitems;
    // console.log(start);
    // console.log(end);
    // console.log(product);
    const paginatedProducts = product.slice(start, end);
    displayproducts(paginatedProducts);
};
