import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from './core';
import { ToastItem } from './types';
import styled from 'styled-components';

type Props = ToastItem;

const ANIMATION_DELAY = 300;

const Toast = ({ id, message, delay, typeOption }: Props) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeStampRef = useRef<number>(-1);
  const remainRef = useRef<number>(delay ?? -1);
  const rafRef = useRef<number>(-1);
  const [progress, setProgress] = useState(100);
  const [paused, setPaused] = useState(false);

  const removeMe = () => toast.remove(id);

  const pauseTimer = () => setPaused(true);

  const resumeTimer = () => setPaused(false);

  const animateTimer = useCallback(() => {
    const runningTime = Date.now() - timeStampRef.current;
    const nextPercent = Math.max(0, runningTime / remainRef.current);

    setProgress(nextPercent);

    rafRef.current = requestAnimationFrame(animateTimer);
  }, []);

  useEffect(() => {
    if (delay === null || paused) return;

    timeStampRef.current = Date.now();

    timerRef.current = setTimeout(() => removeMe(), remainRef.current);
    rafRef.current = requestAnimationFrame(animateTimer);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, delay]);

  return (
    <Container onMouseEnter={pauseTimer} onMouseLeave={resumeTimer}>
      <CloseButton onClick={removeMe}>x</CloseButton>
      {progress}
      {message}
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
