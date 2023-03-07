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
import Swal from 'sweetalert2';
import { useAuth } from 'contexts/AuthContext';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // 透過useAuth 取得登入狀態及註冊api方法
  const { register, isAuthenticated } = useAuth();

  //註冊 Register function
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

    // 透過AuthContext 呼叫 Register api
    const { success } = await register({
      username,
      email,
      password,
    });

    if (success) {
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
    if (isAuthenticated) {
      navigate('/todos');
    }
  }, [navigate, isAuthenticated]);

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
