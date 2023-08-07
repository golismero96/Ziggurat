import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  const theme = useTheme();
  const { t } = useTranslation(['crypto']);

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography
          component="h3"
          gutterBottom
          color={
            theme.palette.mode === 'dark'
              ? theme.colors.alpha.white[100]
              : theme.colors.alpha.black[100]
          }
          variant="h3"
        >
          <Trans i18nKey="userMessagesUnread" values={{ username: user.name }}>
            {t('Welcome.username')}
          </Trans>
        </Typography>
        <Typography
          component="h5"
          gutterBottom
          color={
            theme.palette.mode === 'dark'
              ? theme.colors.alpha.white[100]
              : theme.colors.alpha.black[100]
          }
          variant="h5"
        >
          <Trans i18nKey="userMessagesUnread">{t('Welcome.world')}</Trans>
        </Typography>
        <Typography
          variant="subtitle2"
          color={
            theme.palette.mode === 'dark'
              ? theme.colors.alpha.white[70]
              : theme.colors.alpha.black[70]
          }
        >
          Today is a good day to start trading crypto assets!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
