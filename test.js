// Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("cart");
var close = document.getElementsByClassName("close")[0];
var close_footer = document.getElementsByClassName("close-footer")[0];
var order = document.getElementsByClassName("order")[0];

btn.onclick = function () {
  modal.style.display = "block";
}
close.onclick = function () {
  modal.style.display = "none";
}
close_footer.onclick = function () {
  modal.style.display = "none";
}



window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//format tiền
const formatter = new Intl.NumberFormat('vi', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0
})

// xóa cart 
var remove_cart = document.getElementsByClassName("btn-danger");
for (var i = 0; i < remove_cart.length; i++) {
  var button = remove_cart[i]
  button.addEventListener("click", function () {
    var button_remove = event.target
    button_remove.parentElement.parentElement.remove()
    updatecart();
  })
 
}

// update cart 
function updatecart() {
    var cart_item = document.getElementsByClassName("cart-items")[0];
    var cart_rows = cart_item.getElementsByClassName("cart-row");
    var total = 0;
    for (var i = 0; i < cart_rows.length; i++) {
      var cart_row = cart_rows[i]
      var price_item = cart_row.getElementsByClassName("cart-price ")[0];
      var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
      var price = removeDot(price_item.innerText.replace("đ",""));
      console.log(price_item.innerText.replace("đ",""));
      var quantity = quantity_item.value 
      total = total + (price * quantity)
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = formatter.format(total);
   
  }

// thay đổi số lượng sản phẩm
var quantity_input = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantity_input.length; i++) {
  var input = quantity_input[i];
  input.addEventListener("change", function (event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart();
  })
}

// Thêm vào giỏ
var add_cart = document.getElementsByClassName("btn-cart");
for (var i = 0; i < add_cart.length; i++) {
  var add = add_cart[i];
  add.addEventListener("click", function (event) {

    var button = event.target;
    var product = button.parentElement.parentElement;
    var img = product.parentElement.getElementsByClassName("img-prd")[0].src
    var title = product.getElementsByClassName("content-product-h3")[0].innerText
    var price = product.getElementsByClassName("price")[0].innerText
    addItemToCart(title, price, img)

    modal.style.display = "block";
    
    updatecart()
  })
}

function addItemToCart(title, price, img) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cart_title = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cart_title.length; i++) {
    if (cart_title[i].innerText == title) {
      alert('Sản Phẩm Đã Có Trong Giỏ Hàng')
      return
    }
  }

  var cartRowContents = `
  <div class="cart-item cart-column">
      <img class="cart-item-image" src="${img}" width="100" height="100">
      <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">Xóa</button>
  </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
    var button_remove = event.target
    button_remove.parentElement.parentElement.remove()
    updatecart()
  })
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart()
  })
}

function removeDot(str){
    while(str.indexOf(".")>=0){
      str = str.replace(".","");
    }
    return Number(str);
}


//slideshow
var i =1;
var N =3;

function Next(){
	if(i<N)
		i+=1;
	else
		i=1;
		
	document.getElementById("slide").setAttribute("src","./img/"+i+".gif");
	console.log("next");
}

function Back(){
	if(i>1)
		i-=1;
	else
		i=N;
		
	document.getElementById("slide").setAttribute("src","./img/"+i+".gif");
	console.log("back");
}



setInterval(() => {
	if(i<N)
		i+=1;
	else
		i=1;
		
	document.getElementById("slide").setAttribute("src","./img/"+i+".gif");
	console.log("next");
}, 3000);



$("ul li:nth-child(1)").click(function(){
  $(".left-set img:nth-child(2)").animate({
    opacity: 1
  })
})

$("ul li:nth-child(2)").click(function(){
  $(".left-set img:nth-child(2)").animate({
    opacity: 0
  })
})


$(document).ready(function() {
  
  $('.color-choose input').on('click', function() {
      var headphonesColor = $(this).attr('data-image');
  
      $('.active').removeClass('active');
      $('.left-column img[data-image = ' + headphonesColor + ']').addClass('active');
      $(this).addClass('active');
  });
  
});