import { RiDashboardFill } from 'react-icons/ri';
import { TbTransactionRupee } from 'react-icons/tb';
import { BsFillFileTextFill } from 'react-icons/bs';
import { HiMiniBanknotes } from 'react-icons/hi2';

export const links = [
  {
    title: 'Dashboard',
    icon: RiDashboardFill,
    to: '/user/dashboard',
  },
  {
    title: 'Transactions',
    icon: TbTransactionRupee,
    to: '/user/transactions',
  },
  {
    title: 'Reports',
    icon: BsFillFileTextFill,
    to: '/user/reports',
  },
  {
    title: 'Denominations',
    icon: HiMiniBanknotes,
    to: '/user/denominations',
  },
];
