import axios from 'axios'
import Noty from 'noty'
import { initAdmin } from './admin'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza){
    axios.post('/update-cart',pizza).then( res =>{
        
        cartCounter.innerText =  res.data.totalQty // khi mình bấm vào order sản phẩm sẽ tự động nhảy vào giỏ hàng
        new Noty({
            type:'success', // màu 
            timeout: 1000,
            text: 'Bạn đã Thêm Sản Phẩm',
            progressBar: false
            // layout:'topLeft' vị trí hiện thị  thông báo
        }).show();
    }).catch(err => {
        new Noty({
            type:'error', // màu 
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false
            // layout:'topLeft' vị trí hiện thị  thông báo
        }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // console.log(e);
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    // console.log(pizza);
    })
})


// remove alert messgage after X seconds

const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() =>{
        alertMsg.remove()
    },2000)
}

initAdmin()