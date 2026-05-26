import { createContext, useContext, useReducer, useCallback } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        item =>
          item.product.id === action.payload.product.id &&
          item.options.karat === action.payload.options.karat &&
          item.options.diamondSize === action.payload.options.diamondSize &&
          item.options.metalColor === action.payload.options.metalColor
      );

      if (existingIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
        return { ...state, items: updatedItems, isOpen: true };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        isOpen: true,
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload),
      };
    case 'UPDATE_QUANTITY': {
      const updatedItems = [...state.items];
      updatedItems[action.payload.index] = {
        ...updatedItems[action.payload.index],
        quantity: action.payload.quantity,
      };
      return { ...state, items: updatedItems };
    }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  const addItem = useCallback((product, options) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, options } });
  }, []);

  const removeItem = useCallback((index) => {
    dispatch({ type: 'REMOVE_ITEM', payload: index });
  }, []);

  const updateQuantity = useCallback((index, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { index, quantity } });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: 'TOGGLE_CART' });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: 'CLOSE_CART' });
  }, []);

  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        toggleCart,
        closeCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
