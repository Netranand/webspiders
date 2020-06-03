import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { connect } from 'react-redux';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import { deleteUserAction, editUserAction } from '../../actions/users/newUserAction';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';



function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'user_name', label: 'User Name' },
  { id: 'contact_no', label: 'Contact No.' },
  { id: 'address', label: 'Address' },
 
  { id: 'action', label: 'Action' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            //align={headCell.numeric ? 'right' : 'left'}
            //padding={headCell.disablePadding ? false : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Materials
          </Typography>
        )}

      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = ((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

class AllUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      userId: '',
      editIndex: -1,
      open1: false,
      delIndex: -1,
      user_name: '',
      contact_no: '',
      address: '',
      search: '',
      selectedTime: new Date(),
      selectedDate: new Date(),
      order: 'asc',
      orderBy: 'user_name',
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5

    }
  }

  //=============================================//

  handleDateChange = (date) => {
    this.setState({ selectedDate: date })
  }

  handleTimeChange = (time) => {
    this.setState({ selectedTime: time })
  }


  componentDidMount() {
    axios.get(`/newusers`)
      .then(res => {
        const rows = res.data;
        this.setState({ rows });
      })
  }
  componentDidUpdate() {
    axios.get(`/newusers`)
      .then(res => {
        const rows = res.data;
        this.setState({ rows });
      })
  }


  handleClose = () => {
    this.setState({
      open: false,
      open1: false,
      open2: false,
    });
  };

  handleClickEdit = (user_name, contact_no, address, userId, index) => {
    this.setState({
      open1: true,
      user_name: user_name,
      contact_no: contact_no,
      address: address,
     
      userId: userId,
      editIndex: index,
    });
  };

  handleInputChangeValue = (event) => {
    let nam = event ? event.target.name : event;
    let val = event ? event.target.value : event;
    console.log(nam, ":", val);
    this.setState({ [nam]: val });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const { editUserAction } = this.props;
    let editUser = {

      user_name: this.state.user_name,
      contact_no: this.state.contact_no,
      address: this.state.address,
    
      userId: this.state.userId
    }


    editUserAction(editUser);
    //this.resetField();
    this.handleClose();
  }


  handleClickDelete = (id, index) => {
    this.setState({
      open2: true,
      userId: id,
      delIndex: index,
    });
  }

  handleDelete = (e) => {
    e.preventDefault();
    let deleteUser = {
      userId: this.state.userId
    }

    this.setState((prevState) => ({
      rows: prevState.rows.filter((_, i) => i !== this.state.delIndex)
      //rows:rows.filter(row=>row.id !== this.state.userId)  
    }));
    const { deleteUserAction } = this.props;
    deleteUserAction(deleteUser);
    this.handleClose();
  }

  //=============================================//


  handleRequestSort = (event, property) => {
    const { orderBy, order } = this.state;
    const isAsc = orderBy === property && order === 'asc';

    this.setState({
      order: isAsc ? 'desc' : 'asc',
      orderBy: property
    })


  };

  handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = this.state.rows.map((n) => n.user_name);

      this.setState({
        selected: newSelecteds
      })
      return;
    }

    this.setState({
      selected: []
    })
  };

  handleClick = (event, user_name) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(user_name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, user_name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }


    this.setState({
      selected: newSelected
    })
  };

  handleChangePage = (event, newPage) => {

    this.setState({
      page: newPage
    })
  };

  handleChangeRowsPerPage = (event) => {

    this.setState({
      rowsPerPage: parseInt(event.target.value, 10)
    })

    this.setState({
      page: 0
    })
  };

  handleChangeDense = (event) => {

    this.setState({
      dense: event.target.checked
    })
  };

  render() {

    const { classes } = this.props;
    const { dense, page, order, orderBy, selected, rows, rowsPerPage, user_name } = this.state;
    const isSelected = (user_name) => selected.indexOf(user_name) !== -1;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);




    const { open1, open2, search, selectedDate } = this.state;

    const stylesForm = {
      display: 'flex',
      flexWrap: 'wrap',
    };

    const stylesBotton = {
      marginTop: 20
    };

    const styles1 = {
      textAlign: 'center',
      paddingTop: '2',
    };

    const textfieldHeight = {
      width: 300,
      height: 50,
      marginLeft: 4,
      marginRight: 4,
      marginTop: 5,
    };

    const textfieldAmount = {
      width: 100,
      height: 40,
      marginLeft: 2,
      marginRight: 2,
      marginTop: 2,
      marginBottom: 15,
    };


    return (
      <div><div>
        <Dialog
          open={open2}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description" >
          <DialogTitle id="alert-dialog-title">{"Are sure , want to delete user?"}</DialogTitle>
          <DialogContent>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
                        </Button>
            <Button onClick={this.handleDelete} color="primary" autoFocus>
              Agree
                        </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={open1} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update User</DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
            <form className="reg" noValidate style={stylesForm}>

              <Typography variant="h5" gutterBottom paragraph>
                User Details
                            </Typography>

              <div style={stylesForm}>

                <div>
                  <TextField style={textfieldHeight}
                    variant="outlined"
                    margin="dense"
                    required

                    id="user_name"
                    label="User Name"
                    name="user_name"
                    value={this.state.user_name}
                    onChange={(ev) => this.handleInputChangeValue(ev)}
                  />
                </div>
                <div>
                  <TextField style={textfieldHeight}
                    variant="outlined"
                    margin="dense"
                    required
                    id="contact_no"
                    label="Contact No."
                    name="contact_no"
                    value={this.state.contact_no}
                    onChange={(ev) => this.handleInputChangeValue(ev)}
                  />
                </div>
                <div>
                  <TextField style={textfieldHeight}
                    variant="outlined"
                    margin="dense"
                    required

                    name="address"
                    label="Address"
                    id="address"
                    value={this.state.address}
                    onChange={(ev) => this.handleInputChangeValue(ev)}
                  />
                </div>
               

              </div>


              
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
                        </Button>
            <Button type="submit" onClick={this.handleSubmit} color="primary">
              Edit
                        </Button>
          </DialogActions>
        </Dialog>
      </div>
        <div className={classes.root}>
          <Paper className={classes.paper}>

            <br />



            <TextField style={textfieldHeight}
              variant="outlined"
              margin="dense"

              id="search"
              label="Search"
              name="search"
              value={this.state.search}
              onChange={(ev) => this.handleInputChangeValue(ev)}
            />

            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.user_name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      if (search !== "" && (row.user_name.toLowerCase().indexOf(search.toLowerCase()) && row.contact_no.toLowerCase().indexOf(search.toLowerCase()) && row.address.toLowerCase().indexOf(search.toLowerCase())) === -1) {
                        return null
                      }

                      return (
                        <TableRow
                          hover
                         onClick={(event) => this.handleClick(event, row.user_name)}
                         role="checkbox"
                         aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.user_name}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </TableCell>
                          <TableCell align="left">
                            {row.user_name}
                          </TableCell>
                          <TableCell align="left">{row.contact_no}</TableCell>
                          <TableCell align="left">{row.address}</TableCell>
                          
                          <TableCell align="left">
                            <IconButton aria-label="delete" >
                              <DeleteIcon fontSize="small" onClick={(e) => this.handleClickDelete(row._id, index)} />
                            </IconButton>
                            <IconButton aria-label="delete">
                              <EditIcon fontSize="small" onClick={(e) => this.handleClickEdit(row.user_name, row.contact_no, row.address,row._id, index)} />
                            </IconButton>

                          </TableCell>

                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={this.handleChangeDense} />}
            label="Dense padding"
          />
        </div></div>
    );
  }
}

AllUserList.propTypes = {
  //auth: PropTypes.object.isRequired,
  editUserAction: PropTypes.func.isRequired,
  deleteUserAction: PropTypes.func.isRequired
};


export default compose(withStyles(useStyles), connect(null, { editUserAction, deleteUserAction }))(AllUserList);