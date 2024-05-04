import "./Searchbar.scss";

import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

export default function SearchBar({ inputHandler }) {
  return (
    <div className="search_bar">
      <form className="form">
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search using the student's name, school, maximum salary, subjects, etc..."
          className="input_base"
          onChange={inputHandler}
        />
        <div className="search_icon">
          <SearchIcon />
        </div>
      </form>
    </div>
  );
}
