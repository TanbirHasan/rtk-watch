import { onAuthStateChanged } from 'firebase/auth';
import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';
import { useAppDispatch } from './redux/hook';
import { setUser } from './redux/features/user/userSlice';
import { auth } from './lib/firebase.file';

function App() {
  const dispatch = useAppDispatch();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(user.email));
    }
  });

  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
