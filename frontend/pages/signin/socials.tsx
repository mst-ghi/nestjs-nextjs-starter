import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { authSetTokens, authSetUser } from '@utils/auth';
import { GetRequest } from '@utils/axios';
import useAlert from '@hooks/useAlert';
import useAuth from '@hooks/useAuth';
import PageContent from '@components/organisms/pageContent';
import Spinner from '@components/atoms/spinner';

const SigninSocialRedirect = () => {
  const Router = useRouter();
  const { catchToast } = useAlert();
  const { initializeAuthData } = useAuth();

  const validate = (queries: object, provider: string) => {
    GetRequest({ url: `v1/auth/${provider}/redirect`, queries })
      .then(async ({ data }) => {
        authSetTokens(data.tokens);
        authSetUser(data.user);
        await initializeAuthData();
        Router.push('/profile');
      })
      .catch((error) => {
        catchToast({ error });
        Router.push('/signin');
      });
  };

  useEffect(() => {
    if (Router.isReady) {
      const { provider } = Router.query;
      if (provider) {
        validate(Router.query, provider as string);
      }
    }
  }, [Router.isReady]);

  return (
    <PageContent title="Signin Redirect">
      <div className="flex justify-center items-center h-full">
        <Spinner type="tail-spin" size={120} />
      </div>
    </PageContent>
  );
};

export default SigninSocialRedirect;
