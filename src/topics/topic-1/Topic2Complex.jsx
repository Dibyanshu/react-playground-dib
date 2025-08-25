import React, { useState } from 'react'

const sampleProducts = [
  { id: 1, name: 'Shoe', brand: 'A', price: 50 },
  { id: 2, name: 'Shirt', brand: 'B', price: 30 },
  { id: 3, name: 'Hat', brand: 'A', price: 15 },
  { id: 4, name: 'Jacket', brand: 'C', price: 120 },
]

export default function Topic1Complex() {
  const [brandFilter, setBrandFilter] = useState('All')

  const brands = ['All', ...new Set(sampleProducts.map(p => p.brand))]

  const filtered = brandFilter === 'All' ? sampleProducts : sampleProducts.filter(p => p.brand === brandFilter)

  return (
    <section className="topic-complex">
      <h4>Complex Example — Declarative filtering</h4>
      <div className="complex-wrap">
        <aside className="filters">
          <h5>Filter by Brand</h5>
          {brands.map(b => (
            <label key={b}>
              <input type="radio" name="brand" checked={brandFilter === b} onChange={() => setBrandFilter(b)} /> {b}
            </label>
          ))}
        </aside>

        <div className="product-grid">
          {filtered.map(p => (
            <div key={p.id} className="product-card">
              <strong>{p.name}</strong>
              <div>Brand: {p.brand}</div>
              <div>Price: ${p.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
