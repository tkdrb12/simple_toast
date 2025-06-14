import { useEffect, useState } from 'react';
import { toast } from './core';
import { ToastItem } from './types';

export function ToastContainer() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const unsubscribe = toast.subscribe(setItems);
    return unsubscribe;
  }, []);

  return (
    <div>
      {items.map(({ message, id }) => (
        <div key={id}>{message}</div>
      ))}
    </div>
  );
}
