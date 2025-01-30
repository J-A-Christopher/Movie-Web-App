import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '../state/slices/authSlice';


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};