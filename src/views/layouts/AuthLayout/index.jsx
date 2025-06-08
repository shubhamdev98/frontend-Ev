import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAppSelector } from "../../../store/hooks";

const AuthLayout = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (token) {
        navigate("/");
      }
    }, 10);
    return () => clearTimeout(timeId);
  }, [token]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
