const axios = require("axios")
const Noty = require('noty');
const { initAdmin } = require("./admin");


let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza) {
    axios.post('/update-cart', pizza)
        .then((res) => {
            console.log(res);
            cartCounter.innerText = res.data.totalQty

            new Noty({
                type: 'success',
                timeout: 1000,
                text: 'Item added to Cart',
                // progressBar: false,
                // layout: 'bottomRight'
            }).show();
            
        })
        .catch((err) => {
            new Noty({
                type: 'error',
                timeout: 1000,
                text: 'Something went wrong',
                // progressBar: false,
                // layout: 'bottomRight'
            }).show();
        })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // console.log(e);
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza);
        // console.log(pizza);
    })
})


// const alertMsg = document.querySelector('#success-alert')
// if(alertMsg) {
//     setTimeout(() => {
//         alertMsg.remove()
//     }, 2000)
// }


initAdmin()
