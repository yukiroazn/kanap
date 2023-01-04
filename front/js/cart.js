// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE
let productInLocalStorage = JSON.parse(localStorage.getItem('produit'));

// Je copie le code HTML et sera injecté à chaque tour de boucle, selon la longueur des produits dans le local storage
function basketUpdate(){
let basketShow = [];
for(n = 0; n < productInLocalStorage.length; n++){
basketShow = basketShow + `

<article class="cart__item" data-id="${productInLocalStorage[n].idProduct}" data-color="${productInLocalStorage[n].colorProduct}">
        <div class="cart__item__img">
        ${productInLocalStorage[n].urlImageProduct}
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${productInLocalStorage[n].nameProduct}</h2>
            <p>${productInLocalStorage[n].colorProduct}</p>
            <p>NOP €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté :</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[n].quantityProduct}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
        </article>
        `
    }
    document.querySelector('#cart__items').innerHTML = basketShow; 
    basketTotal();
}

// Si le panier est vide : afficher 'le panier est vide'
if(productInLocalStorage == null || productInLocalStorage == 0) {
  document.querySelector("#cart__items").innerHTML =`
  <div class="cart__empty">
    <p>Votre panier est vide ! <br> Merci de sélectionner des produits depuis la page d'accueil</p>
  </div>`;
}
else{
    basketUpdate();
}

// Modification la quantité dans le panier
function basketTotal(){

let totalPrice = 0;
let totalItem = 0;
let updatePrice;
let y = 1;

for(t = 0; t < productInLocalStorage.length; t++){
let quantity = productInLocalStorage[t].quantityProduct;
let urlProduct = `http://localhost:3000/api/products/${productInLocalStorage[t].idProduct}`;

fetch(urlProduct)
.then((response) =>
response.json()
.then((data) => {
var priceCalc = data.price * quantity;
                      
updatePrice = document.querySelectorAll('.cart__item__content__description p');
updatePrice[y].innerHTML = `<p>${data.price} €</p>`;
totalPrice += priceCalc;
totalItem += parseInt(quantity);
document.getElementById('totalQuantity').innerText = totalItem;
document.getElementById('totalPrice').innerText = totalPrice;
y =+ y + 3;
})
)
.catch(err => console.log('Erreur : ' + err));
}
}

// Je supprime un produit dans le panier
let btnDelete = document.querySelectorAll('.deleteItem');

for (let k = 0; k < btnDelete.length; k++){
btnDelete[k].addEventListener('click', (e) =>{

// enregistrer l'id et la couleur séléctionnés par le bouton supprimer
let deleteId = productInLocalStorage[k].idProduct;
let deleteColor= productInLocalStorage[k].colorProduct;

// filtrer l'élément cliqué par le bouton supprimer
// en respectant les conditions du callback
productInLocalStorage = productInLocalStorage.filter( el => el.idProduct !== deleteId || el.colorProduct !== deleteColor);

// envoyer les nouvelles données dans le localStorage
localStorage.setItem('produit', JSON.stringify(productInLocalStorage));

// avertir de la suppression et recharger la page
alert('Votre article a bien été supprimé.');
window.location.href = "cart.html";
})
}

// j'affiche le total des articles dans le panier
let inputQuantity = document.querySelectorAll('input.itemQuantity');
console.log(inputQuantity);

for (let z = 0; z < inputQuantity.length; z++){
inputQuantity[z].addEventListener('change', (e) =>{

// Modification la quantité dans le panier
let changeQuantity = document.querySelectorAll('input')[z].value;
if(changeQuantity <= 0 || changeQuantity >= 100){
alert(`La quantité d'article doit aller de 1 à 100 par produit !`);
}else{

// Sélection de la nouvelle quantité...
// ... qu'on va sauvegarder dans un nouveau tableau
// avec les autres éléments du localStorage
let product = 
{
idProduct: productInLocalStorage[z].idProduct,
nameProduct: productInLocalStorage[z].nameProduct,
urlImageProduct: productInLocalStorage[z].urlImageProduct,
colorProduct: productInLocalStorage[z].colorProduct,
quantityProduct: changeQuantity, // avec la nouvelle quantité souhaitée
};
  
productInLocalStorage.splice([z], 1, product);
localStorage.setItem('produit', JSON.stringify(productInLocalStorage));
basketTotal();
}
})
}

