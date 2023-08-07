import { FC, ReactNode } from 'react';
import { Box, alpha, darken, lighten, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';
import Footer from 'src/components/Footer';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: '100%',
          '.MuiPageTitle-wrapper': {
            color:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.white[100]
                : theme.colors.alpha.black[70],
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 1px 0 ${alpha(
                    lighten(theme.colors.primary.main, 0.7),
                    0.15
                  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                    theme.colors.alpha.black[100],
                    0.1
                  )}, 0px 5px 12px -4px ${alpha(
                    theme.colors.alpha.black[100],
                    0.05
                  )}`
          },
          '.MuiCard-root': {
            color:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.white[100]
                : theme.colors.alpha.black[100],
            background:
              theme.palette.mode === 'dark'
                ? alpha(theme.colors.alpha.trueWhite[5], 0.06)
                : theme.colors.alpha.white[50]
          }
        }}
      >
        <Header />
        <Sidebar />
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            pt: `${theme.header.height}`,
            [theme.breakpoints.up('lg')]: {
              ml: `${theme.sidebar.width}`
            },
            background:
              theme.palette.mode === 'dark'
                ? darken(theme.colors.alpha.black[100], 0.4)
                : theme.colors.alpha.white[50]
          }}
        >
          <Box display="block">
            <Outlet />
            <Footer />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SidebarLayout;
