// Méthode urlSearchParams pour afficher le produit
let param = new URL(document.location).searchParams;
let id = param.get("id");

// Récupération des articles via Fetch API, je crée la bonne URL pour chaque produit choisi en ajoutant newID
fetch(`http://localhost:3000/api/products/${id}`)
.then((response) =>
response.json()
.then((data) => {

// Je crée les variables dont j'ai besoin pour manipuler cette page :
const image = document.getElementsByClassName('item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');

let imageURL = "";
let imageAlt = "";

// Affichage Image et AlTxt, Titre, Prix, Description,
image[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
imageURL = data.imageUrl;
imageAlt = data.altTxt;
title.innerHTML = `<h1>${data.name}</h1>`;
price.innerText = `${data.price}`;
description.innerText = `${data.description}`;

// Affichage Couleurs + Option
for (number in data.colors) 
{
  colors.innerHTML += `<option value="${data.colors[number]}">${data.colors[number]}</option>`;
}
})
)

// Message erreur si le serveur ne correspond pas
.catch(_error => {
alert('error');
});

// Add to cart 
document.querySelector('#addToCart').addEventListener('click', function(){

let saveName = document.getElementById('title').innerText;
let saveUrlImage = document.querySelector('.item__img').innerHTML;
let selectColors = document.getElementById('colors').value;
let selectQuantity = document.getElementById("quantity").value;
    
if ( selectColors == "" ) 
{
alert("Choisissez une couleur SVP")
return true
} 

if(selectQuantity < 1 || selectQuantity > 100){
alert(`Saisissez une quantitée inférieur à 100`);
}else{

// Exécution data de produit
let product = {
idProduct: id,
nameProduct: saveName,
urlImageProduct: saveUrlImage,
colorProduct: selectColors,
quantityProduct: selectQuantity, 
};

// Importation data de produit dans local storage (add to cart)
let productInLocalStorage = JSON.parse(localStorage.getItem('produit'));

const addProductLocalStorage = () =>{
productInLocalStorage.push(product);
localStorage.setItem('produit', JSON.stringify(productInLocalStorage));
}

// Message confirmation item added to cart
const addConfirm = () =>
{
if(window.confirm(`Votre article a été bien ajouté dans le panier`)){
}
}

let update = false;

// S'il y a des produits enregistrés dans le localStorage
if(productInLocalStorage)
{

// Verification du produit qu'il ne soit pas deja dans le localstorage/panier avec la couleur
for(v = 0; v < productInLocalStorage.length; v++){
if(productInLocalStorage[v].idProduct == product.idProduct){
if(productInLocalStorage[v].colorProduct == product.colorProduct)
{

let newQuantityProduct = parseInt(productInLocalStorage[v].quantityProduct) + parseInt(selectQuantity);
if(newQuantityProduct > 100)
{
newQuantityProduct = 100;
}
                  
let newProduct = {
idProduct: id,
nameProduct: saveName,
urlImageProduct: saveUrlImage,
colorProduct: selectColors,
quantityProduct: newQuantityProduct, 
};
productInLocalStorage.splice([v], 1, newProduct);

update = true;
localStorage.setItem('produit', JSON.stringify(productInLocalStorage));
}
}
}

if(update == false)
{ 
addProductLocalStorage();
}
              
addConfirm();

// S'il n'y a aucun produit enregistré dans le localStorage, je crée alors un tableau avec les éléments choisi par l'utilisateur
}else{ 
productInLocalStorage = [];
addProductLocalStorage();
addConfirm();
}
}
});