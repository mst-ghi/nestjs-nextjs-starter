import {
  IoCamera,
  IoCameraOutline,
  IoCheckmark,
  IoCheckmarkDone,
  IoCheckmarkDoneOutline,
  IoCheckmarkOutline,
  IoClose,
  IoCloudUpload,
  IoCloudUploadOutline,
  IoLogOut,
  IoLogOutOutline,
  IoLogoFacebook,
  IoLogoGoogle,
  IoPerson,
  IoPersonCircle,
  IoPersonCircleOutline,
  IoPersonOutline,
  IoSettings,
  IoSettingsOutline,
  IoStar,
  IoStarHalf,
  IoStarOutline,
} from 'react-icons/io5';

const AllIcons = {
  // BaseHeader
  close: IoClose,
  star: IoStar,
  'star-outline': IoStarOutline,
  'star-half': IoStarHalf,
  settings: IoSettings,
  'settings-outline': IoSettingsOutline,
  'check-mark': IoCheckmark,
  'check-mark-outline': IoCheckmarkOutline,
  'check-mark-done': IoCheckmarkDone,
  'check-mark-done-outline': IoCheckmarkDoneOutline,

  camera: IoCamera,
  'camera-outline': IoCameraOutline,

  upload: IoCloudUpload,
  'upload-outline': IoCloudUploadOutline,

  // socials
  facebook: IoLogoFacebook,
  google: IoLogoGoogle,

  // auth
  logout: IoLogOut,
  'logout-outline': IoLogOutOutline,

  // person
  person: IoPerson,
  'person-outline': IoPersonOutline,
  'person-circle': IoPersonCircle,
  'person-circle-outline': IoPersonCircleOutline,
};

export type IconType = keyof typeof AllIcons;
export default AllIcons;
