import { ToastContainer } from 'react-toastify';
import RouterConfig from './config/RouterConfig';
const  App = () => {
console.log("Env",import.meta.env.VITE_API_URL);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterConfig />
    </>
  );
}

export default App;
