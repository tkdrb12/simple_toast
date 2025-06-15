import { ChangeEventHandler, useState } from 'react';
import { ToastContainer, toast } from './@shared/Toast';
import { ToastPos, TypeOptions } from './@shared/Toast/types';

function App() {
  const [pos, setPos] = useState<ToastPos>('top-right');
  const [delay, setDelay] = useState<number | null>(3000);

  const showToastMessage = (
    message: string,
    typeOption?: TypeOptions,
    delay?: number | null
  ) => {
    toast.add(message, typeOption ?? 'info', delay);
  };

  const clearToast = () => toast.clear();

  const handleChangeDelay: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value === '') {
      setDelay(null);

      return;
    }

    const number = Number(e.target.value);

    if (Number.isNaN(number)) return;

    setDelay(number);
  };

  return (
    <div className="App" style={{ padding: '30px' }}>
      <button
        onClick={() =>
          showToastMessage('테스트용 메시지입니다.', 'info', delay)
        }
      >
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
      <button
        onClick={() => showToastMessage('성공 메시지입니다.', 'success', delay)}
      >
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
      <input defaultValue={3000} type="number" onChange={handleChangeDelay} />
      <ToastContainer pos={pos} />
    </div>
  );
}

export default App;
