import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import {useMemo, useState} from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import {useUsers} from "../hooks/useUsers.ts";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'jmbg', label: 'JMBG', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false }
];

// ----------------------------------------------------------------------

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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UsersPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [size, setSize] = useState(10);

  const { page: users_page, isError, isLoading } = useUsers(page, size);

  const sortedPage = useMemo(() => {
    if (!users_page) return;

    const sorted = [...users_page.data];
    sorted.sort((first, second) => {
      const name1 = first.firstname + first.lastname;
      const name2 = second.firstname + second.lastname;
      if (order === 'asc') {
        return name1 > name2 ? 1 : -1;
      } else {
        return name1 > name2 ? -1 : 1;
      }
    })

    return {
      ...users_page,
      data: sorted
    }
  }, [users_page, order, orderBy]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy('name');
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setSize(parseInt(event.target.value, 10));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * size - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;


  return (
    <>
      <Helmet>
        <title> Users | eUprava </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            System users
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        </Stack>

        <Card>
          {users_page && (
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={users_page.total}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {sortedPage.data.map((user) => {
                        const { id, firstname, lastname, email, jmbg, role } = user;

                        return (
                            <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={false}>
                              <TableCell component="th" scope="row" padding="none" align="center">
                                <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                                  <Avatar alt="name" src="/assets/images/avatars/avatar_default.jpg" />
                                  <Typography variant="subtitle2" noWrap>
                                    {firstname} {lastname}
                                  </Typography>
                                </Stack>
                              </TableCell>

                              <TableCell align="center">{email}</TableCell>

                              <TableCell align="center">{jmbg}</TableCell>

                              <TableCell align="center">
                                <Label color={(role === 'ADMIN' && 'error') || 'success'}>{sentenceCase(role)}</Label>
                              </TableCell>

                              {/*<TableCell align="left">*/}
                              {/*  <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>*/}
                              {/*</TableCell>*/}
                            </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                      )}
                    </TableBody>

                    {isNotFound && (
                        <TableBody>
                          <TableRow>
                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                              <Paper
                                  sx={{
                                    textAlign: 'center',
                                  }}
                              >
                                <Typography variant="h6" paragraph>
                                  Not found
                                </Typography>

                                <Typography variant="body2">
                                  No results found for &nbsp;
                                  <strong>&quot;{filterName}&quot;</strong>.
                                  <br /> Try checking for typos or using complete words.
                                </Typography>
                              </Paper>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>
          )}
          {isLoading && (
              <Typography>Loading system users...</Typography>
          )}
          {users_page && (
              <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={users_page.total}
                  rowsPerPage={size}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
              />
          )}
        </Card>
      </Container>
    </>
  );
}
