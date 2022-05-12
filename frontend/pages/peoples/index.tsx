import usePeoples from '@hooks/usePeoples';
import PageContent from '@components/organisms/pageContent';
import PeopleCard from '@components/molecules/peopleCard';
import Card from '@components/atoms/card';

const Home = () => {
  const { allPeoplesData } = usePeoples({ enabledPeoples: true });

  const renderPeoples = () => {
    if (!allPeoplesData) {
      return null;
    }

    return allPeoplesData.map((people: IUser) => {
      return (
        <div key={people.id} className="w-1/4">
          <PeopleCard people={people} />
        </div>
      );
    });
  };

  return (
    <PageContent title="Peoples" className="flex flex-col space-y-5">
      <Card className="py-4">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-gray-600">کاربران مختلف را پیدا کنید</h1>
        </div>
      </Card>

      <div className="flex flex-row space-x-4 rtl:space-x-reverse">{renderPeoples()}</div>
    </PageContent>
  );
};
export default Home;
