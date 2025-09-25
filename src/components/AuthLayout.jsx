import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const user = useSelector((state) => state.auth.userdata); // check user, not status

useEffect(() => {
    if (authentication && !user) navigate("/login");
    else if (!authentication && user) navigate("/");
    setLoader(false);
}, [user, navigate, authentication]);

  return loader ? <h1>Loading</h1> : <>{children}</>;
}
