import PageContent from '@components/organisms/pageContent';
import Hero from '@components/atoms/hero';

const Home = () => {
  return (
    <PageContent title="Home">
      <Hero className="py-8">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
      </Hero>
    </PageContent>
  );
};
export default Home;
