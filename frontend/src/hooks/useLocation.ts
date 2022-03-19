import { QueryFunctionContext, QueryKey, useQuery } from 'react-query';
import Axios from '@utils/axios';

type UseLocationProps = {
  enabledCounties?: boolean;
  initialCountryId?: number;
  initialProvinceId?: number;
};

const useLocationService = (
  { enabledCounties, initialCountryId, initialProvinceId }: UseLocationProps = {
    enabledCounties: true,
  }
) => {
  const fetchCities = async ({
    queryKey,
  }: QueryFunctionContext<QueryKey, number>): Promise<ICity[]> => {
    if (queryKey[1]) {
      const { data } = await Axios.get(`/v1/common/area/${queryKey[1]}/cities`);
      return data.cities;
    }
    return [];
  };

  const citiesQuery = useQuery<ICity[]>(['cities', initialProvinceId], fetchCities, {
    enabled: Boolean(initialProvinceId),
  });

  const fetchProvinces = async ({
    queryKey,
  }: QueryFunctionContext<QueryKey, number>): Promise<IProvince[]> => {
    if (queryKey[1]) {
      const { data } = await Axios.get(`/v1/common/area/${queryKey[1]}/provinces`);
      return data.provinces;
    }
    return [];
  };

  const provincesQuery = useQuery<IProvince[]>(['provinces', initialCountryId], fetchProvinces, {
    enabled: Boolean(initialCountryId),
  });

  const fetchCountries = async (): Promise<ICountry[]> => {
    const { data } = await Axios.get('/v1/common/area/countries');
    return data.countries;
  };

  const countriesQuery = useQuery<ICountry[]>(['countries'], fetchCountries, {
    enabled: enabledCounties,
  });

  const countrySelectValue = (country?: ICountry) => {
    if (country) {
      return {
        label: `${country.emoji} ${country.name} (${country.phone_code?.replace('+', '')})`,
        value: country.id,
      };
    }
    return undefined;
  };

  const provinceSelectValue = (province?: IProvince) => {
    if (province) {
      return {
        label: `${province.name} (${province.code})`,
        value: province.id,
      };
    }
    return undefined;
  };

  return {
    fetchCities,
    citiesQuery,
    fetchProvinces,
    provincesQuery,
    fetchCountries,
    countriesQuery,
    countrySelectValue,
    provinceSelectValue,
  };
};

export default useLocationService;
