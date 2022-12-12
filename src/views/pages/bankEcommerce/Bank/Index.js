/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { 
    Card, 
    Button, 
    Row, 
    Col, 
    CardBody, 
    CardHeader,
    ButtonGroup,
    Form, 
    FormGroup, 
    Label, 
    Input 
} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const Bank = () => {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  const [rowIndex, setRowIndex] = useState(0);
  const [allBank, setAllBank] = useState([]);
  const redirectPrefix = `/admin/bank/edit/`;
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const [rakCode, setRakCode] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");
  const [active1, setActive1] = useState(0);
  const [filtered1, setFiltered1] = useState([]);
  const [isShow1, setIsShow1] = useState(false);

  
  let paginationOption = {
    page: page,
    alwaysShowAllBtns: true,
    override: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPage: perPage,
    totalSize: totalItem,
    onPageChange: (page) => {
      updateDataTable(page, perPage, currentSort, rakCode, keterangan);
    },
    sizePerPageRenderer: () => (
      <div className="dataTables_length" id="datatable-basic_length">
        <label>
          Show{" "}
          {
            <select
              name="datatable-basic_length"
              aria-controls="datatable-basic"
              className="form-control form-control-sm"
              onChange={(e) => {
                updateDataTable(page, e.target.value, currentSort)
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          }{" "}
          entries.
        </label>
      </div>
    ),
  }

  const updateDataTable = (page, perPage, sort, rakCode, keterangan) => {
    getBankEcommerce(page, perPage, sort, rakCode, keterangan);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setRakCode(rakCode);
    setKeterangan(keterangan);
    
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort, rakCode, keterangan)
    }
  }

  useEffect(() => {
    getBankEcommerce(page, perPage, currentSort, "", "");
  }, []);

  const getBankEcommerce = async (page, perPage, currentSort, warehouse_name = null, keterangan = null) => {
    let filter = {
       page: page, 
       per_page: perPage, 
      }
      if (warehouse_name !== null) {
        filter = Object.assign(filter, { warehouse_name: warehouse_name })
      }
      if (keterangan !== null) {
        filter = Object.assign(filter, { keterangan: keterangan })
      }
    const data = filter;
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/bank `, data, { headers })
      setAllBank(res.data.response);
      setPage(res.data.current_page + 1);
      setPerpage(res.data.per_page);
      setTotalItem(res.data.total_item);
    }

  const reset = () => {
    setKeterangan("");
    setRakCode("");
    updateDataTable(1, perPage, currentSort, "", "");
  }

  const onChange1 = (e) => {
    const rakCode = e.currentTarget.value;

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/warehouse/toko`, {
        page: 1,
        per_page: 10,
        warehouse_name: rakCode,
    }).then(async response => {
        let suggests = [];

        await Promise.all(response.data.response.map((data) =>
            suggests = [...suggests, data.warehouse_name]
        ));

        setActive1(0);
        setFiltered1(suggests);
        setIsShow1(true);

    });

    setRakCode(e.currentTarget.value);
};

const onClick1 = e => {
    setActive1(0);
    setFiltered1([]);
    setIsShow1(false);
    setRakCode(e.currentTarget.innerText)
};

const onKeyDown1 = e => {
    if (e.keyCode === 13) { // enter key
        setActive1(0);
        setIsShow1(false);
        setRakCode(filtered1[active1])
    }
    else if (e.keyCode === 38) { // up arrow
        return (active1 === 0) ? null : setActive1(active1 - 1);
    }
    else if (e.keyCode === 40) { // down arrow
        return (active1 - 1 === filtered1.length) ? null : setActive1(active1 + 1);
    }
};

const AutoCompleTes1 = () => {
    if (isShow1 && rakCode) {
        if (filtered1.length) {
            return (
                <ul className="autocomplete">
                    {filtered1.map((suggestion1, index1) => {
                        let className;
                        if (index1 === active1) {
                            className = "active";
                        }
                        return (
                            <li key={index1} className={className} onClick={onClick1}>
                                {suggestion1}
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            return (
                <div className="no-autocomplete">
                    <em>Not found</em>
                </div>
            );
        }
    }
    return <></>;
}


  return (
    <div>
       <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>Bank Ecommerce</h3>
                </div>
              </CardHeader>
              <CardBody>
                    <Form>
                        <Row md="12">
                          <Col md="3">
                            <FormGroup>
                                <Label htmlFor="exampleFormControlSelect3">Nama Warehouse</Label>
                                <Input
                                  placeholder="Nama Warehouse"
                                  type="search"
                                  style={{ height: 38 }}
                                  onChange={onChange1}
                                  onKeyDown={onKeyDown1}
                                  value={rakCode}
                              />             
                              <AutoCompleTes1 />           
                            </FormGroup>  
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Button type="button" onClick={reset} color="secondary">Reset</Button>
                          </Col>
                        </Row>
                    </Form>
                <ToolkitProvider
                  rowNumber={rowIndex}
                  data={allBank}
                  keyField="id"
                  search={ {
                    defaultSearch: 'search something here'
                  } }
                  columns={[
                    {
                      dataField: "no",
                      text: "#",
                      sort: true,
                      page: 1,
                      formatter: (cell, row, index) => {
                        let currentRow = ++index;
                        return currentRow + rowIndex;
                      }
                    },
                    {
                      dataField: "account_name",
                      text: "Akun",
                      sort: true,
                    },
                    {
                      dataField: "account_number",
                      text: "Nomer Akun",
                      sort: true,
                    },
                    {
                        dataField: "bank_name",
                        text: "Bank",
                        sort: true,
                    },
                    {
                        dataField: "", text: "", formatter: (cell, row, index) => {
                        return (
                            <ButtonGroup>
                                <Button>
                                    <Link
                                    to={redirectPrefix + row.id}
                                    id={"tooltip_" + row.id}
                                    >
                                    <i className="fas fa-user-edit" /> Edit
                                    </Link>
                                </Button>
                            </ButtonGroup>
                            )
                        }
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
}

export default Bank;