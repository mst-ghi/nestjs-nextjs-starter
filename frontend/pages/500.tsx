import PageContent from '@components/organisms/pageContent';

const Page404 = () => {
  return (
    <PageContent title="500, Error occurred">
      <div className="flex justify-center">
        <h1>500 - Server-side error occurred</h1>
      </div>
    </PageContent>
  );
};

export default Page404;
