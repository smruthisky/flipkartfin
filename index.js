const electronics=[
    "Audio",
    "Gaming",
    "Peripherals",
    "Electronics GST store",
    "Laptop accessories",
    "Laptop & Desktop",
    "Mobile accessories",
    "Powerbank",
    "Smart home automation",
    "Smart wearables",
    "Storage",
    "Tablets",
    "Health & personal care"
];
const fashion=[
    "Men's top wear",
    "Men's bottom wear",
    "Women ethnic",
    "Women western",
    "Men Footwear",
    "Women Footwear",
    "Watches & accessories",
    "Bags, Luggage & suitcase"
];
const flist=document.getElementById("fashionlist");
const elist=document.getElementById("electronicslist");

fashion.forEach(category => {
    const link = document.createElement("a");
    link.href = "products.html";
    link.className = "flex items-center text-gray-500 hover:text-black py-2 px-4 text-sm";
    link.textContent = category;
    flist.appendChild(link);
  });

  electronics.forEach(category => {
    const link = document.createElement("a");
    link.href = "#";
    link.className = "flex items-center text-gray-500 hover:text-black py-2 px-4 text-sm";
    link.textContent = category;
    elist.appendChild(link);
  });