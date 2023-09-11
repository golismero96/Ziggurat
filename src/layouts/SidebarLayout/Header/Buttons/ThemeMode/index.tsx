import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, PaletteMode, useTheme } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { useThemeMode } from 'src/theme/ThemeContext';

const HeaderThemeMode = () => {
  const theme = useTheme();

  const { setThemeMode } = useThemeMode();

  const changeThemeMode = () => {
    const newMode = theme.palette.mode === 'dark' ? 'light' : 'dark';
    setThemeMode(newMode);
  };
  return (
    <IconButton color="primary" onClick={changeThemeMode}>
      {theme.palette.mode === 'dark' ? <WbSunnyIcon /> : <NightsStayIcon />}
    </IconButton>
  );
};

export default HeaderThemeMode;
