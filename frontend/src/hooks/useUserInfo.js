import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

export default function useUserInfo(redirect = true) {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString !== null) {
      setUserInfo(JSON.parse(userInfoString));
    } else {
      if (redirect) history.push('/sign-in');
    }
  }, [history, redirect]);

  return [userInfo];
}