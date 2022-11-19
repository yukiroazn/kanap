// Méthode urlSearchParams pour afficher le produit
const queryString = (window.location.search)
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get(`id`)

// Récupération des articles via Fetch API 
// En mettant ${id} permet d'afficher un produit
fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((res) => data(res))

// Donneés de l'API
data = (sofa) =>
{
  const altTxt = sofa.altTxt
  const colors = sofa.colors
  const description = sofa.description
  const imageUrl = sofa.imageUrl
  const title = sofa.name
  const price = sofa.price

  itemPrice = price
  imgUrl = imageUrl
  altText = altTxt
  articleName = title

  showImage(imageUrl)
  showAltTxt(altTxt)
  showTitle(title)
  showPrice(price)
  showDescription(description)
  showColors(colors)
}

// Affichage Image
showImage = (imageUrl) =>
{
  const containerImg = document.querySelector(`.item__img`)
  const image = document.createElement(`img`)
  image.src = imageUrl
  containerImg.append(image)
  console.log(imageUrl)
}

// Affichage Alt Text Image
showAltTxt = (altTxt) =>
{
  const altTxtUrl = document.createElement(`alt`)
  altTxtUrl.innerText = altTxt
  console.log(altTxt)
}

// Affichage Titre
showTitle = (title) =>
{
  const titleTxt = document.querySelector(`#title`)
  titleTxt.innerText = title
  console.log(title)
}

// Affichage Prix
showPrice = (price) => 
{
  const priceTxt = document.querySelector(`#price`)
  priceTxt.innerText = price
  console.log(price)
}

// Affichage Description
showDescription = (description) =>
{
  const descriptionTxt = document.querySelector(`#description`)
  descriptionTxt.innerText = description
  console.log(description)
}

// Affichage Couleurs
showColors = (colors) => 
{
  const colorsList = document.querySelector(`#colors`)

  colors.forEach(color => 
  {

  const list = document.createElement(`option`)
  list.innerText = color
  colorsList.append(list)

  });
    console.log(colors)
  }
  
// Add to cart 
const addCart = document.querySelector("#addToCart")
{

// Event click pour récupérer color et quantity une fois cliqué
addCart.addEventListener("click", () => {
const color = document.querySelector("#colors").value
const quantity = document.querySelector("#quantity").value

//Warning message en cas un oubli de mettre des informations
if ( color === "" ) 
{
alert("Choisissez une couleur SVP")
return true
} 

if ( quantity == 0 || quantity > 100 )
{
alert("Saisissez une quantitée inférieur à 100")
return true
} 
 
//Exécution data de produit
const key = `${id}-${color}`
const data = 
{
id: key,
color: color,
quantity: Number(quantity),
price: itemPrice,
imageUrl: imgUrl,
altTxt: altText,
name: articleName
}

//Importation data de produit dans local storage (add to cart)
localStorage.setItem(key, JSON.stringify(data))

//Message confirmation item added to cart
if ( window.confirm )
{
alert("Votre article a été bien ajouté dans le panier")
return true
}

})
  
}