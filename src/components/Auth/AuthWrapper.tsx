import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { AuthData, AuthFuncProps } from "../../types/Auth";
import { getMessage } from "../../structures/Common";

type AuthWrapperProps = {
  children: ReactNode;
};

export default function AuthWrapper(props: AuthWrapperProps) {
  const [authContext, setAuthContext] = useState<AuthData>({
    status: null,
  });

  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const authenticate = async (authProps: AuthFuncProps) => {
    const message = getMessage(authProps);
    if (message) {
      setAuthContext({ status: false, message: message });
      return;
    }
    setAuthContext(null);

    const data =
      authProps.tokenLogin && authProps.type === "login"
        ? { token: token }
        : { username: authProps.username, pass: authProps.pass, captchaToken: authProps.captcha };

    axios
      .post(`${import.meta.env.VITE_API_URL}/v1/auth/${authProps.type}`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setAuthContext(res.data);
        if (res.data.status && res.data.token) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        }
      });
  };

  useEffect(() => {
    const paths = ["/register", "/login"];
    if (paths.includes(location.pathname)) {
      setAuthContext((prev) => {
        if (prev) {
          return { ...prev, message: undefined };
        }
        return null;
      });
    }
  }, [location.pathname]);

  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setAuthContext(null);
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      authenticate({ type: "login", tokenLogin: true });
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ handleAuth: authenticate, handleLogout: logout, data: authContext }}>
      {props.children}
    </AuthContext.Provider>
  );
}
