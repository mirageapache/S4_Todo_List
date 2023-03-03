import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;

  padding: 0 16px;
  p {
    font-size: 14px;
    font-weight: 300;
    margin: 2rem 0 1rem;
  }
`;

const StyledButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  vertical-align: baseline;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  outline: 0;

  font-size: 14px;
  font-weight: 300;
  margin: 2rem 0 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = ({ count }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    // 登出提示訊息
    Swal.fire({
      position: 'top',
      title: '已登出！',
      timer: 1800,
      icon: 'info',
      showConfirmButton: false,
    });
    navigate('/login');
  };

  return (
    <StyledFooter>
      <p>剩餘項目數： {count}</p> {/* 「未完成」的項目數 */}
      <StyledButton onClick={handleLogout}>登出</StyledButton>
    </StyledFooter>
  );
};

export default Footer;
