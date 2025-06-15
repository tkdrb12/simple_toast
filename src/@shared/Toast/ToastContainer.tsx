import { useEffect, useState } from 'react';
import { toast } from './core';
import { ToastItem } from './types';
import styled from 'styled-components';
import Toast from './Toast';

export const ToastContainer = () => {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const unsubscribe = toast.subscribe(setItems);
    return unsubscribe;
  }, []);

  return (
    <Container>
      {items.map(({ id, delay = 3000, ...rest }) => (
        <Toast key={id} id={id} delay={delay} {...rest} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
