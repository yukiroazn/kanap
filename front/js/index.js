// Récupérer les données depuis l'url de l'API
fetch('http://localhost:3000/api/products').then((data) => {

return data.json();
}).then((completedata) => {
  
// Pour ma variable product de ma promise
let products="";

completedata.map((productLink)=>{

// Le + sert à ajouter tous les éléments tant qu'il y en a
// Copier le code HTML en mettant dollat+accolade
products+=

`<a href="./product.html?id=${productLink._id}">
<article>
<img src="${productLink.imageUrl}" alt="${productLink.altTxt}">
<h3 class="productName">${productLink.name}</h3>
<p class="productDescription">${productLink.description}</p>
</article>
</a>`

});

// Déclaration
document.getElementById("items").innerHTML=products;


// Message d'erreur
}).catch((err)=>{
  console.log(err);
})