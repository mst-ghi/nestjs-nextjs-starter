import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { PutRequest } from '@utils/axios';
import { ProfileFormType, SchemaProfile } from '@utils/schema';
import useAlert from '@hooks/useAlert';
import useAuth from '@hooks/useAuth';
import useCommonService from '@hooks/useCommonService';
import useJoiForm from '@hooks/useJoiForm';
import useLocationService from '@hooks/useLocation';
import PageContent from '@components/organisms/pageContent';
import UploaderDialog from '@components/molecules/uploaderDialog';
import Avatar from '@components/atoms/avatar';
import Badge from '@components/atoms/badge';
import Button from '@components/atoms/button';
import Card, { CardBody, CardHeader } from '@components/atoms/card';
import Icon from '@components/atoms/icon';
import SelectInput from '@components/atoms/selectInput';
import Spinner from '@components/atoms/spinner';
import TextInput from '@components/atoms/textInput';
import Textarea from '@components/atoms/textarea';

const Profile = () => {
  const { user, fetchUserReq } = useAuth();
  const { showToast } = useAlert();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setErrors,
    reset,
  } = useJoiForm<ProfileFormType>({
    schema: SchemaProfile,
  });

  const [selectedCountry, setSelectedCountry] = useState<number | undefined>();
  const { countriesQuery, provincesQuery, countrySelectValue, provinceSelectValue } =
    useLocationService({
      enabledCounties: true,
      initialCountryId: selectedCountry,
    });
  const { tagsQuery, languagesQuery, languagesSelectValue, tagsSelectValue } = useCommonService();

  const [isShowUploader, setIsShowUploader] = useState(false);

  useEffect(() => {
    if (user.profile?.country_id) {
      setSelectedCountry(user.profile?.country_id);
    }
    if (user.profile) {
      reset({
        country_id: user.profile?.country_id,
        province_id: user.profile?.province_id,
        city: user.profile?.city,
        title: user.profile?.title,
        spoken_langs: user.profile?.spoken_langs,
        tags: user.profile?.tags,
        about: user.profile?.about,
      });
    }
  }, [user.profile]);

  const onSubmit = async (body: ProfileFormType) => {
    PutRequest({ url: '/v1/profile', body })
      .then(() => {
        fetchUserReq();
        showToast('success', 'Profile successfully updated');
      })
      .catch((error) => {
        setErrors(error);
      });
  };

  return (
    <PageContent title={user.full_name || 'Profile'}>
      <Card className="p-4 md:p-8">
        <CardHeader>
          <div className="flex flex-row space-x-4">
            <div className="h-24 w-24 relative">
              <Avatar
                square
                className="h-24 w-24 rounded-xl"
                placeholder={user.full_name}
                letterClass="text-3xl"
              />
              <div
                className="absolute top-0 bg-transparent hover:bg-gray-50 opacity-60 w-full h-full rounded-sm flex justify-end items-end p-1 cursor-pointer"
                onClick={() => {
                  setIsShowUploader(!isShowUploader);
                }}
              >
                <Icon name="camera-outline" color="gray" size={25} />
              </div>
              <UploaderDialog
                open={isShowUploader}
                onCLose={() => {
                  setIsShowUploader(false);
                }}
              />
            </div>

            <div className="flex flex-col space-y-2 items-start justify-center">
              <span className="text-xl font-bold text-gray-700">{user.full_name}</span>
              <span className="text-base font-bold text-gray-600">{user.email}</span>

              <span className="text-base text-gray-500">
                Join us:
                <span className="font-medium text-sm ml-1">
                  {dayjs(user.created_at).format('ddd DD, MMM YYYY')}
                </span>
              </span>
            </div>
          </div>
          <div className="flex flex-row flex-wrap justify-center md:justify-start pt-3 px-1">
            <span className="text-base text-gray-500 mr-1">Roles:</span>
            {user.roles?.map((role) => {
              return (
                <Badge key={`role-${role.key}`} color="info" className="mr-1 mb-1 py-3">
                  {role.title}
                </Badge>
              );
            })}
          </div>
        </CardHeader>

        <CardBody className="pt-2 px-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col md:w-1/2 md:px-8">
                <div className="divider">Introduction</div>

                <TextInput
                  {...register('title')}
                  defaultValue={user.profile?.title}
                  placeholder="Enter your title"
                  label="Title"
                  error={errors}
                />

                <Textarea
                  {...register('about')}
                  defaultValue={user.profile?.about}
                  placeholder="Enter your about"
                  label="About"
                  error={errors}
                  rows={11}
                />
              </div>

              <div className="flex flex-col md:w-1/2 md:px-8">
                <div className="divider">Location</div>

                <SelectInput
                  control={control}
                  name="country_id"
                  placeholder="Select your country"
                  label="Country"
                  error={errors}
                  defaultValue={countrySelectValue(user.profile?.country)}
                  options={countriesQuery.data?.map((country) => countrySelectValue(country))}
                  onSelect={(selected) => {
                    setSelectedCountry(selected.value);
                  }}
                />

                <SelectInput
                  control={control}
                  name="province_id"
                  placeholder="Select your province"
                  label="Province"
                  error={errors}
                  defaultValue={provinceSelectValue(user.profile?.province)}
                  options={provincesQuery.data?.map((province) => provinceSelectValue(province))}
                />

                <TextInput
                  {...register('city')}
                  defaultValue={user.profile?.city}
                  placeholder="Enter your city"
                  label="City"
                  error={errors}
                />

                <div className="divider">Extra</div>

                <SelectInput
                  control={control}
                  name="spoken_langs"
                  isMulti
                  placeholder="Select your spoken languages"
                  label="Spoken languages"
                  error={errors}
                  defaultValue={user.profile?.spoken_langs.map((language) => {
                    return { value: language, label: language };
                  })}
                  options={languagesQuery.data?.map((language) => languagesSelectValue(language))}
                />

                <SelectInput
                  control={control}
                  name="tags"
                  isMulti
                  placeholder="Select your skills"
                  label="Skills"
                  error={errors}
                  defaultValue={user.profile?.tags.map((tag) => {
                    return { value: tag, label: tag };
                  })}
                  options={tagsQuery.data?.map((tag) => tagsSelectValue(tag))}
                />
              </div>
            </div>

            <div className="flex flex-row px-8 pt-4">
              <Button
                type="submit"
                wide
                className="mt-4"
                color="primary"
                icon={{ name: 'check-mark-done', size: 36 }}
                disabled={!isDirty}
              >
                {isSubmitting && <Spinner />}
                <span>Update Profile</span>
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </PageContent>
  );
};

export default Profile;
