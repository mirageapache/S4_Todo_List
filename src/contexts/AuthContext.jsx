import { checkPermission, login, register } from 'api/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';

const defaultAuthContext = {
  isAuthenticated: false, // 使用者是否登入的判斷依據，預設為 false，若取得後端的有效憑證，則切換為 true
  currentMember: null, // 當前使用者相關資料，預設為 null，成功登入後就會有使用者資料
  register: null, // 註冊方法
  login: null, // 登入方法
  logout: null, // 登入方法
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation(); //取得當前頁面，判斷頁面是否有變換

  useEffect(() => {
    const checkTokenIsValid = async () => {
      // 從localStorage取出authToken
      const authToken = localStorage.getItem('authToken');
      // 如果authToken是不存在表示尚未登入
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      } else {
        // 透過checkPermission api確認authToken是否有效
        const result = await checkPermission(authToken);

        if (result) {
          // 驗證成功，則設定authToken及user資料
          setIsAuthenticated(true);
          const tempPayload = jwt.decode(authToken);
          setPayload(tempPayload);
        } else {
          // 驗證失敗
          setIsAuthenticated(false);
          setPayload(null);
        }
      }
    };

    checkTokenIsValid();
  }, [pathname]); //當pathname(當前頁面)有變換時，則檢查authToken

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.sub, // 取出 sub 字串，可以做為使用者 id
          name: payload.name, // 取出使用者帳號
        },
        register: async (data) => {
          const { success, authToken } = await register({
            username: data.username,
            email: data.email,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken); // 透過JsonWebToken套件來解析authToken
          if (tempPayload) {
            // 註冊成功
            setPayload(tempPayload); // 設定user 資料
            setIsAuthenticated(true); // 設定為取得憑證
            localStorage.setItem('authToken', authToken); //將AuthToken存入localStorage
          } else {
            // 註冊失敗
            setPayload(null);
            setIsAuthenticated(false);
          }
          // 回傳註冊結果
          return success;
        },
        login: async (data) => {
          const { success, authToken } = await login({
            username: data.username,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        logout: () => {
          localStorage.removeItem('authToken');
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