// Contact Form REGEX
let form = document.querySelector('.cart__order__form');

form.firstName.addEventListener('change', function(){
  validFirstName(this);
});
form.lastName.addEventListener('change', function(){
  validLastName(this);
});
form.address.addEventListener('change', function(){
  validAddress(this);
});
form.city.addEventListener('change', function(){
  validNameCity(this);
});
form.email.addEventListener('change', function(){
  validEmail(this);
});

// Prénom
const validFirstName = function(inputFirstName){
  let p = inputFirstName.nextElementSibling
  if(inputFirstName.value.match(/^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]{3,25}$/)){
    p.innerHTML = "";
    return true;
  }else{
    p.innerHTML = "Veuillez ne pas mettre de caractère spécial, ni de chiffre";
    return false;
  }
};

// Nom
const validLastName = function(inputLastName){
  let p = inputLastName.nextElementSibling
  if(inputLastName.value.length == 0){
    p.innerHTML = "Veuillez renseigner le champ de saisie";
    return false;
  }
  else if(inputLastName.value.length < 3 || inputLastName.value.length > 25){
    console.log("trop court ou trop long");
    p.innerHTML = "Prénom doit contenir entre 3 et 25 caractères";
    return false;
  }
  if(inputLastName.value.match(/^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]{3,25}$/)){
    p.innerHTML = "";
    return true;
  }else{
    p.innerHTML = "Veuillez ne pas mettre de caractère spécial, ni de chiffre";
    return false;
  }
};

// Adresse
const validAddress = function(inputAddress){
  let p = inputAddress.nextElementSibling
  if(inputAddress.value.match(/^[a-z A-Z 0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,50}$/)){
    p.innerHTML = "";
    return true;
  }else{
    p.innerHTML = "Adresse invalide";
    return false;
  }
};

// Ville
const validNameCity = function(inputCity){
  let p = inputCity.nextElementSibling
  if(inputCity.value.match(/^[a-z A-Z 0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,50}$/)){
    p.innerHTML = "";
    return true;
  }else{
    p.innerHTML = "Adresse invalide";
    return false;
  }
};

// Email
const validEmail = function(inputEmail){
  let emailRegExp = new RegExp('[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

  let testEmail = emailRegExp.test(inputEmail.value);
  let p = inputEmail.nextElementSibling 

  if(testEmail == true){
      p.innerHTML = "";
      return true;
  } else{
      p.innerHTML = "Adresse email invalide";
      return false;
  }
};

// J'envoie le formulaire + localStorage (sendFormData) que j'envoie au serveur
const postUrl = "http://localhost:3000/api/products/order/";
const orderButton = document.getElementById("order");
orderButton.addEventListener("click", (e) => {
  e.preventDefault();


// Après vérification des entrées, j'envoie l'objet contact dans le localStorage
let validityFirstName = validFirstName(form.firstName);
let validityLastName = validLastName(form.lastName);
let validityAddress = validAddress(form.address);
let validityCity = validAddress(form.city);
let validityEmail = validEmail(form.email);
if(validityFirstName && validityLastName && validityAddress && validityCity && validityEmail == true){
    let jsonData = makeJsonData();
    console.log(jsonData);
    fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((res) => res.json())
      .then((data) => {
        if(productInLocalStorage === null || productInLocalStorage == 0){
          alert('Votre panier est vide.');
        }else{
          localStorage.clear();
          console.log(data.orderId);
          let confirmationUrl = "./confirmation.html?id=" + data.orderId;
          window.location.href = confirmationUrl;
        }
        
      })
      .catch(() => {
        alert("Une erreur est survenue, merci de revenir plus tard.");
      }); // catching errors
    }else{
      alert("Une erreur s'est produite");
  }

  
});

function makeJsonData() {
  let contact = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value,
  };
  let products = [];

  if(productInLocalStorage === null || productInLocalStorage == 0){
  }
  for (i = 0; i < productInLocalStorage.length; i++) {
    if (products.find((e) => e == productInLocalStorage[i].idProduct)) {
    } else {
      products.push(productInLocalStorage[i].idProduct);
      console.log(productInLocalStorage[i])
    }
  }
  let jsonData = JSON.stringify({ contact, products });
  return jsonData;
}
 