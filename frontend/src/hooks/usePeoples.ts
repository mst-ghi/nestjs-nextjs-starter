import { QueryFunctionContext, QueryKey, useInfiniteQuery } from 'react-query';
import Axios from '@utils/axios';
import { getInfinitePagesData } from '@utils/helpers';

type UsePeoplesProps = {
  enabledPeoples?: boolean;
};

const usePeoples = (
  { enabledPeoples }: UsePeoplesProps = {
    enabledPeoples: false,
  }
) => {
  const fetchPeoples = async ({
    pageParam,
  }: QueryFunctionContext<QueryKey, number>): Promise<IUser[]> => {
    const url = `/v1/users/peoples?take=20${pageParam ? `&curser=${pageParam}` : ''}`;
    const { data } = await Axios.get(url);
    return data.peoples;
  };

  const peoplesQuery = useInfiniteQuery<IUser[]>(['peoples'], fetchPeoples, {
    enabled: enabledPeoples,
    getNextPageParam: (lastPage) => lastPage.at(-1),
  });

  const allPeoplesData = getInfinitePagesData<IUser>(peoplesQuery.data);

  return {
    fetchPeoples,
    peoplesQuery,
    allPeoplesData,
  };
};

export default usePeoples;
