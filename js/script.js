
//------------------------------Navbar Tabs / Main Navbar / Content (other tabs) selector 
const tabs = document.querySelectorAll('[data-tab-target]');//navbar Tab selector 
const tabContents = document.querySelectorAll('[data-tab-content]');//navbar content selector 

tabs.forEach(option => { 
  option.addEventListener('click', () => {
    const target = document.querySelector(option.dataset.tabTarget);
    tabContents.forEach(tabContent => tabContent.classList.remove('active'));
    target.classList.add('active');
    tabs.forEach(tabActive => tabActive.classList.remove('active-tab'));
    option.classList.add('active-tab');    
    
  });
});




//------------------------------Search/Filter Items
const searchItem = document.getElementById('search-bar');

searchItem.addEventListener('keyup', (e) => {
  //variables for search purpose
  const itemsContainers = document.querySelectorAll('.item');
  const itemsTitles = document.querySelectorAll('.item-title');
  const activeItems = document.querySelectorAll('.active-item');
  var textValue = searchItem.value.toUpperCase();
 
  if(e.keyCode==13 && e!='') {    
    itemsContainers.forEach(itemContainer =>{itemContainer.classList.remove('active-item')});
    
    itemsTitles.forEach(itemTitle =>{   
        if (itemTitle.textContent.toUpperCase().includes(textValue))            
            itemTitle.parentNode.classList.add('active-item');});
   
   itemsContainers.forEach(a =>{a.classList.contains('active-item')? a.style.display='block': a.style.display='none'});
     
   
  } else if( e ==''){ divItems.style.display='block';}
});

 

//------------------------------Add Items to Cart  
//target button
const infoItem = document.querySelectorAll('.btn-cart');
infoItem.forEach(item =>{
    item.addEventListener('click', (e)=>{
        var itemDetail = e.target.parentElement.parentElement.parentElement;
        var title = itemDetail.querySelector('.item-title').textContent;
        var price = itemDetail.querySelector('.item-price').textContent;
        var imgsrc = itemDetail.querySelector('.item-image').src;
        //console.log(title, price, imgsrc);
        notification ('Item added');
        addToCart(imgsrc, title, price);          
        updateCartTotal();        
   }); 
        
});



function addToCart(imgsrc, title, price){
   var itemContainer = document.querySelectorAll('.cart-item-container');
   var itemsName = document.querySelectorAll('.cart-item-title'); 
   for(let i = 0; i < itemsName.length; i++){
       if(itemsName[i].textContent == title){        
           var increaseItem = parseInt(itemsName[i].parentElement.nextElementSibling.children[1].value) + 1;
           itemsName[i].parentElement.nextElementSibling.children[1].value = increaseItem;         
           return;
       }};              
   var createItemSpace = document.createElement('div');
   createItemSpace.classList.add('cart-item-container');
   var itemsSection = document.querySelector('.cart-items');
   var createItem= `        
           <img class='cart-item' src='${imgsrc}'>
           <div class='cart-item-detail'>
                <span class='cart-item-title'>${title}</span>
               <span class='cart-item-price'>${price}</span>
           </div>
           <div class='cart-item-buttons'>
               <button class='btn-cart-item btn-item btn-reduce'><img src='https://drive.google.com/uc?export=view&id=10gWDLcd2JkuzynNZTzpgj3XMGGdy9ECe'></button>
               <input class='count-cart-item' value='1' type='text' min='1' max='20'/>
               <button class='btn-cart-item btn-item btn-add'><img src='https://drive.google.com/uc?export=view&id=1bKcNq7f5SxI0bhqaGlFOzIN1nCMmhb5H'> </button>
               <button class='btn-item-control btn-item btn-eliminate'>Delete</button>
               <button class='btn-item-control btn-item btn-save'>Save for later</button>
           </div>`
   createItemSpace.innerHTML = createItem; 
   itemsSection.insertBefore(createItemSpace, itemsSection.children[0]);
   createItemSpace.querySelector('.btn-eliminate').addEventListener('click', removeItemButton ());
   createItemSpace.querySelector('.count-cart-item').addEventListener('click', updateQuantityInput ());
   createItemSpace.querySelector('.btn-add').addEventListener('click', addQuantityButton ());
   createItemSpace.querySelector('.btn-reduce').addEventListener('click', reduceQuantityButton ());
   document.querySelector('.btn-checkout').addEventListener('click', checkoutButton());
  createItemSpace.querySelector('.btn-save').addEventListener('click', saveItemForLater ());             
};





//------------------------------Remove Items from Cart
function removeItemButton (){
    const removeItem = document.querySelectorAll('.btn-eliminate');
    removeItem.forEach(removeButton => { 
        removeButton.addEventListener('click', (event) => {
            event.target.parentElement.parentElement.remove();
            updateCartTotal();
        });
    });
};

