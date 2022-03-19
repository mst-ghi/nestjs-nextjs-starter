import PageContent from '@components/organisms/pageContent';

const Page404 = () => {
  return (
    <PageContent title="404, Page Not Found">
      <div className="flex justify-center">
        <img src="/images/404.png" alt="404" className="md:w-1/2 pt-20 md:pt-10" />
      </div>
    </PageContent>
  );
};

export default Page404;
