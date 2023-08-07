import { useEffect } from 'react';
import NProgress from 'nprogress';
import { Box, CircularProgress, useTheme } from '@mui/material';

function SuspenseLoader() {
  const theme = useTheme();
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        background:
          theme.palette.mode === 'dark'
            ? theme.colors.alpha.black[100]
            : theme.colors.alpha.white[10]
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={64} disableShrink thickness={3} />
    </Box>
  );
}

export default SuspenseLoader;
