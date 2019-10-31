export const addItem = (item, next) => {
  console.log('addItem')
  let cart = []
  if (typeof window !== 'undefined'){
    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'));

      // JSON.parse() to convert json to Object
      // JSON.stringify() to convert object to json
    }
      cart.push({
        ...item,
        count: 1
      })

      cart = Array.from(new Set(cart.map( (p)=>(p._id) ))).map( id=> {
        return cart.find(p => p._id === id);
      });
      localStorage.setItem('cart', JSON.stringify(cart))
      next();

  }
}

export const itemTotal = () =>{
  if(typeof window !== 'undefined'){
    if(localStorage.getItem('cart')){
      return JSON.parse(localStorage.getItem('cart')).length;
    }
  } else {
    return 0;
  }
}

export const getCart = () =>{
  if(typeof window !== 'undefined'){
    if(localStorage.getItem('cart')){
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
    return [];
}


export const updateItem = (productId, count) =>{
  let cart = [];
  if(typeof window !== 'undefined'){
    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.map((product, index) =>{
      if(product._id == productId){
        product.count = count;
        //cart[i].count = count;
      }
    })
    localStorage.setItem('cart', JSON.stringify(cart));
  }

}

export const removeItem = (productId) =>{
  let cart = [];
  if(typeof window !== 'undefined'){
    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'))
    }

  cart.map((product, index) =>{
    if(product._id == productId){
      cart.splice(index,1)
      //cart[i].count = count;
    }
  })
  localStorage.setItem('cart', JSON.stringify(cart));
  }
return cart
}

export const emptyCart = next =>{
  if(typeof window !== 'undefined'){
    localStorage.removeItem('cart');
    next();
  }
}
