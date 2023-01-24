const bodyContent = document.querySelector('.products-content')
const searchInput = document.querySelector('.search-input')

const getApi = async () => {
  const responseProducts = await fetch('https://fakestoreapi.com/products');
  const response = await responseProducts.json();
  dataProducts(response)
  
}

searchInput.addEventListener('input', function(){
  const filter = searchInput.value.toLowerCase();
  const listProduct = document.querySelectorAll('.title-product');

  listProduct.forEach(item => {
    let text = item.textContent;
    if(text.toLowerCase().includes(filter.toLowerCase())){
      item.parentNode.parentNode.parentNode.style.display = ''
    }
    else{
      item.parentNode.parentNode.parentNode.style.display = 'none'
    }
  })
})

const dataProducts = (response) => {
  let card = '';
  response.forEach(products => {
    card += cardUpdate(products)
    
  });
  bodyContent.innerHTML = card;
}

const getProductDetail = (id) => {
  fetch('https://fakestoreapi.com/products/'+id)
            .then(res=>res.json())
            .then(json=>updateUiModal(json))
}

document.addEventListener('click', function(e){
  if(e.target.classList.contains('detail-btn')){
    const getId = e.target.dataset.id
    getProductDetail(getId)
  }
})

function updateUiModal(product) {
  const modalUpdate = modalDetail(product);
  const modalBody = document.querySelector('.modal-body')
  modalBody.innerHTML = modalUpdate;
}

const modalDetail = (product) => {
  return `<img src="${product.image}" class="card-img-top" width="200" height="600">
            <ul class="list-group my-2">
              <li class="list-group-item"><strong>Description : </strong>${product.description}</li>
              <li class="list-group-item"><strong>Category : </strong>${product.category}</li>
              <li class="list-group-item"><strong>Price : </strong>$${product.price}</li>
            </ul> `
}

const cardUpdate = (product) => {
  return `<div class="col-xl-2 this-product">
            <div class="card h-100" >
              <img src="${product.image}" class="card-img-top" width="200" height="200">
              <div class="card-body">
                <p class="card-text title-product">${product.title}</p>
                <h5 class="card-title my-1">$${product.price}</h5>
                <div class="detail-btn btn btn-primary w-100 my-1" data-id=${product.id} data-bs-toggle="modal" data-bs-target="#producteModal">Detail</div>
                <div class="buy-btn btn btn-success w-100">Order</div>
              </div>
            </div>
          </div>`
}


getApi()
