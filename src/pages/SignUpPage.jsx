import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkPermission, register } from 'api/auth.js';
import Swal from 'sweetalert2';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Register function
  const handleRegister = async () => {
    // 表單驗證
    if (username.length === 0) {
      return;
    }
    if (email.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }

    // 呼叫 Register api
    const { success, authToken } = await register({
      username,
      email,
      password,
    });

    if (success) {
      //註冊成功，將authToken 存入localStorage
      localStorage.setItem('authToken', authToken);
      // 註冊成功提示訊息
      Swal.fire({
        position: 'top',
        title: '註冊成功！',
        timer: 1800,
        icon: 'success',
        showConfirmButton: false,
      });
      return;
    } else {
      // 註冊失敗提示訊息
      Swal.fire({
        position: 'top',
        title: '註冊失敗！',
        timer: 1800,
        icon: 'error',
        showConfirmButton: false,
      });
    }
  };

  // 驗證登入狀態 Check AuthToken
  useEffect(() => {
    const checkTokenIsValid = async () => {
      // 從localStorage取出authToken
      const authToken = localStorage.getItem('authToken');
      // 如果authToken是空值表示尚未登入(or註冊)，則停留在註冊頁
      if (!authToken) {
        return;
      }
      // 透過checkPermission api確認authToken是否有效
      const result = await checkPermission(authToken);
      // 驗證成功導到todos頁面
      if (result) {
        navigate('/todos');
      }
    };

    checkTokenIsValid();
  }, [navigate]);

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

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
          type="email"
          label="Email"
          placeholder="請輸入Email"
          value={email}
          onChnage={(email) => setEmail(email)}
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

      <AuthButton onClick={handleRegister}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>立即登入</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
