import { useState } from 'react';
import { ToastContainer, toast } from './@shared/Toast';
import { ToastPos, TypeOptions } from './@shared/Toast/types';

function App() {
  const [pos, setPos] = useState<ToastPos>('top-right');

  const showToastMessage = (
    message: string,
    typeOption?: TypeOptions,
    delay?: number | null
  ) => {
    toast.add(message, typeOption ?? 'info', delay);
  };

  const clearToast = () => {
    toast.clear();
  };

  return (
    <div className="App">
      <button onClick={() => showToastMessage('테스트용 메시지입니다.')}>
        info
      </button>
      <button
        onClick={() =>
          showToastMessage(
            `에러 메시지 테스트입니다.\n 자동 닫기 x`,
            'warning',
            null
          )
        }
      >
        warn
      </button>
      <button onClick={() => showToastMessage('성공 메시지입니다.', 'success')}>
        success
      </button>
      <button onClick={() => clearToast()}>clear</button>
      <select value={pos} onChange={(e) => setPos(e.target.value as ToastPos)}>
        <option value="top-left">top-left</option>
        <option value="top-center">top-center</option>
        <option value="top-right">top-right</option>
        <option value="bottom-left">bottom-left</option>
        <option value="bottom-center">bottom-center</option>
        <option value="bottom-right">bottom-right</option>
      </select>
      <ToastContainer pos={pos} />
    </div>
  );
}

export default App;
