import { useEffect, useState } from 'react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { getUser } from '@/action/user.action';
import ShowError from '@/components/ShowError';
import USER_TYPE from '@/constants/enum';

export default function useAppMenu() {
  const [appMenu, setAppMenu] = useState<any[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await getUser();

      if ('error' in response) {
        return <ShowError {...response} />;
      }

      const AdminMenu = [
        {
          icon: DashboardOutlinedIcon,
          name: 'Dashboard',
          url: '/dashboard',
        },
        {
          icon: NewspaperIcon,
          name: 'Programme',
          url: '/dashboard/programme',
        },
        {
          icon: DynamicFeedIcon,
          name: 'Batch',
          url: '/dashboard/batch',
        },
        {
          icon: AccountCircleOutlinedIcon,
          name: 'User',
          url: '/dashboard/user',
        },
      ];
      const UserMenu = [
        {
          icon: DynamicFeedIcon,
          name: 'Batch',
          url: '/dashboard/batch',
        },
      ];

      const SupervisorMenu = [
        {
          icon: DashboardOutlinedIcon,
          name: 'Dashboard',
          url: '/dashboard',
        },
        ...UserMenu,
      ];

      if (response.data.roleid === USER_TYPE.Admin) {
        setAppMenu(AdminMenu);
      } else if (response.data.roleid === USER_TYPE.Supervisor) {
        setAppMenu(SupervisorMenu);
      } else {
        setAppMenu(UserMenu);
      }
    };

    fetchMenu();
  }, []);

  return appMenu;
}
