import { ToastContainer, toast } from './@shared/Toast';
import { TypeOptions } from './@shared/Toast/types';

function App() {
  const showToastMessage = (
    message: string,
    typeOption?: TypeOptions,
    delay?: number | null
  ) => {
    toast.add(message, (typeOption = 'info'), delay);
  };

  const clearToast = () => {
    toast.clear();
  };

  return (
    <div className="App">
      <button onClick={() => showToastMessage('msg')}>toast</button>
      <button onClick={() => clearToast()}>clear</button>

      <ToastContainer />
    </div>
  );
}

export default App;
