import { ToastContainer, toast } from './@shared/Toast';
import { TypeOptions } from './@shared/Toast/types';

function App() {
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
      <ToastContainer />
    </div>
  );
}

export default App;
