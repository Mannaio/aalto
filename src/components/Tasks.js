import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    listWrapper: {
        padding: '10px',
    },
    boxItemWrapper: {
        background: '#ffffff'
    },
    listItemWrapper: {
        marginTop: '15px',
    },
    childListSmall: {
        maxWidth: '25%'
    },
    childListLarge: {
        maxWidth: '50%'
    },
    childListCompleted: {
        maxWidth: '25%',
        display: 'flex',
        justifyContent: 'center'
    },
    divider: {
        height: '2px',
        background: '#00A0DF'
    }
}));


const Tasks = ({ tasks, loading }) => {

    const classes = useStyles();

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <List className={classes.listWrapper} >
            {tasks.map((task, index) => (
                <Box key={index} className={classes.boxItemWrapper} mb={1}>
                    <ListItem className={classes.listItemWrapper} key={index}>
                        <ListItemText className={classes.childListSmall}>{task.id}</ListItemText>
                        <ListItemText className={classes.childListLarge}>{task.title}</ListItemText>
                        <ListItemText className={classes.childListCompleted}>
                            {task.completed ? <CheckIcon color="primary" /> : <ClearIcon color="primary" />}
                        </ListItemText>
                    </ListItem>
                    <Divider className={classes.divider} />
                </Box>
            ))}
        </List>
    );
};

export default Tasks;