 let cart = JSON.parse(localStorage.getItem("cart"))
? JSON.parse(localStorage.getItem("cart"))
: [];
console.log(cart);

// READ 
function readCart(cart){
    document.querySelector("#cart").innerHTML="";
    cart.forEach((product ,i) => {
        document.querySelector("#cart").innerHTML +=`
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img class="img-fluid rounded-start"  src="${product.image}"/>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.price}</p>
                        <input type="number" min=1 value=${product.Qty} id="Qty${i}" onclick="updateCart(${i})"/>
                        <p>R${parseInt(product.Qty) * parseFloat(product.price)}</p>
                        <button class="btn btn-danger" onclick="deleteCart(${i})">remove</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    });
} 
localStorage.setItem("cart", JSON.stringify(cart));
readCart(cart);

let total = cart.reduce((total, product) => {
  return total + product.price * product.Qty;
  
}, 0)
.toFixed(2);

// console.log(total)
// parseFloat(product.price)*parseInt(product.Qty)


showCartBadge();{
  document.querySelector("#cart-footer").innerHTML += `
  <h3>Total cost: R${total}</h3>
  <button class="btn btn-primary btn-lg" onclick="Checkout()">Checkout</button>`;
}

function showCartBadge() {
  // document.querySelector("#badge").innerHTML = cart ? cart.length : "";
}

readCart(cart);


function updateCart(i) {
  let Qty= document.querySelector(`#Qty${i}`).value;
  cart[i] = { ...cart[i], Qty,
  };
  localStorage.setItem("cart", JSON.stringify(cart));

  readCart(cart);
}



//Delete
function deleteCart(i) {
  let confirmation = confirm("Are you sure you want to delete this item");
  if (confirmation) {
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    readCart(cart);
  }
}

//Checkout

function Checkout() {
  let total = cart.reduce((total, product) => {
      return total + product.price * product.Qty;
    }, 0)
    .toFixed(2);
  try {
    if (parseInt(total) == 0) throw new Error("nothing in cart");
    let confirmation = confirm(`Total payment: R${total}`);
    if (confirmation) {
      cart.length = 0;
      localStorage.removeItem("cart");
    }
    readCart(cart);
  } catch (err) {
    alert(err);
  }
}


