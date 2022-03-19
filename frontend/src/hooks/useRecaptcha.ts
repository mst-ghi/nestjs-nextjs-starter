import { ReCaptchaInstance, load } from 'recaptcha-v3';
import { useEffect, useState } from 'react';
import { envs } from '@utils/constants';
import { RecaptchaStateType } from '@store/valtio/recaptcha';

const useRecaptcha = ({ state }: { state: RecaptchaStateType }) => {
  const [recaptcha, setRecaptcha] = useState<ReCaptchaInstance | null>(null);

  useEffect(() => {
    if (!recaptcha) {
      (async () => {
        try {
          const rc = await load(envs.recaptchaSiteKey);
          state.token = await rc.execute('login');
          setRecaptcha(rc);
        } catch (error) {
          setRecaptcha(null);
        }
      })();
    }
  }, [recaptcha]);

  const clearRecaptcha = () => {
    state.token = '';
  };

  return {
    ...state,
    recaptcha,
    clearRecaptcha,
  };
};

export default useRecaptcha;
