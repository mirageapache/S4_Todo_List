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

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

      <AuthButton>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>立即登入</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
