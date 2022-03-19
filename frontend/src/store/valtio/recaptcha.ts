import { proxy } from 'valtio';

export declare type RecaptchaStateType = {
  token: string;
};
const RecaptchaState = proxy({ token: '' });

export default RecaptchaState;
