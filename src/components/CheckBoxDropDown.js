import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '95%'
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        }
    },
    getContentAnchorEl: null,
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "center"
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "center"
    },
    variant: "menu"
};

const CheckBoxDropDown = ({ tasks, onChange }) => {

    const classes = useStyles();
    const [selected, setSelected] = useState([]);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelected(value);
        onChange(value);
    };

    return (
        <FormControl className={classes.formControl}>
            <Select
                labelId="mutiple-select-label"
                multiple
                variant="outlined"
                value={selected}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
            >
                {tasks.map((task) => (
                    <MenuItem key={task.id} value={task.id}>
                        <ListItemIcon>
                            <Checkbox checked={selected.indexOf(task.id) > -1} />
                        </ListItemIcon>
                        <ListItemText primary={task.id} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

CheckBoxDropDown.defaultProps = {
    onChange: () => { }
}

CheckBoxDropDown.propTypes = {
    onChange: PropTypes.func,
}

export default CheckBoxDropDown;