import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import useAlert from '@hooks/useAlert';
import useApp from '@hooks/useApp';
import useAuth from '@hooks/useAuth';
import Avatar from '@components/atoms/avatar';
import Button from '@components/atoms/button';
import Dropdown from '@components/atoms/dropdown';
import Icon from '@components/atoms/icon';

const links = [
  { to: '/', title: 'Home' },
  { to: '/peoples', title: 'Peoples' },
];

const BaseHeaderComponent = () => {
  const { getConfirm } = useAlert();
  const { setIsShowSettingDialog } = useApp();
  const { isGuest, user, logout } = useAuth();

  return (
    <div className="w-full md:px-4 md:py-3">
      <div className="navbar bg-base-100 md:rounded-2xl rounded-b-2xl shadow-md">
        <div className="flex-1">
          <div className="mt-2 flex flex-row">
            <Link href="/">
              <a>
                <Image src="/images/logo.png" height={40} width={120} alt="logo" />
              </a>
            </Link>

            <div className="hidden md:block ml-4">
              <div className={['flex flex-row justify-start items-center'].join(' ')}>
                {links.map((link) => {
                  return (
                    <Link href={link.to} key={link.to}>
                      <a
                        className={[
                          'z-10 cursor-pointer p-2 mr-4 rounded-lg font-medium text-gray-600',
                        ].join(' ')}
                      >
                        {link.title}
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-none gap-2">
          <div className="flex flex-row justify-end mr-2">
            {isGuest && (
              <Button href="/signin" color="info" className="border-2 border-gray-100 h-10">
                <span className="mx-1 font-medium">Sign in</span>
              </Button>
            )}

            {user && user.id && (
              <Dropdown
                end
                width="w-48"
                button={
                  <Avatar className="w-10 h-10 mr-1 rounded-lg" placeholder={user.full_name} />
                }
              >
                <div className="flex flex-row px-2 justify-start items-center space-x-2">
                  <Avatar
                    className="w-8 h-8"
                    square
                    letterClass="text-sm"
                    placeholder={user.full_name}
                  />
                  <span className="font-medium text-sm">{user.full_name}</span>
                </div>
                <div className="divider my-0"></div>
                <li>
                  <Link href="/profile">
                    <a className="flex flex-row justify-start items-center">
                      <Icon name="person-outline" color="black" size={22} />
                      <span className="font-medium text-sm">Profile</span>
                    </a>
                  </Link>
                </li>
                <li
                  onClick={() => {
                    getConfirm({ title: 'Logout', message: 'Are you sure to logout?' }).then(() => {
                      logout();
                    });
                  }}
                >
                  <div className="flex flex-row justify-start items-center">
                    <Icon name="logout-outline" color="black" size={22} />
                    <span className="font-medium text-sm">Logout</span>
                  </div>
                </li>
              </Dropdown>
            )}

            <Button
              square
              icon={{ name: 'settings-outline', color: 'gray', size: 26 }}
              glass
              className="h-9 w-9 ml-2 mt-0.5"
              onClick={() => setIsShowSettingDialog(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const BaseHeader = dynamic(() => Promise.resolve(BaseHeaderComponent), {
  ssr: false, // true or false
});

export default BaseHeader;
