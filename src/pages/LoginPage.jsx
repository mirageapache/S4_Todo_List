import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from 'api/auth.js';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Login function
  const handleLogin = async () => {
    // 表單驗證
    if (username.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }

    // 呼叫 Loign api
    const { success, authToken } = await login({ username, password });

    if (success) {
      //登入成功，將authToken 存入localStorage
      localStorage.setItem('authToken', authToken);
      // 登入成功提示訊息
      Swal.fire({
        position: 'top',
        title: '登入成功！',
        timer: 1800,
        icon: 'success',
        showConfirmButton: false,
      });
      return;
    } else {
      Swal.fire({
        position: 'top',
        title: '登入失敗！',
        timer: 1800,
        icon: 'error',
        showConfirmButton: false,
      });
    }
  };

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          value={username}
          onChnage={(username) => setUsername(username)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type="password"
          label="密碼"
          placeholder="請輸入密碼"
          value={password}
          onChnage={(password) => setPassword(password)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleLogin}>登入</AuthButton>
      <Link to="/signup">
        <AuthLinkText>前往註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
