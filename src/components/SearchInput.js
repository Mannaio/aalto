import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from '@material-ui/core/TextField';

const SearchInput = ({ onSearchTypeChange, value }) => {

    return (
        <TextField
            label="Search"
            type="search"
            value={value}
            variant="outlined"
            onChange={onSearchTypeChange}
            style={{ width: '95%' }}
            InputProps={{
                startAdornment: (
                    <InputAdornment>
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
};

SearchInput.defaultProps = {
    onSearchTypeChange: () => { },
}

SearchInput.propTypes = {
    onSearchTypeChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired

}

export default SearchInput;