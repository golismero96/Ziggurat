import { useContext, useEffect, useMemo } from 'react';

import {
  Box,
  alpha,
  Stack,
  lighten,
  Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme,
  Toolbar,
  Typography,
  Direction,
  PaletteMode
} from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from 'src/contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import HeaderButtons from './Buttons';
import HeaderUserbox from './Userbox';
import HeaderMenu from './Menu';

import { useTranslation } from 'react-i18next';
import { useThemeMode } from 'src/theme/ThemeContext';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background, 0.15)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();
  const { i18n } = useTranslation();

  const { setThemeMode, setLanguage } = useThemeMode();
  const switchMode = (_mode: PaletteMode) => {
    setThemeMode(_mode);
  };

  const setThemeName = (direction: Direction) => {
    if (direction === 'ltr') {
      setLanguage('en');
      i18n.changeLanguage('en');
    } else {
      setLanguage('fa');
      i18n.changeLanguage('fa');
    }
  };

  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 1px 0 ${alpha(
                lighten(theme.colors.primary.main, 0.7),
                0.15
              )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(
                theme.colors.alpha.black[100],
                0.2
              )}, 0px 5px 22px -4px ${alpha(
                theme.colors.alpha.black[100],
                0.1
              )}`
      }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        spacing={2}
      >
        <HeaderMenu />
      </Stack>
      <Box display="flex" alignItems="center">
        <HeaderButtons />
        <HeaderUserbox />
        <Box
          component="span"
          sx={{
            ml: 2,
            display: { lg: 'none', xs: 'inline-block' }
          }}
        >
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? (
                <MenuTwoToneIcon fontSize="small" />
              ) : (
                <CloseTwoToneIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>

        <Toolbar sx={{ height: 80, marginTop: '10px' }}>
          <IconButton
            sx={{ fontSize: '1rem' }}
            onClick={() => {
              const newMode = theme.palette.mode === 'dark' ? 'light' : 'dark';
              switchMode(newMode);
              theme.palette.mode = newMode;
            }}
            color="inherit"
            disableTouchRipple
            disableRipple
          >
            {theme.palette.mode === 'dark' ? (
              <span role="img" aria-label="sun">
                Go Light ☀️
              </span>
            ) : (
              <span role="img" aria-label="moon">
                Go Dark 🌚
              </span>
            )}
          </IconButton>
        </Toolbar>

        <button onClick={() => setThemeName('rtl')}>RTL</button>
        <button onClick={() => setThemeName('ltr')}>LTR</button>
        <div className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fa">Persian</option>
              </select>
            </div>
          </div>
        </div>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
