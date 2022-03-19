import { SchemaSignUp, SignUpFormType } from '@utils/schema';
import useAuth from '@hooks/useAuth';
import useJoiForm from '@hooks/useJoiForm';
import useRecaptcha from '@hooks/useRecaptcha';
import RecaptchaState from '@store/valtio/recaptcha';
import PageContent from '@components/organisms/pageContent';
import Button from '@components/atoms/button';
import Card, { CardBody, CardHeader } from '@components/atoms/card';
import TextInput from '@components/atoms/textInput';

const SignIn = () => {
  const { signUp } = useAuth();
  const { token: recaptcha, clearRecaptcha } = useRecaptcha({ state: RecaptchaState });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useJoiForm<SignUpFormType>({ schema: SchemaSignUp });

  const onSubmit = async (data: SignUpFormType) => {
    await signUp(data.full_name, data.email, data.password, recaptcha);
    clearRecaptcha();
  };

  return (
    <PageContent title="Sign In">
      <div className="flex justify-center items-center">
        <Card className="text-center p-4 w-full md:w-1/3">
          <CardHeader className="text-center pt-4 px-4">
            <h1 className="text-gray-600 font-medium text-2xl">Sign up</h1>
          </CardHeader>

          <CardBody className="p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                <TextInput
                  {...register('full_name')}
                  type="text"
                  placeholder="Enter full name"
                  label="Full Name"
                  error={errors}
                />
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
                    <span>Sign Up</span>
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>

          <div className="divider">
            <span className="text-gray-400">or</span>
          </div>

          <div className="flex justify-center">
            <Button color="link" href="/signin">
              Have account, click here to sign in
            </Button>
          </div>
        </Card>
      </div>
    </PageContent>
  );
};

export default SignIn;
