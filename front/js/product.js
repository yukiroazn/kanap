// Méthode urlSearchParams pour afficher le produit
let params = new URL(window.location.href).searchParams;
let newID = params.get('id');

// Je crée les variables dont j'ai besoin pour manipuler cette page :
const image = document.getElementsByClassName('item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');

let imageURL = "";
let imageAlt = "";

// Récupération des articles via Fetch API, je crée la bonne URL pour chaque produit choisi en ajoutant newID
fetch("http://localhost:3000/api/products/" + newID)
  .then(res => res.json())
  .then(data => {
     
// Donneés de l'API : je modifie le contenu de chaque variable avec le code HTML

// Affichage Image et AlTxt, Titre, Prix, Description,
  image[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
  imageURL = data.imageUrl;
  imageAlt = data.altTxt;
  title.innerHTML = `<h1>${data.name}</h1>`;
  price.innerText = `${data.price}`;
  description.innerText = `${data.description}`;

// Affichage Couleurs + Option
  for (number in data.colors) {
  colors.options[colors.options.length] = new Option
  (
  data.colors[number],data.colors[number]
  )
  }
  })

// Message erreur si le serveur ne correspond pas
  .catch(_error => {
  alert('error');
  });

// Add to cart 
const addToCart = document.getElementById('addToCart');

// Event click pour récupérer color et quantity une fois cliqué
addToCart.addEventListener('click', () => {
const selectColors = document.querySelector("#colors").value
const selectQuantity = document.querySelector("#quantity").value

// Warning message ou cas un oubli de mettre des informations
if ( selectColors === "" ) 
{
alert("Choisissez une couleur SVP")
return true
} 

if ( selectQuantity == 0 || quantity > 100 )
{
alert("Saisissez une quantitée inférieur à 100")
return true
}

// Exécution data de produit
const selection = {
  id: newID,
  image: imageURL,
  alt: imageAlt,
  name: title.textContent,
  price: price.textContent,
  color: selectColors,
  quantity: selectQuantity,
  };

// Importation data de produit dans local storage (add to cart)
let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));

const addProductLocalStorage = () => 
{
productInLocalStorage.push(selection);
localStorage.setItem('product', JSON.stringify(productInLocalStorage));
}

// Message confirmation item added to cart
let addConfirm = () => 
{
alert("Votre article a été bien ajouté dans le panier");
}

let update = false;
  
// S'il y a des produits enregistrés dans le localStorage
if (productInLocalStorage) {

// Verification du produit qu'il ne soit pas deja dans le localstorage/panier avec la couleur
productInLocalStorage.forEach (function (productOk, key) {
if (productOk.id == newID && productOk.color == selectColors.value) {
  productInLocalStorage[key].quantity = parseInt(productOk.quantity) + parseInt(selectQuantity.value);
  localStorage.setItem('product', JSON.stringify(productInLocalStorage));
  update = true;
  addConfirm();
  }
  });

if (!update) {
  addProductLocalStorage();
  addConfirm();
  }
  }

// S'il n'y a aucun produit enregistré dans le localStorage, je crée alors un tableau avec les éléments choisi par l'utilisateur
  else {
    productInLocalStorage = [];
    addProductLocalStorage();
    addConfirm();
  }
});
