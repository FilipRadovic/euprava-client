// component
import SvgColor from '../../../components/svg-color';
import {useSelector} from "react-redux";
import {selectUser} from "../../../app/auth";

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

export const useNavigation = () => {
  const user = useSelector(selectUser);
  if (user.role === 'ADMIN') {
    return ADMIN_NAV_CONFIG;
  } else {
    return USER_NAV_CONFIG;
  }
}

const ADMIN_NAV_CONFIG = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'users',
    path: '/dashboard/users',
    icon: icon('ic_user'),
  },
  {
    title: 'registrations',
    path: '/dashboard/registrations',
    icon: icon('ic_lock')
  }
];

const USER_NAV_CONFIG = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  }
]

export default ADMIN_NAV_CONFIG;
