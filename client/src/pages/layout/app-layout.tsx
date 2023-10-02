import { Outlet } from 'react-router-dom';
import { Header } from '../../shared/components';
import { Box } from '@chakra-ui/react';

export const MainLayout: React.FC = () => {
  return (
    <Box
      height={'full'}
    >
      <Header />
      <Box
        height={'full'}
      >
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}