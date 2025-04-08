  export const addProduct=async(name, price, min, supplier_id)=> {
    const response=await fetch('http://localhost:3000/product', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name:name,
        price: price,
        minimum:min,
        supplier_id:supplier_id
      })
    })
    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    return response.json();
  }
  export function getProduct(name) {
    fetch(`http://localhost:3000/product/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
  }
  export const getAllProducts=async()=> {
    const response=await fetch('http://localhost:3000/product', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      return response.json();
  }
  export const addSupplier=async(company, phone_number, representative, password) =>{
    const response =await fetch('http://localhost:3000/supplier', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        company:company,
        phone_number: phone_number,
        representative:representative,
        password:password,
      })
    })
    if (!response.ok) {
      throw new Error('Failed to set supplier');
    }
    return response.json();
  }
  export const  getSupplier=async(id) =>{
    const response= await fetch(`http://localhost:3000/supplier/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (!response.ok) {
      throw new Error('Failed to get supplier');
    }
    return response.json();
  }
  export const getAllSuppliers=async() =>{
    const response=await fetch('http://localhost:3000/supplier', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (!response.ok) {
        return []
      }
      return response.json();
  }
  export function addOrder(name, quantity, supplier_id, total){
    console.log(name, quantity, supplier_id, total)
    fetch('http://localhost:3000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name:name,
        quantity: quantity,
        supplier_id:supplier_id,
        total: total,
        status: 'pending'//order not approved yet
      })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
  }
  export function getOrder(id) {
    fetch(`http://localhost:3000/order/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
  }
  export const checkSupplier=async(representative, password)=> {
    const response=await fetch(`http://localhost:3000/supplier/${representative}/${password}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (!response.ok) {
        throw new Error('Failed to fetch supplier');
      }
      return response.json();
  }
  export const  getAllOrders=async() =>{
    const response=await fetch('http://localhost:3000/order', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      return response.json();
  }
  export const getProductsBySupplier=async (id)=> {
    const response= await fetch(`http://localhost:3000/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (!response.ok) {
        return []
      }
      return response.json();
  }
  export const getOrdersBySupplier=async (id)=> {
    const response= await fetch(`http://localhost:3000/orders/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (!response.ok) {
        return [];//supplier doesn't have orders yet
      }
      return response.json();
  }
  export const editOrder=async (order)=> {
    console.log(order)
    const response= await fetch(`http://localhost:3000/order`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:order.id,
          name:order.name,
          quantity: order.quantity,
          supplier_id:order.supplier_id,
          total: order.total,
          status: order.status
        })
      })
      if (!response.ok) {
        throw new Error('Failed to edit');
      }
      return response.json();
  }
