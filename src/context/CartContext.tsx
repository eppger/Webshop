import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Product } from '../models/Product'
import type { CartProduct } from '../models/CartProduct'

const CartContext = createContext({
cart: [{}],
addToCart: (_product: Product) => {}, 
removeFromCart: (_id: number) => {}, 
updateQuantity: (_id: number, _quantity: number ) => {}, 
clearCart: () => {}, 
totalItems: 0, 
totalPrice: 0
})

export function CartProvider({ children } : {children: ReactNode}) {
  const [cart, setCart] = useState<CartProduct[]>(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })


  // Salvesta localStorage-sse iga muutuse korral
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Lisa toode ostukorvi
  const addToCart = (product: Product) => {
   
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Eemalda toode
  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  // Muuda kogust
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return
    setCart(prev =>
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    )
  }

  // Tühjenda ostukorv
  const clearCart = () => setCart([])

  // Kokkuarvutused
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext)
}