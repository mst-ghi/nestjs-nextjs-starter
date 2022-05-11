import { toDate } from '@utils/date';
import Avatar from '@components/atoms/avatar';
import Card from '@components/atoms/card';

interface PeopleCardProps {
  people: IUser;
}

const PeopleCard = ({ people }: PeopleCardProps) => {
  return (
    <Card className="flex flex-col w-full group">
      <div className="flex flex-row justify-start items-center space-x-3 rtl:space-x-reverse">
        <Avatar
          className="w-16 h-16 group-hover:opacity-80 duration-200"
          placeholder={people.email}
          rounded
        />
        <div className="flex flex-col space-y-1">
          <h3 className="text-lg">{people.full_name}</h3>
          <h4 className="text-sm text-gray-500">{toDate(people.created_at)}</h4>
        </div>
      </div>
    </Card>
  );
};

export default PeopleCard;