//------------------------------Add/Reduce/Update Item Quantity from Cart 
//uptade quantity in Input area
function updateQuantityInput (){
    const quantityInputItem = document.querySelectorAll('.count-cart-item');
    quantityInputItem.forEach(quantityChange =>{
         quantityChange.addEventListener('change', e=>{
              var input = e.target;
              if(input.value <= 0 || isNaN(input.value)) { input.value = 1}
              updateCartTotal();              
         });
   });
};

 
function addQuantityButton (){
    const addQuantity = document.querySelector('.btn-add');
        addQuantity.addEventListener('click', () =>{
            var input = 0;
            input = addQuantity.parentElement.querySelector('.count-cart-item');
            //console.log(addQuantity.parentElement.querySelector('.count-cart-item'));
            input.value = parseInt(input.value) + 1;   
            updateCartTotal();
        });    
};

function reduceQuantityButton (){
  const reduceQuantity = document.querySelector('.btn-reduce');
    reduceQuantity.addEventListener('click', () =>{
            var input = reduceQuantity.nextElementSibling;
            if(input.value > 1) { input.value = parseInt(input.value) - 1};   
            updateCartTotal();
        });
};

//------------------------------Purchase Button
const cartItem = document.querySelector('.cart-items');
function checkoutButton (){
    btnCheckout.addEventListener('click', (e) =>{
          console.log(e.classList);
          while(cartItem.hasChildNodes()){
             cartItem.removeChild(cartItem.firstChild)};
          notification ('Purchase completed');
          updateCartTotal();          
       });        
};

//display purchase options  
const subtotal = document.querySelector('.cart-subtotal');
const btnCheckout = document.querySelector('.btn-checkout');
function displayPurchaseButton (countItem){
        if(countItem.childElementCount > 0){
            subtotal.style.display = 'inline';
            btnCheckout.style.display = 'inline';
          }else {
            subtotal.style.display = 'none';
            btnCheckout.style.display = 'none';
          }
};


//------------------------------Update Total Value from Cart
function updateCartTotal(){  
    const itemsContent= document.querySelector('.cart-content');
    const itemContainer = itemsContent.querySelectorAll('.cart-item-container');
    var total = 0;
    itemContainer.forEach( item =>{
         var itemPrice = item.querySelector('.cart-item-price');
         var itemQuantity = item.querySelector('.count-cart-item');

         var price = parseFloat(itemPrice.textContent.replace('$',''));
         var quantity = itemQuantity.value;
         //console.log(`precio: ${price} , cantidad: ${quantity}`);
         total = Math.round((total + (price * quantity))*100)/100;         
         //console.log(total);
         document.activeElement.blur();
         
    });
    document.querySelector('.subtotal-value').textContent = total;
   //Item Cart counter        
    document.querySelector('.cart-span').textContent= cartItem.childElementCount; 
    displayPurchaseButton (cartItem);
   //Saved Items 
   var savedLocation = document.querySelector('.saved-items')
   document.querySelector('.count-items-saved').textContent= savedLocation.childElementCount == 2 ?`(${savedLocation.childElementCount -1} item)` :`(${savedLocation.childElementCount -1} items)`;
};


//------------------------------Save Items for Later / Move Item to Cart
function saveItemForLater (){
    const saveLater = document.querySelectorAll('.btn-save');
    const newLocation = document.querySelector('.saved-items');
    saveLater.forEach (option =>{
        option.addEventListener('click', () =>{ 
          var currentItem = option.parentElement.parentElement;          
          newLocation.insertBefore(currentItem, newLocation.children[1]);
          currentItem.classList.remove('cart-item-container');
          currentItem.classList.add('item-saved');
          option.classList.remove('btn-save');
          option.classList.add('btn-upload');
          option.textContent ='Add to cart';
          option.removeEventListener('click',saveItemForLater ());
          option.addEventListener('click',uploadItemToCart ());          
        });
    });
  updateCartTotal(); 
  //Item Cart counter  
};

function uploadItemToCart (){
    const uploadToCart = document.querySelectorAll('.btn-upload');
    const oldLocation = document.querySelector('.cart-items');
    uploadToCart.forEach (option =>{
        option.addEventListener('click', ()=>{
          var currentItem = option.parentElement.parentElement;
          oldLocation.insertBefore(currentItem, oldLocation.children[0]);
          currentItem.classList.remove('item-saved');
          currentItem.classList.add('cart-item-container');
          option.classList.remove('btn-upload');
          option.classList.add('btn-save');
          option.textContent ='Save for later';
          option.removeEventListener('click',uploadItemToCart ());
          option.addEventListener('click',saveItemForLater ());
          
        });
    });
  updateCartTotal(); 
};



//------------------------------PopupMessage
const popupMessage = document.querySelector('.popup-message');
function notification (message){
  popupMessage.children[0].textContent= message;
   popupMessage.classList.add('info-item');
        setTimeout(()=>{
            popupMessage.classList.remove('info-item');
        },1800);
};