import React, { useState } from 'react'

function ProductCard({ product, onAddToCart }) {
  const isAvailable = product.stock > 0
  const hasDiscount = product.originalPrice > product.salePrice

  return (
    <div style={{borderRadius:8, padding:10, background:'rgba(255,255,255,0.02)'}}>
      <img src={product.imageUrl} alt={product.name} style={{width:'100%',height:80,objectFit:'cover',borderRadius:6}} />
      <div style={{paddingTop:8}}>
        <h4 style={{margin:0}}>{product.name}</h4>
        {hasDiscount ? (
          <p className="price"><span style={{textDecoration:'line-through',marginRight:8}}>${product.originalPrice}</span><strong>${product.salePrice}</strong></p>
        ) : (
          <p className="price"><strong>${product.salePrice}</strong></p>
        )}
        {!isAvailable && <p style={{color:'#f88'}}>Currently Unavailable</p>}
        <button onClick={() => onAddToCart(product.id)} disabled={!isAvailable}>{isAvailable ? 'Add to Cart' : 'Out of Stock'}</button>
      </div>
    </div>
  )
}

const sampleProducts = [
  { id:1, name:'Shoe', imageUrl:'/img/shoe.png', originalPrice:60, salePrice:50, stock:10 },
  { id:2, name:'Hat', imageUrl:'/img/hat.png', originalPrice:20, salePrice:20, stock:0 },
  { id:3, name:'Jacket', imageUrl:'/img/jacket.png', originalPrice:150, salePrice:120, stock:5 },
]

export default function Topic3Complex() {
  const [cart, setCart] = useState([])
  const [filterBrand] = useState('All')

  function handleAdd(id) {
    setCart(prev => [...prev, id])
  }

  return (
    <section className="topic3-complex">
      <h4>ProductCard example — Conditional UI & Events</h4>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:12}}>
        {sampleProducts.map(p => (
          <ProductCard key={p.id} product={p} onAddToCart={handleAdd} />
        ))}
      </div>
      <div style={{marginTop:12}}>Cart items: {cart.length}</div>
    </section>
  )
}
