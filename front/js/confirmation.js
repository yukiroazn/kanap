checkout();

function checkout()
{
    const orderId = document.getElementById('orderId');
    orderId.innerHTML = localStorage.getItem('orderId');
    localStorage.clear();
}