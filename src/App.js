import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tasks from './components/Tasks';
import SearchInput from './components/SearchInput';
import CheckBoxDropDown from './components/CheckBoxDropDown';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(() =>
  createStyles({
    boxContainer: {
      background: '#F4F4F4',
      padding: '10px'
    },
    paginationContainer: {
      display: 'flex',
      justifyContent: 'center'
    },
    resetFilters: {
      display: 'flex',
      justifyContent: 'center'
    },
    resetFiltersButton: {
      textTransform: 'none',
      textDecoration: 'underline'
    },
    filtersTitle: {
      fontSize: 28
    },
    listTitles: {
      fontWeight: 600
    },
    divider: {
      marginLeft: '12px',
      marginRight: '12px'
    }
  }),
);

function App() {

  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  // const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([tasks]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(10);
  // const [text, setText] = useState('');
  const [isCompleted, setIsCompleted] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos/');
      // setAllData(res.data);
      setTasks(res.data);
      setFilteredData(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const result = tasks.filter(
      ({ completed, title }) =>
        (!(typeof isCompleted === "boolean") || completed === !isCompleted) &&
        (!searchValue || title.search(searchValue) !== -1)
    );
    setFilteredData(result);
  }, [isCompleted, searchValue, tasks]);

  // Change page

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const getCompleted = (e, value) => {
    let switchValue = e.target.checked;
    setIsCompleted(!switchValue);
  };

  const handleFilterTasks = (e) => {
    let dropdownFilteredData = [];
    tasks.forEach((element) => {
      if (e.includes(element.id)) {
        console.log("found" + element.id);
        dropdownFilteredData.push(element);
      }
    });
    if (dropdownFilteredData.length > 0) {
      setFilteredData([]);
      setFilteredData(dropdownFilteredData);
    } else {
      setFilteredData(tasks);
    }
  };

  const resetFilters = () => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos/');
      setIsCompleted(null);
      setSearchValue('');
      setTasks(res.data);
      setFilteredData(res.data);
      setLoading(false);
    };
    fetchPosts();
  }

  // Get current tasks
  const getCurrentTasks = (tasks) => {
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    return tasks.slice(indexOfFirstTask, indexOfLastTask);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box mt={10}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box className={classes.boxContainer} component="div">
                <Typography color="primary" variant="h6" align="center" gutterBottom>FILTERS</Typography>
                <Box mt={5}>
                  <SearchInput value={searchValue} onSearchTypeChange={handleSearch} />
                </Box>
                <Box mt={5}>
                  <Typography className={classes.listTitles} align="left" variant="subtitle2" color="primary">COMPLETED</Typography>
                  <FormControl component="fieldset">
                    <FormControlLabel
                      control={<Switch onChange={getCompleted} color="primary" />}
                      labelPlacement="start"
                    />
                  </FormControl>
                </Box>
                <Box mt={3}>
                  <Typography className={classes.listTitles} align="left" variant="subtitle2" color="primary">SELECT USER ID</Typography>
                  <CheckBoxDropDown value={selected} onChange={handleFilterTasks} tasks={tasks} />
                </Box>
                <Box mt={5} className={classes.resetFilters} component="div">
                  <Button className={classes.resetFiltersButton} color="primary" onClick={resetFilters}>Reset Filters</Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box className={classes.boxContainer} component="div">
                <List>
                  <ListItem>
                    <ListItemText style={{ maxWidth: '25%' }}>
                      <Typography className={classes.listTitles} variant="subtitle2" color="primary">USERID</Typography>
                    </ListItemText>
                    <ListItemText style={{ maxWidth: '50%' }}>
                      <Typography className={classes.listTitles} variant="subtitle2" color="primary">TITLE</Typography>
                    </ListItemText>
                    <ListItemText style={{ maxWidth: '25%', display: 'flex', justifyContent: 'center' }}>
                      <Typography className={classes.listTitles} variant="subtitle2" color="primary">COMPLETED</Typography>
                    </ListItemText>
                  </ListItem>
                </List>
                <Divider className={classes.divider} />
                <Tasks tasks={getCurrentTasks(filteredData)} loading={loading} />
                <Pagination
                  className={classes.paginationContainer}
                  onChange={handlePageChange}
                  count={Math.ceil(filteredData.length / tasksPerPage)}
                  page={currentPage}
                  color="primary"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment >
  );
}

export default App;
