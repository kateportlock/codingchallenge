import TextField from '@mui/material/TextField';
import styles from "../../styles/modules/SearchInput.module.scss";
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({ searchVal, setSearchVal, page }) => {

    return (
        <div className={`${styles.container} ${page === 'main' ? 'm-auto' : ''}`}>
            <TextField fullWidth value={searchVal} onChange={(e) => setSearchVal(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <SearchIcon />
                    )
                }} />
        </div>
    )
}

export default SearchInput;