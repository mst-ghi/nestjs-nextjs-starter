import { useQuery } from 'react-query';
import Axios from '@utils/axios';

type UseLocationProps = {
  enabledTags?: boolean;
  enabledLanguages?: boolean;
};

const useCommonService = (
  { enabledTags, enabledLanguages }: UseLocationProps = {
    enabledTags: true,
    enabledLanguages: true,
  }
) => {
  const fetchLanguages = async (): Promise<ILanguage[]> => {
    const { data } = await Axios.get(`/v1/common/languages`);
    return data.languages;
  };

  const languagesQuery = useQuery<ILanguage[]>(['languages'], fetchLanguages, {
    enabled: enabledLanguages,
  });

  const fetchTags = async (): Promise<ITag[]> => {
    const { data } = await Axios.get('/v1/common/tags');
    return data.tags;
  };

  const tagsQuery = useQuery<ITag[]>(['tags'], fetchTags, {
    enabled: enabledTags,
  });

  const languagesSelectValue = (language?: ILanguage) => {
    if (language) {
      return {
        label: `${language.title} (${language.key})`,
        value: `${language.title} (${language.key})`,
      };
    }
    return undefined;
  };

  const tagsSelectValue = (tag?: ITag) => {
    if (tag) {
      return {
        label: `${tag.title} (${tag.key})`,
        value: `${tag.title} (${tag.key})`,
      };
    }
    return undefined;
  };

  return {
    fetchLanguages,
    languagesQuery,
    fetchTags,
    tagsQuery,
    languagesSelectValue,
    tagsSelectValue,
  };
};

export default useCommonService;
