import { Helmet } from 'react-helmet-async';
import {filter, upperCase} from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
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
import {useRegistrations} from "../hooks/useRegistrations";
import {useApproveMutation} from "../hooks/useApproveMutation";
import {useRejectMutation} from "../hooks/useRejectMutation";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'jmbg', label: 'JMBG', alignRight: false },
    { id: 'city', label: 'City', alignRight: false },
    { id: 'document', label: 'Document', alignRight: false },
    { id: 'actions', label: 'Actions', alignRight: false }
];

export default function RegistrationsPage() {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [size, setSize] = useState(10);

    const { page: registrations_page, isError, isLoading } = useRegistrations(page, size);

    const { mutateAsync: approve } = useApproveMutation();
    const { mutateAsync: reject } = useRejectMutation();

    const onApproveRegistration = async (id) => {
        try {
            await approve(id);
            alert('Registration approved');
        } catch (error) {
            alert('Something went wrong, please try again later');
        }
    }

    const onRejectRegistration = async (id) => {
        try {
            await reject(id);
            alert('Registration rejected');
        } catch (error) {
            alert('Something went wrong, please try again later');
        }
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setSize(parseInt(event.target.value, 10));
    };

    return (
        <>
            <Helmet>
                <title> Registrations | eUprava </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Registrations
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Registration
                    </Button>
                </Stack>

                <Card>
                    {registrations_page && (
                        <Scrollbar>
                            <TableContainer sx={{ minWidth: 800 }}>
                                <Table>
                                    <UserListHead
                                        order={order}
                                        orderBy={orderBy}
                                        headLabel={TABLE_HEAD}
                                        rowCount={registrations_page.total}
                                        numSelected={selected.length}
                                        onRequestSort={handleRequestSort}
                                        onSelectAllClick={() => {}}
                                    />
                                    <TableBody>
                                        {registrations_page.data.map((user) => {
                                            const { id, firstname, lastname, email, jmbg, status, city, document } = user;

                                            let statusColor;
                                            switch(status) {
                                                case 'PENDING':
                                                    statusColor = 'warning';
                                                    break;
                                                case 'APPROVED':
                                                    statusColor = 'success';
                                                    break;
                                                case 'REJECTED':
                                                    statusColor = 'error';
                                                    break;
                                            }

                                            let documentInformation = 'N/A';
                                            if (document) {
                                                const type = document.type_id === 1 ? 'Pasos' : 'Licna karta';
                                                documentInformation = `${document.document_number} (${type})`;
                                            }

                                            return (
                                                <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={false}>
                                                    <TableCell align="center">
                                                        <Label sx={{ p: 2 }} color={statusColor}>{upperCase(status)}</Label>
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                                                            <Typography variant="subtitle2" noWrap>
                                                                {firstname} {lastname}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>

                                                    <TableCell align="center">{email}</TableCell>

                                                    <TableCell align="center">{jmbg}</TableCell>

                                                    <TableCell align="center">
                                                        {city.name}
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        {documentInformation}
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        {status === 'PENDING' && (
                                                            <>
                                                                <Button variant="contained" color="success" sx={{ m: 0.5, color: 'white' }} onClick={() => onApproveRegistration(id)}>
                                                                    approve
                                                                </Button>
                                                                <Button variant="contained" color="error" sx={{ color: 'white' }} onClick={() => onRejectRegistration(id)}>
                                                                    reject
                                                                </Button>
                                                            </>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Scrollbar>
                    )}
                    {isLoading && (
                        <Typography>Loading registrations...</Typography>
                    )}
                    {registrations_page && (
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={registrations_page.total}
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
