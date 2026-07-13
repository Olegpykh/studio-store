'use client';

import { useEffect } from 'react';
import { useCart } from '@/hooks/useCart';

export default function CartInitializer() {
  const initCart = useCart((state) => state.initCart);

  useEffect(() => {
    initCart();
  }, [initCart]);

  return null; 
}
