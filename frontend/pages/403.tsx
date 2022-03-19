import PageContent from '@components/organisms/pageContent';
import Button from '@components/atoms/button';

const Page403 = () => {
  return (
    <PageContent title="403, Signin first">
      <div className="flex flex-col justify-center items-center">
        <img src="/images/403.png" alt="404" className="md:w-1/4 pt-20 md:pt-10" />

        <Button href="/signin" className="mt-2" color="error" wide>
          <h1>Signin first, Go to signin page</h1>
        </Button>
      </div>
    </PageContent>
  );
};

export default Page403;
