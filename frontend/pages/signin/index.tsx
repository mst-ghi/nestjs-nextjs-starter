import { envs } from '@utils/constants';
import { SchemaSignIn, SigninFormType } from '@utils/schema';
import useAuth from '@hooks/useAuth';
import useJoiForm from '@hooks/useJoiForm';
import useRecaptcha from '@hooks/useRecaptcha';
import RecaptchaState from '@store/valtio/recaptcha';
import PageContent from '@components/organisms/pageContent';
import Button from '@components/atoms/button';
import Card, { CardBody, CardHeader } from '@components/atoms/card';
import TextInput from '@components/atoms/textInput';

const SignIn = () => {
  const { signIn } = useAuth();
  const { token: recaptcha, clearRecaptcha } = useRecaptcha({ state: RecaptchaState });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useJoiForm<SigninFormType>({ schema: SchemaSignIn });

  const onSubmit = async (data: SigninFormType) => {
    await signIn(data.email, data.password, recaptcha);
    clearRecaptcha();
  };

  const onGoogleClick = () => {
    window.location.assign(`${envs.apiUrl}/v1/auth/google`);
  };

  const onFacebookClick = () => {
    window.location.assign(`${envs.apiUrl}/v1/auth/facebook`);
  };

  return (
    <PageContent title="Sign In">
      <div className="flex justify-center items-center">
        <Card className="text-center p-4 w-full md:w-1/3">
          <CardHeader className="text-center pt-4 px-4">
            <h1 className="text-gray-600 font-medium text-2xl">Sign in</h1>
          </CardHeader>

          <div className="flex flex-row justify-center space-x-2 px-1 pb-2 pt-4">
            <Button
              className="w-1/2 h-10"
              color="error"
              icon={{ name: 'google', size: 30 }}
              onClick={onGoogleClick}
            >
              <span>Google</span>
            </Button>

            <Button
              className="w-1/2 h-10"
              color="info"
              icon={{ name: 'facebook', size: 30 }}
              onClick={onFacebookClick}
            >
              <span>Facebook</span>
            </Button>
          </div>

          <CardBody className="p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                <TextInput
                  {...register('email')}
                  type="email"
                  placeholder="Enter your email"
                  label="Email"
                  error={errors}
                />
                <TextInput
                  {...register('password')}
                  type="password"
                  placeholder="Enter your email"
                  label="Password"
                  error={errors}
                />

                <div className="flex flex-row justify-center space-x-4">
                  <Button
                    type="submit"
                    block
                    className="mt-4"
                    color="primary"
                    isLoading={!recaptcha}
                    disabled={!recaptcha}
                  >
                    <span>Sign In</span>
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>

          <div className="divider">
            <span className="text-gray-400">or</span>
          </div>

          <Button color="link" href="/signup" block>
            Do not have a account? click here
          </Button>
        </Card>
      </div>
    </PageContent>
  );
};

export default SignIn;
