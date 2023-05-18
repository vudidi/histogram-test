import React from 'react';
import styles from './SelectMenu.module.scss';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const options = ['За последний месяц', 'За последний год'];

const SelectMenu = () => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  return (
    <FormControl variant="outlined" size="small" className={styles.select}>
      <button
        className={`${styles.select__icon} ${
          isMenuOpen
            ? `${styles.select__icon_type_up}`
            : `${styles.select__icon_type_down}`
        } `}
      ></button>
      <Select
        className={styles.select__input}
        displayEmpty
        defaultValue="За последний месяц"
        sx={{
          fontSize: '24px',
          borderRadius: '28px',
          border: '2px solid #000aff',
        }}
        onClose={() => {
          setMenuOpen(false);
        }}
        onOpen={() => {
          setMenuOpen(true);
        }}
      >
        {options.map((name) => (
          <MenuItem
            className={styles.select__item}
            key={name}
            value={name}
            sx={{
              fontSize: '24px',
            }}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectMenu;
