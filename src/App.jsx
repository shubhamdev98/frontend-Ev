import { ToastContainer } from 'react-toastify';
import RouterConfig from './config/RouterConfig';
import { useEffect } from 'react';
import { handleStorageEvents } from './config/global-funtion';
import { useAppDispatch } from './store/hooks';
import { initialValue } from './views/modules/auth/utils/slice';
const App = () => {
  // console.log("Env",import.meta.env.VITE_API_URL);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initialValue()).catch((e) => e)
    window.addEventListener('storage', handleStorageEvents)
  }, [dispatch])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
