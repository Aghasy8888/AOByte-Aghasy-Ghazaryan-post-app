import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { InputGroup, Form, Button, Modal, DropdownButton, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { getPosts } from "../../store/actions/post/postActions";
import { categoryOptions, dateOptions } from "./filterOptions";
import { sortOptions } from "./sortOptions";
import { SET_SEARCH, SET_SEARCH_DATA } from "../../store/actions/post/postActionTypes";

import styles from "./SearchStyle.module.css";
import useInnerWidth from "../../hooks/useInnerWidth";

function Search({onlyOwnerPosts}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState({
    label: "",
    value: "",
  });
  const [category, setCategory] = useState({
    label: "",
    value: "",
  });
  const [sort, setSort] = useState({
    label: '',
    value: ''
});

const windowWidth = useInnerWidth();

  const handleSubmit = () => {
    setShowModal(false);
    
    const searchData = {
      search,
      date: date.value,
      category: category.value,
      sort: sort.value,
    };

    dispatch(getPosts(navigate, searchData, onlyOwnerPosts));
    dispatch({type: SET_SEARCH, search});
    dispatch({type: SET_SEARCH_DATA, searchData});
  };
  

  return (
    <div className={styles.searchContainer}>
      <InputGroup className={styles.inputGroup}>
        <Form.Control
          className={styles.formControl}
          placeholder="Search..."
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
        />

        <Button
          className={styles.search}
          variant="outline-primary"
          onClick={handleSubmit}
        >
         {windowWidth < 720 ? <FontAwesomeIcon icon={faSearch} /> : "Search" }
        </Button>

        <Button
          className={styles.search}
          variant="outline-primary"
          onClick={() => setShowModal(true)}
        >
          {windowWidth < 720 ? <FontAwesomeIcon icon={faFilter} /> : "Filters" }
          
        </Button>
      </InputGroup>

      {showModal && (
        <div
          className={`${styles.modal} ${styles.show} ${styles.filterModal}`}
        >
          <Modal.Dialog>
            <div className={styles.titleAndXButton}>
              <Modal.Header className={styles.title}>
                <Modal.Title>Search filters</Modal.Title>
              </Modal.Header>

              <Button variant="secondary" onClick={() => setShowModal(false)}>
                X
              </Button>
            </div>
            <hr />
            <div className={styles.dropDowns}>

                <DropdownButton
                  className={styles.dropdownButton}
                  variant="primary"
                  title={category.value ? category.label : "Category"}
                  id="category"
                >
                  {categoryOptions.map((option, index) => (
                    <Dropdown.Item
                      className={styles.dropdownItem}
                      key={index}
                      active={category.value === option.value}
                      onClick={() => setCategory(option)}
                    >
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
                
                <DropdownButton
                  className={styles.dropdownButton}
                  variant="primary"
                  title={date.value ? date.label : "Date"}
                  id="date"
                >
                  {dateOptions.map((option, index) => (
                    <Dropdown.Item
                      className={styles.dropdownItem}
                      key={index}
                      active={date.value === option.value}
                      onClick={() => setDate(option)}
                    >
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>

                <DropdownButton
                  className={styles.dropdownButton}
                  variant="primary"
                  title={sort.value ? sort.label : "Sort by"}
                  id="sort"
                >
                  {sortOptions.map((option, index) => (
                    <Dropdown.Item
                      className={styles.dropdownItem}
                      key={index}
                      active={sort.value === option.value}
                      onClick={() => setSort(option)}
                    >
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>

            </div>

            <Modal.Footer>
              <Button
                className={styles.submitBtn}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
    </div>
  );
}

export default memo(Search);
