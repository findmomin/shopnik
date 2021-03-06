import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import styled from 'styled-components';
import LoginForm from '../components/Auth/LoginForm';
import { UserContext } from '../contexts/User';
import { authPagesStyles } from '../styles/globalStyles';

const Root = styled.div`
  ${authPagesStyles}
`;

const Login = () => {
  const user = useContext(UserContext);
  const router = useRouter();

  user ? router.push('/') : null;

  return (
    <Root>
      <Head>
        <title>Log in</title>
      </Head>

      <LoginForm />
    </Root>
  );
};

export default Login;
