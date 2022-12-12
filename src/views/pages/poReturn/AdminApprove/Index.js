/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  Row,
  CardBody,
  CardHeader,
  UncontrolledTooltip,
  ButtonGroup,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const AdminApprove = () => {
  const token = localStorage.token;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const redirectPrefix = `/admin/purchase-order-retur/kepala-toko/edit/`;
  const [rowIndex, setRowIndex] = useState(0);
  const [allPoReturn, setAllPoReturn] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState('');
  let paginationOption = {
    page: page,
    alwaysShowAllBtns: true,
    override: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPage: perPage,
    totalSize: totalItem,
    onPageChange: (page) => {
      updateDataTable(page, perPage, currentSort);
    },
    sizePerPageRenderer: () => (
      <div className="dataTables_length" id="datatable-basic_length">
        <label>
          Show{' '}
          {
            <select
              name="datatable-basic_length"
              aria-controls="datatable-basic"
              className="form-control form-control-sm"
              onChange={(e) => {
                updateDataTable(page, e.target.value, currentSort);
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          }{' '}
          entries.
        </label>
      </div>
    ),
  };

  const updateDataTable = (page, perPage, sort) => {
    getPoRetur(page, perPage, sort);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
  };

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === 'sort') {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(page, perPage, sort);
    }
  };

  useEffect(async () => {
    await getPoRetur(page, perPage, currentSort);
  }, []);

  const getPoRetur = async (page, perPage, currentSort) => {
    let filter = { page: page, per_page: perPage };
    const data = filter;
    await axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/retur-po/page`, data, {
        headers,
      })
      .then((data) => {
        setAllPoReturn(data.data.response_data);
        setPage(data.data.current_page + 1);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      {alert}
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <h3>Data Retur PO</h3>
                </div>
              </CardHeader>
              <CardBody>
                <ToolkitProvider
                  rowNumber={rowIndex}
                  data={allPoReturn}
                  keyField="id"
                  columns={[
                    {
                      dataField: 'no',
                      text: '#',
                      sort: true,
                      page: 1,
                      formatter: (cell, row, index) => {
                        let currentRow = ++index;
                        return currentRow + rowIndex;
                      },
                    },
                    {
                      dataField: 'username_po',
                      text: 'Username Purcase Order',
                      sort: true,
                    },
                    {
                      dataField: 'retur_code',
                      text: 'Kode Retur',
                      sort: true,
                    },
                    {
                      dataField: 'supplier',
                      text: 'Supplier',
                      sort: true,
                    },
                    {
                      dataField: 'item_or_money',
                      text: 'Item atau Uang',
                      sort: true,
                      formatter: (cell, row) => {
                        return row.item_or_money === 1 ? 'Item' : 'Money';
                      },
                    },
                    {
                      dataField: 'total_qty',
                      text: 'Quality',
                      sort: true,
                    },
                    {
                      dataField: 'total_price',
                      text: 'Total Harga',
                      sort: true,
                    },
                    {
                      dataField: 'status_barang',
                      text: 'Status',
                      sort: true,
                      formatter: (cell, row) => {
                        return row.status_barang === 0
                          ? 'Belum diproses'
                          : row.status_barang === 1
                          ? 'Diterima'
                          : 'Belum diterima';
                      },
                    },
                    {
                      dataField: '',
                      text: '',
                      formatter: (cell, row, index) => {
                        return (
                          <>
                            <ButtonGroup>
                              <Button>
                                <Link
                                  to={redirectPrefix + row.id}
                                  id={'tooltip_' + row.id}
                                >
                                  <i className="fas fa-user-edit" />
                                </Link>
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target={'tooltip_' + row.id}
                              >
                                Edit
                              </UncontrolledTooltip>
                            </ButtonGroup>
                          </>
                        );
                      },
                    },
                  ]}
                >
                  {(props) => (
                    <div className="py-4 table-responsive">
                      <BootstrapTable
                        remote
                        {...props.baseProps}
                        bootstrap4={true}
                        bordered={false}
                        hover={true}
                        pagination={paginationFactory({ ...paginationOption })}
                        onTableChange={handleTableChange}
                      />
                    </div>
                  )}
                </ToolkitProvider>
              </CardBody>
            </Card>
          </div>
        </Row>
    </div>
  );
};

export default AdminApprove;
