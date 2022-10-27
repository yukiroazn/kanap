//je demande à fetch de récupérer les données depuis l'url de l'API
fetch('http://localhost:3000/api/products').then((data) => {

// première promesse .then qui va récupérer la réponse
// en la transformant en json pour faciliter l'intérprétation par le navigateur
return data.json();
}).then((completedata) => {
  
// pour ma variable product de ma promise
let products="";

// j'utilise la méthode map() pour prendre un tableau de nombres et doubler leurs valeurs
completedata.map((productLink)=>{

// le + sert à ajouter tous les éléments tant qu'il y en a
// je mets le container de mon produit pour simplifier les choses
// en mettant dollar+accolades est une nouvelle méthode qui permet de directemet combiner des variables et des clés dans un objet ou tableau
products+=

`<a href="./product.html?id=${productLink._id}">
<article>
<img src="${productLink.imageUrl}" alt="${productLink.altTxt}">
<h3 class="productName">${productLink.name}</h3>
<p class="productDescription">${productLink.description}</p>
</article>
</a>`

});

// je déclare ma variable en mettant l'id de mon container de produits
document.getElementById("items").innerHTML=products;


// j'ajoute un message erreur au cas où le serveur ne répond pas
}).catch((err)=>{
  console.log(err);
})

