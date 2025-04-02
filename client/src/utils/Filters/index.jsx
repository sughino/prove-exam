import Text from "../Text";
import { Select } from "../Select";
import './filters.css';
import { Icon } from "../Icon";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";

const filters = {
  Students: ['Serial', 'Name', 'Surname'],
  Courses: ['courseId', 'name', 'teacher'],
  Exams: ['examId', 'student', 'examDate', 'vote'],
}

export const Filters = ({tab, onSelect, onSearchedText, onSortBy, onFiltersBy}) => {

  const theme = useContext(ThemeContext);
  const [sortingDesc, setSortingDesc] = useState(false);
  const [typeOfSelected, setTypeOfSelected] = useState(1);
  const [searchedText, setSearchedText] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    onSelect(false);
    onSortBy(sortingDesc);
    onFiltersBy(selectedItem);
  }, []);

  useEffect(() => {
    onFiltersBy(selectedItem);
  }, [selectedItem])

  return (
    <div className="filters-main-container">

      <div className="filters-orderby-main">
        <Text variant={'subtitle'}>Order by</Text>
        <div className="filters-orderby-inputs">
            <Select selectElements={filters[tab]} onSelectedItems={setSelectedItem}/>
            <div className="sort-icon-container" onClick={() => {
                setSortingDesc(!sortingDesc);
                onSortBy(!sortingDesc);
              }}
            >
              <div className="icon-feedback-wrapper">
                <Icon name={sortingDesc ? 'arrow-up-a-z' : 'arrow-down-a-z'} size={22}/>
              </div>
            </div>
        </div>
      </div>


      <div className="filters-typeof-container">

        <div
          className="typeof-icon-container"
          style={{background: typeOfSelected === 0 ? theme.colors.white30 : theme.colors.white20}}
          onClick={() => {
            setTypeOfSelected(0);
            onSelect(true);
          }}
        >
          <div className="icon-feedback-wrapper">
            <Icon name={'menu'} size={22}/>
          </div>
        </div>

        <div
          className="typeof-icon-container"
          style={{background: typeOfSelected === 1 ? theme.colors.white30 : theme.colors.white20}}
          onClick={() => {
            setTypeOfSelected(1);
            onSelect(false);
          }}
        >
          <div className="icon-feedback-wrapper">
            <Icon name={'grid-2x2'} size={22}/>
          </div>
        </div>

      </div>


      <div className="filters-search-container">
          <input className="filters-search-input" type="text" 
            value={searchedText} onChange={(e) => {
              setSearchedText(e.currentTarget.value)
              onSearchedText(e.currentTarget.value);
            }}
            placeholder="Search"
          />
          <div className="icon-search-wrapper">
            <Icon name={'search'} size={22}/>
          </div>
      </div>

    </div>
  )
}