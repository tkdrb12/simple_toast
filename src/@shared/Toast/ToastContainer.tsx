import { useEffect, useState } from 'react';
import { toast } from './core';
import { ToastItem, ToastPos } from './types';
import styled, { css } from 'styled-components';
import Toast from './Toast';

type Props = { pos?: ToastPos };

export const ToastContainer = ({ pos }: Props) => {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const unsubscribe = toast.subscribe(setItems);
    return unsubscribe;
  }, []);

  return (
    <Container $pos={pos ?? 'top-right'}>
      {items.map(({ id, delay = 3000, ...rest }) => (
        <Toast key={id} id={id} delay={delay} {...rest} />
      ))}
    </Container>
  );
};

export const Container = styled.div<{ $pos: ToastPos }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 10000;

  ${({ $pos }) => {
    switch ($pos) {
      case 'top-left':
        return css`
          top: 12px;
          left: 12px;
          align-items: flex-start;
        `;
      case 'top-center':
        return css`
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          align-items: center;
        `;
      case 'top-right':
        return css`
          top: 12px;
          right: 12px;
          align-items: flex-end;
        `;
      case 'bottom-left':
        return css`
          bottom: 12px;
          left: 12px;
          align-items: flex-start;
        `;
      case 'bottom-center':
        return css`
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          align-items: center;
        `;
      case 'bottom-right':
        return css`
          bottom: 12px;
          right: 12px;
          align-items: flex-end;
        `;
      default:
        return '';
    }
  }}
`;
