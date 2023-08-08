import { useEffect } from 'react';
import NProgress from 'nprogress';
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';

function SuspenseLoader() {
  const theme = useTheme();
  const { t } = useTranslation();
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
            : theme.colors.alpha.white[100]
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Stack sx={{ alignItems: 'center' }} spacing={2}>
        <CircularProgress size={60} disableShrink thickness={3} />
        <Typography
          sx={{
            mt: 5
          }}
          variant="h5"
        >
          {t('loading')}
        </Typography>
      </Stack>
    </Box>
  );
}

export default SuspenseLoader;
