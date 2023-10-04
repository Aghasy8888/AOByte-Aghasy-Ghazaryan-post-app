import React, { memo } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { sortOptions } from './sortOptions';
import styles from './SortStyle.module.css';

function Sort(props) {
  const { sort, handleSort, isDisabled} = props;

  return (
    <DropdownButton
      disabled={isDisabled}
      className={styles.dropdownButton}
      variant='secondary'
      title={sort.value ? sort.label : 'Sort'}
      id='sort'
    >
      {sortOptions.map((option, index) => (
        <Dropdown.Item
          key={index}
          active={sort.value === option.value}
          onClick={() => handleSort(option)}
        >
          {option.label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  )
}

export default memo(Sort);
