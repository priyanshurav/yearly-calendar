import {
  createMuiTheme,
  IconButton,
  makeStyles,
  MuiThemeProvider,
  Paper,
  Tooltip,
} from '@material-ui/core';
import { Brightness4, Brightness7 } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '../../constants';
import { Theme } from '../../types';
import Calendar from '../Calendar/Calendar';

const usePaperStyles = makeStyles({
  root: {
    height: '100vh',
  },
});
const useThemeBtnStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const paperClasses = usePaperStyles();
  const themeBtnClasses = useThemeBtnStyles();
  const muiTheme = createMuiTheme({ palette: { type: theme } });
  useEffect(() => {
    const theme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    if (!theme) return;
    setTheme(JSON.parse(theme) as Theme);
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, JSON.stringify(theme));
  }, [theme]);
  return (
    <MuiThemeProvider theme={muiTheme}>
      <Paper classes={paperClasses} square>
        <Tooltip title="Toggle theme" arrow>
          <IconButton
            classes={themeBtnClasses}
            onClick={() =>
              setTheme((prevTheme) =>
                prevTheme === 'light' ? 'dark' : 'light'
              )
            }
          >
            {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
        <Calendar theme={theme} />
      </Paper>
    </MuiThemeProvider>
  );
}

export default App;
