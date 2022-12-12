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
    Input ,
    DropdownItem,DropdownMenu, UncontrolledDropdown, DropdownToggle
} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ModalCetakSo from './ModalCetakSo';

const SuratJalanSo = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const [rowIndex, setRowIndex] = useState(0);
  const redirectPrefix = `/admin/surat-jalan-so/edit/`;
  const [allSuratJalanSo, setAllSuratJalanSo] = useState([]);
  const [uomCode, setUomCode] = useState("");
  const [description, setDescription] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");
  
  let paginationOption = {
    page: page,
    alwaysShowAllBtns: true,
    override: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPage: perPage,
    totalSize: totalItem,
    onPageChange: (page) => {
      updateDataTable(page, perPage, currentSort, uomCode, description);
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

  const updateDataTable = (page, perPage, sort, uomCode, description) => {
    getSuratJalan(page, perPage, sort, uomCode, description);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setUomCode(uomCode);
    setDescription(description);
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort,  uomCode, description)
    }
  }

  
  useEffect(() => {
    getSuratJalan(page, perPage, currentSort);
  }, []);

  // fungsi dari ambil data
  const getSuratJalan = (page, perPage, currentSort) => {
    
    let filter = { 
      
      page: page, 
      per_page: perPage, 
      status_sj : 3,
      // status : 2 ,
      warehouse_id : parseInt(warehouse),
      
    };
    const data = filter;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/surat-jalan-so/page`, data, {
        headers,
      })
      .then((data) => {
        setAllSuratJalanSo(data.data.response);
        setPage(data.data.current_page + 1);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const reset = () => {
    setUomCode("");
    setDescription("");
    updateDataTable(1, perPage, currentSort, "", "");
  }

  const [openModalCetak, setOpenModalCetak] = useState(false);
  const [dataModalCetak,setDataModalCetak] = useState({
    id: 0,
    codeRfq:"",
    supplier:"",
    alamat:"",
    sales:"",
    waktu:"",
    warehouserfq:"",
    hargarotal:"",
    keterangan:"",
    ongkir:0,
    validator:"",
    listItem:[],
  });
  const toggle = () => setOpenModalCetak(!openModalCetak);

  const displayModalCetak = (id) => {
    if(id > 0){
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/surat-jalan-so/cetak/${id}`,
        { headers }
        )
        .then((data) => {
          setDataModalCetak({
            id: id,
            codeRfq:data.data.response.sj.sj_code,
            supplier:data.data.response.sj.customer,
            alamat:data.data.response.sj.address,
            sales:data.data.response.sj.sales,
            waktu:data.data.response.sj.created,
            warehouserfq:data.data.response.sj.warehouse,
            hargarotal:data.data.response.sj.price_total,
            keterangan:data.data.response.sj.keterangan,
            ongkir:data.data.response.sj.ongkir,
            validator:data.data.response.sj.validator,
            listItem:data.data.response.list,
          });
          setOpenModalCetak(true);
         
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  }

  return (
    <div>
        <Row>
          <div className="col">
          <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>Surat Jalan</h3>
                  <div style={{ textAlign: 'right' }}>
                    <Link className="btn btn-info" to="/admin/surat-jalan-so/create">
                      <i className="fas fa-plus" /> Tambah
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                      <Form>
                        <Row md="12">
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kode SJ</Label>
                              <Input
                              className="form-control-alternative"
                                type="text"
                                placeholder="Masukan Kode SJ"
                                value={uomCode}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, description)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Keterangan</Label>
                              <Input
                              className="form-control-alternative"
                                type="text"
                                placeholder="Masukan Deskripsi"
                                value={description}
                                onChange={e => updateDataTable(1, perPage, currentSort, uomCode, e.target.value)}
                              />
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
                            data={allSuratJalanSo}
                            keyField="id"
                            columns={[
                            {
                                dataField: "no",
                                text: "#",
                                sort: true,
                                page: 1,
                                formatter: (cell, row, index) => {
                                let currentRow = ++index;
                                return currentRow + rowIndex;
                                },
                            },
                            {
                              dataField: "created_at",
                              text: "Tanggal Buat",
                              sort: true,
                            },
                            {
                                dataField: "sj_code",
                                text: "Kode SJ",
                                sort: true,
                            },
                            {
                                dataField: "code_so",
                                text: "Kode So",
                                sort: true,
                            },
                            {
                                dataField: "keterangan",
                                text: "Keterangan",
                                sort: true,
                            },
                            {
                                dataField: "status_sj",
                                text: "Status",
                                sort: true,
                                formatter: (cell, row) => {
                                  return row.status_sj === 3
                                    ? 'proses'
                                    : row.status_sj === 4
                                    ? 'Tidak Setuju'
                                    : 'Setuju';
                                },
                            },
                            {
                                dataField: "", text: "", formatter: (cell, row, index) => {
                                return (
                                   
                                     <UncontrolledDropdown group>
                                     <DropdownToggle className="nav-link pr-0" color="" tag="a">
                                         <Button className="btn btn-danger btn-sm" >
                                            Tindakan
                                         </Button>
                                     </DropdownToggle>
                                     <DropdownMenu>
                                          <DropdownItem onClick={() => displayModalCetak(row.id)}>
                                                <i className="fas fa-book" /><span>Cetak</span>
                                           </DropdownItem>
                                           <DropdownItem>
                                              <Link to={redirectPrefix + row.id}
                                                id={"tooltip_" + row.id}>
                                                <i className="fas fa-user-edit" /><span> Edit</span>
                                              </Link>
                                           </DropdownItem>
                                     </DropdownMenu>
                                 </UncontrolledDropdown>
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
        <ModalCetakSo open={openModalCetak} data={dataModalCetak} toggle={toggle}/>
    </div>
  );
}

export default SuratJalanSo;