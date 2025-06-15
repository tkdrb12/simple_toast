import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from './core';
import { ToastItem, ToastItemStatus } from './types';
import styled from 'styled-components';

type Props = ToastItem;

const ANIMATION_DELAY = 300;

const Toast = ({ id, message, delay, typeOption, status }: Props) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeStampRef = useRef<number>(-1);
  const remainRef = useRef<number>(delay ?? -1);
  const rafRef = useRef<number>(-1);
  const [progress, setProgress] = useState(100);
  const [paused, setPaused] = useState(false);

  const removeMe = () => toast.remove(id);

  const disappear = () => {
    toast.update(id, { status: 'removed' });

    setTimeout(() => {
      removeMe();
    }, ANIMATION_DELAY * 1000);
  };

  const pause = () => {
    if (delay === null || delay === undefined || delay <= 0) return;

    setPaused(true);

    remainRef.current -= Date.now() - timeStampRef.current;
  };

  const resume = () => {
    setPaused(false);

    timeStampRef.current = Date.now();
  };

  const animateTimer = useCallback(() => {
    if (delay === null || delay === undefined || delay <= 0) return;

    const offset = delay - remainRef.current;
    const runningTime = Date.now() - timeStampRef.current + offset;

    const nextPercent = Math.min(Math.max(0, runningTime / delay), 1);

    setProgress(nextPercent);

    rafRef.current = requestAnimationFrame(animateTimer);
  }, []);

  useEffect(() => {
    if (delay === null || paused) return;

    if (status === 'removed') return;

    timeStampRef.current = Date.now();

    timerRef.current = setTimeout(() => disappear(), remainRef.current);
    rafRef.current = requestAnimationFrame(animateTimer);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, delay, status]);

  return (
    <Container onMouseEnter={pause} onMouseLeave={resume}>
      <CloseButton onClick={disappear}>x</CloseButton>
      {progress}
      {message}
    </Container>
  );
};

export default Toast;

const Container = styled.div`
  height: 120px;
  width: 300px;
  background: #cccccc;
`;

const CloseButton = styled.button`
  height: 40px;
  width: 40px;
`;
