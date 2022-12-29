// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE
let products = [];
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));

// AFFICHER LES PRODUITS DU PANIER

// Je sélectionne la partie html concernée par la modification
let cartAndFormContainer = document.getElementById('cartAndFormContainer');

// Si le panier est vide : afficher 'le panier est vide'
if(productInLocalStorage == null || productInLocalStorage == 0) {
  document.querySelector("#cart__items").innerHTML =`
  <div class="cart__empty">
    <p>Votre panier est vide ! <br> Merci de sélectionner des produits depuis la page d'accueil</p>
  </div>`;
}
// Si le panier n'est pas vide : afficher les produits dans le localStorage
else{
  let itemCards = [];
 
// Expression initiale; condition; incrémentation
for (i = 0; i < productInLocalStorage.length; i++) {
  products.push(productInLocalStorage[i].id);
 
// Je copie le code HTML et sera injecté à chaque tour de boucle, selon la longueur des produits dans le local storage
  itemCards = itemCards + `
    
    <article class="cart__item" data-id="${productInLocalStorage[i].id}" data-color="${productInLocalStorage.color}">
    <div class="cart__item__img">
      <img src="${productInLocalStorage[i].image}" alt="${productInLocalStorage[i].alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${productInLocalStorage[i].name}</h2>
        <p>${productInLocalStorage[i].color}</p>
        <p>${productInLocalStorage[i].price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[i].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `;
  }
  if (i == productInLocalStorage.length) {
  const itemCart = document.getElementById('cart__items');
  itemCart.innerHTML += itemCards;
  }

// Modification la quantité dans le panier
function changeQtt() {
  let itemQtt = document.querySelectorAll('.itemQuantity');
  for (let j = 0; j < itemQtt.length; j++) {
    itemQtt[j].addEventListener('change', (event) => {
    event.preventDefault();
// Sélection de la nouvelle quantité...
// ... qu'on va sauvegarder dans un nouveau tableau
// avec les autres éléments du localStorage
    let itemNewQtt = itemQtt[j].value;
    const newLocalStorage = {
      id: productInLocalStorage[j].id,
      image: productInLocalStorage[j].image,
      alt: productInLocalStorage[j].alt,
      name: productInLocalStorage[j].name,
      color: productInLocalStorage[j].color,
      price: productInLocalStorage[j].price,   
      quantity: itemNewQtt, // avec la nouvelle quantité souhaitée
    };

    // Actualiser le localStorage avec les nouvelles données récupérées... 
    productInLocalStorage[j] = newLocalStorage;
    // ...en transformant les Js en Json
    localStorage.setItem('product', JSON.stringify(productInLocalStorage));

    // Avertir de la modification et mettre à jour les totaux
    totalArticles();
    priceAmount();
      })
  }
}
changeQtt();

// Je supprime un produit dans le panier
function deleteArticle() {
  const deleteItem = document.querySelectorAll('.deleteItem');

  for (let k = 0; k < deleteItem.length; k++) { 
    deleteItem[k].addEventListener('click', (event) => {
    event.preventDefault();

    // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
    let deleteId = productInLocalStorage[k].id;
    let deleteColor = productInLocalStorage[k].color;

    // filtrer l'élément cliqué par le bouton supprimer
    // en respectant les conditions du callback
    productInLocalStorage = productInLocalStorage.filter( elt => elt.id !== deleteId || elt.color !== deleteColor);
      
    // envoyer les nouvelles données dans le localStorage
    localStorage.setItem('product', JSON.stringify(productInLocalStorage));

    // avertir de la suppression et recharger la page
    alert('Votre article a bien été supprimé.');
    window.location.href = "cart.html";
    });
  }
}
deleteArticle();

// j'affiche le total des articles dans le panier
function totalArticles() {
  let totalItems = 0;
  for (l in productInLocalStorage) {

const newQuantity = parseInt(productInLocalStorage[l].quantity, 10);
totalItems += newQuantity;
  }

const totalQuantity = document.getElementById('totalQuantity');
totalQuantity.textContent = totalItems;
}
totalArticles();

// Je calcule le montant total du panier
function priceAmount() {
  const calculPrice = [];
  for (m = 0; m < productInLocalStorage.length; m++) {

// Prix de l'article quantité * prix
const cartAmount = productInLocalStorage[m].price * productInLocalStorage[m].quantity;
    calculPrice.push(cartAmount);

const reduce = (previousValue, currentValue) => previousValue + currentValue;
    total = calculPrice.reduce(reduce);
  }
const totalPrice = document.getElementById('totalPrice');
  totalPrice.textContent = total;
}
priceAmount();
}

// Contact Form REGEX
function postForm() {
  const order = document.getElementById('order');
  order.addEventListener('click', (event) => {
  event.preventDefault();

// Je récupère les données du formulaire dans un objet
const contact = {
    firstName : document.getElementById('firstName').value,
    lastName : document.getElementById('lastName').value,
    address : document.getElementById('address').value,
    city : document.getElementById('city').value,
    email : document.getElementById('email').value
  }

// Prénom
function controlFirstName() {
    const validFirstName = contact.firstName;
    if (/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{3,31}$/i.test(validFirstName)) {
      return true;
    } else {
      let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
      firstNameErrorMsg.innerText = "Merci de vérifier le prénom, 3 caractères minimum";
    }
  } 

// Nom
function controlName() {
    const validName = contact.lastName;
    if (/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i.test(validName)) {
      return true;
    } else {
      let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
      lastNameErrorMsg.innerText = "Merci de vérifier le nom, 3 caractères minimum, avec des lettres uniquement";
    }
  }

// Adresse
function controlAddress() {
    const validAddress = contact.address;
    if (/^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i.test(validAddress)) {
      return true;
    } else {
      let addressErrorMsg = document.getElementById('addressErrorMsg');
      addressErrorMsg.innerText = "Merci de vérifier l'adresse, alphanumérique et sans caractères spéciaux";
    }
  }

// Ville
function controlCity() {
    const validCity = contact.city;
    if (/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i.test(validCity)) {
      return true;
    } else {
      let cityErrorMsg = document.getElementById('cityErrorMsg');
      cityErrorMsg.innerText = "Merci de vérifier le nom de la ville, 3 caractères minimum, avec des lettres uniquement";
    }
  }

// Email
function controlEmail() {
    const validEmail = contact.email;
    if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,10})+$/i.test(validEmail)) {
      return true;
    } else {
      let emailErrorMsg = document.getElementById('emailErrorMsg');
      emailErrorMsg.innerText = "Erreur ! Email non valide";
    }
  }

// Après vérification des entrées, j'envoie l'objet contact dans le localStorage
function validControl() {
    if (controlFirstName() && controlName() && controlAddress() && controlCity() && controlEmail()) {
      localStorage.setItem('contact', JSON.stringify(contact));
      return true;
    } else {

      }
  }
  validControl()

// Je mets les valeurs du formulaire et les produits sélectionnés dans un objet
const sendFormData = {
    contact,
    products,
  }

// J'envoie le formulaire + localStorage (sendFormData) que j'envoie au serveur
const options = {
    method: 'POST',
    body: JSON.stringify(sendFormData),
    headers: { 
      'Content-Type': 'application/json',
    }
  };

  fetch("http://localhost:3000/api/products/order", options)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('orderId', data.orderId);
        if (validControl()) {
          document.location.href = 'confirmation.html?id='+ data.orderId;
        }
    });

})
}
postForm();