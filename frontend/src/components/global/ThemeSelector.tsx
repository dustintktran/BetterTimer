import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

interface ThemeSelectorProps {
  setActiveTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeSelector = ({ setActiveTheme }: ThemeSelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeTheme = (theme: string) => () => {
    handleClose();
    setActiveTheme(theme);
  };
  return (
    <>
      <Button onClick={handleClick}>Choose Theme</Button>
      <Menu
        id='dropdown-menu'
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleChangeTheme('nordic')}>Nordic</MenuItem>
        <MenuItem onClick={handleChangeTheme('desert')}>Desert</MenuItem>
        <MenuItem onClick={handleChangeTheme('midnight')}>Midnight</MenuItem>
      </Menu>
    </>
  );
};

export default ThemeSelector;
