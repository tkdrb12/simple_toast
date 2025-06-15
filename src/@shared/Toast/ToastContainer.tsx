import { useEffect, useState } from 'react';
import { toast } from './core';
import { ToastItem } from './types';
import Toast from './Toast';

export function ToastContainer() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const unsubscribe = toast.subscribe(setItems);
    return unsubscribe;
  }, []);

  return (
    <div>
      {items.map(({ id, delay = 3000, ...rest }) => (
        <Toast key={id} id={id} delay={delay} {...rest} />
      ))}
    </div>
  );
}
