let products= JSON.parse(localStorage.getItem("products"))
? JSON.parse(localStorage.getItem("products"))
: [
    {
    title:"Margarita",
    category:"Cocktails",
    price:"109",
    image:"https://images.pexels.com/photos/4786627/pexels-photo-4786627.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
},
{
    title:"Mojito",
    category:"Cocktails",
    price:"100",
    image:"https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
},
{
    title:"Strawberry Daiquiri ",
    category:"Cocktail",
    price:"120",
    image:"https://images.pexels.com/photos/10766779/pexels-photo-10766779.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
},
{
    title:"Pina Colada",
    category:"Cocktail",
    price:"80",
    image:"https://images.pexels.com/photos/4134384/pexels-photo-4134384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
},
{
    title:"Sushi",
    category:"Sea Food",
    price:"200",
    image:"https://images.pexels.com/photos/4725630/pexels-photo-4725630.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
},

{
    title:"lobster",
    category:"Sea Food",
    price:"120",
    image:"https://images.pexels.com/photos/8352391/pexels-photo-8352391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
},
{
    title:"Nachos",
    category:"Food",
    price:"60",
    image:"https://images.pexels.com/photos/5848734/pexels-photo-5848734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
},
{
    title:"Salad",
    category:"Vegan",
    price:"66",
    image:"https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
},

]

let cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")): [];
console.log(cart);



  function readProducts() {
    document.querySelector("#products").innerHTML = "", 
    console.log(products);
    products.forEach((product, i) => {
      document.querySelector("#products").innerHTML += `
      
      <div class="card">
        <img src=${product.image} class="img">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.category}</p>
          <p class="card-text2">${product.price}</p>
          <input type="number" min=1 value=1  id="Qty${i}"></input><br><br>

        <button type="button" class="btn btn-danger"onclick="deleteProducts(${i})">Delete</button>
        <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#Modal${i}">Edit</button>
        <button type="button" class="btn btn-success" onclick="addCart(${i})">Add to Cart<i class="bi bi-cart-plus"></i></button>

        </div> 
      <div class="modal fade" id="Modal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="#exampleModal">Product Update</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <input type="text" id="Title${i}" placeholder="Edit Title " value="${product.title}">
          </input>
         <select id="Category${i}" value="${product.category}">
          <option value="Cocktail">Cocktail</option>
          <option value="Non-Alchoholics">Non-Alchoholics</option>
          <option value="Vegan">Vegan</option>
          <option value="Sea-Food">Sea-Food</option>
          <option value="Meat">Meat</option>
          <option value="Snacks">Snacks</option>
          </select>
  
      </label>
    
          <input type="text" id="Price${i}" placeholder="Edit Price" value="${product.price}">
          </input>
          <input type="text" id="Image${i}" placeholder="Add Image" value="${product.image}">
          </input>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button onclick="updateProduct(${i})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    
      
      
      `;
    });
  }
   localStorage.setItem("products", JSON.stringify(products));
  readProducts(products);
  
  function addProduct() {
    let title=document.querySelector(`#addTittle`).value;
    let category= document.querySelector(`#addCategory`).value;
    let price= document.querySelector(`#addPrice`).value;
    let  image= document.querySelector(`#addImage`).value;
    try {
      if (!title ||!title ||!price ||!image) throw new Error("Please add contents before adding");
      products.push({
          title,
          category,
          price,
          image  
      });
      localStorage.setItem("products", JSON.stringify(products));
      readProducts(products);
    } catch (err) {
      alert(err);
    }
  }
  
  function deleteProducts(i) {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  }
  
  function updateProduct(i) {
    let title = document.querySelector(`#Title${i}`).value;
    let category = document.querySelector(`#Category${i}`).value;
    let price = document.querySelector(`#Price${i}`).value;
    let  image  = document.querySelector(`#Image${i} `).value;
    products[i] = {
      title,
      category,
      price,
      image
    };
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  }




  function addCart(i){
    let Qty = document.querySelector(`#Qty${i}`).value;
    let added = false;
    cart.forEach(product => {
      if(product.title == products[i].title){
        alert(
          `You've selected ${product[i].title} to the cart`
        );
        product.Qty = parseInt(product.Qty) + parseInt(Qty)
        added = true
        localStorage.setItem("cart",JSON.stringify(cart));
       
      }
    })
    if (!added){
      cart.push({...products[i] ,QTY});
      localStorage.setItem("cart",JSON.stringify(cart));
      
    
    }

  // }
// showCartBadge();
// localStorage

// SORT BY CATEGORY
}
  function  sortCategory(){
    console.log("SORTING CATEGORIES NOW")
    let category = document.querySelector("#f-Category").value;
  
    if (category == "All") {
      return readProducts(products);
    }
  
    let foundProducts = products.filter((product) => {
      return product.category == category;
    });
  
    readProducts(foundProducts);
    console.log(foundProducts);
  
  }

function sortName() {
  let direction = document.querySelector("#Filter-Name").value;

  let sortedProducts = products.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  if (direction == "descending") sortedProducts.reverse();
  console.log(sortedProducts);
  readProducts(products);
}

// SORT BY PRICE

function sortPrice() {
  let direction = document.querySelector("#Filter-Price").value;

  let sortedProducts = products.sort((a, b) => a.price - b.price);

  console.log(sortedProducts);

  if (direction == "descending") sortedProducts.reverse();
  readProducts(sortedProducts);
}
