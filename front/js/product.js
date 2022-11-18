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
  console.log(imageUrl);
}

// Affichage Alt Text Image
showAltTxt = (altTxt) =>
{
  const altTxtUrl = document.createElement(`alt`)
  altTxtUrl.innerText = altTxt
  console.log(altTxt);
}

// Affichage Titre
showTitle = (title) =>
{
  const titleTxt = document.querySelector(`#title`)
  titleTxt.innerText = title
  console.log(title);
}

// Affichage Prix
showPrice = (price) => 
{
  const priceTxt = document.querySelector(`#price`)
  priceTxt.innerText = price
  console.log(price);
}

// Affichage Description
showDescription = (description) =>
{
  const descriptionTxt = document.querySelector(`#description`)
  descriptionTxt.innerText = description
  console.log(description);
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
    console.log(colors);
  }

  
// Panier 
const button = document.querySelector("#addToCart")