import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from './core';
import { ToastItem, ToastItemStatus, TypeOptions } from './types';
import styled, { keyframes } from 'styled-components';
import { InfoIcon } from './assets/InfoIcon';
import { WarningIcon } from './assets/WarningIcon';
import { SuccessIcon } from './assets/SuccessIcon';

type Props = ToastItem;

const ANIMATION_DELAY = 0.3;

const Icon = ({ type }: { type?: TypeOptions }) => {
  switch (type) {
    case 'info':
      return <InfoIcon />;
    case 'success':
      return <SuccessIcon />;
    case 'warning':
      return <WarningIcon />;
    default:
      return <InfoIcon />;
  }
};

const getColor = (type?: TypeOptions) => {
  switch (type) {
    case 'info':
      return '#2196f3';
    case 'success':
      return '#5bad71';
    case 'warning':
      return '#ef5350';
    default:
      return '#2196f3';
  }
};

const Toast = ({ id, message, delay, typeOption, status }: Props) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeStampRef = useRef<number>(-1);
  const remainRef = useRef<number>(delay ?? -1);
  const rafRef = useRef<number>(-1);
  const [progress, setProgress] = useState(100);
  const [paused, setPaused] = useState(false);

  const color = getColor(typeOption);

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
    <Box $status={status}>
      <Container
        style={{ color: color }}
        $status={status}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <CloseButton onClick={disappear}>x</CloseButton>
        <FlexBox>
          <Icon type={typeOption} />
          <Message>{message}</Message>
        </FlexBox>
        {delay !== null && (
          <ProgressBar style={{ width: `${progress * 100}%` }} />
        )}
      </Container>
    </Box>
  );
};

export default Toast;

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const disappear = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-30px);
  }
`;

const scaleUp = keyframes`
  from {
    height: 0;
}
  to {
    height: 80px;
}
`;

const scaleDown = keyframes`
  from {
    height: 80px;
}
  to {
    height: 0;
}
`;

const Box = styled.div<{ $status?: ToastItemStatus }>`
  position: relative;
  height: 80px;
  width: 320px;
  animation: ${ANIMATION_DELAY}s ease
    ${({ $status }) => ($status === 'removed' ? scaleDown : scaleUp)};
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Message = styled.p`
  max-width: 200px;
  line-height: 1.25;
  white-space: pre-line;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const Container = styled.div<{ $status?: ToastItemStatus }>`
  position: absolute;
  height: 80px;
  width: 320px;
  padding: 8px;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  box-shadow: 0 0 4px color-mix(in srgb, currentColor 25%, white 75%);
  background: white;
  animation: ${ANIMATION_DELAY}s ease
    ${({ $status }) => ($status === 'removed' ? disappear : appear)};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 4px;
  right: 8px;
  height: 24px;
  width: 24px;
  font-size: 14px;
  color: currentColor;
  background: none;
  border: none;
  cursor: pointer;
`;

const ProgressBar = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  background: currentColor;
  border-radius: 1px;
`;
