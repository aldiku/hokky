/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  CardFooter,
  CardGroup,
  CardImg,
  Container,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SimpleHeader from "components/Headers/SimpleHeader.js";

const DetailKartuStok = (props) => {
  const token = localStorage.token;
  const [activeTab, setActiveTab] = useState("1");
  const [alert, setAlert] = React.useState(null);
  const [rowIndex, setRowIndex] = useState(0);
  const [namaproyek,setNamaProyek] = useState("");
  const [image1,setImage1] = useState("");
  const [image2,setImage2] = useState("");
  const [image3,setImage3] = useState("");
  const [namaitem, setNamaItem] = useState("")
  const [kodeitem,setKodeItem] = useState("")
  const [masuk, setMasuk] = useState(0)
  const [keluar, setKeluar] = useState(0)
  const [sisa, setSisa] = useState(0)
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [currentSort, setCurrentSort] = useState("");

  let paginationOption = {
    page: page,
    alwaysShowAllBtns: true,
    override: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPage: perPage,
    onPageChange: (page) => {
      updateDataTable(page, perPage, currentSort);
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
                updateDataTable(page, e.target.value, currentSort);
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
  };

  const updateDataTable = (page, perPage, currentSort) => {
    getSalesTrackingDetail(page, perPage, currentSort);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
  };

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(page, perPage, sort);
    }
  };

  useEffect(() => {
    getSalesTrackingDetail(page, perPage, currentSort);
  }, [props.code]);

  const getSalesTrackingDetail = (page, perPage, currentSort) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const data = { page: page, per_page: perPage };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/log-stock/get-by-item/${props.match.params.id}`,
        {
          headers,
        }
      )
      .then((data) => {
        setNamaItem(data.data.response.item_name);
        setKodeItem(data.data.response.item_code);
        setMasuk(data.data.response.qty_masuk);
        setKeluar(data.data.response.qty_keluar);
        setSisa(data.data.response.qty_sisa);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  return (
    <div>
      {alert}
      <SimpleHeader name="Detail Kartu Stok" parentName="Inventory" />
        <Container className="mt--6" fluid>
            <Row>
                <div className="col">
                    <CardBody>
                        <Card>
                            <CardHeader className="bg-secondary border-0">
                                <div
                                style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                <h3>Detail Kartu Stok</h3>
                                </div>
                            </CardHeader>
                            {/* <CardBody>
                                <ToolkitProvider
                                rowNumber={rowIndex}
                                data={namaproyek}
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
                                    dataField: "warehouse_id",
                                    text: "Cabang",
                                    sort: true,
                                    },
                                    {
                                    dataField: "code",
                                    text: "Kode",
                                    sort: true,
                                    },
                                    {
                                    dataField: "rak",
                                    text: "Rak",
                                    sort: true,
                                    },
                                    {
                                    dataField: "item_code",
                                    text: "Kode Item",
                                    sort: true,
                                    },
                                    {
                                    dataField: "item_name",
                                    text: "Nama Item",
                                    sort: true,
                                    },
                                    {
                                    dataField: "qty_awal",
                                    text: "Stok",
                                    sort: true,
                                    },
                                    {
                                    dataField: "qty_masuk",
                                    text: "Masuk",
                                    sort: true,
                                    },
                                    {
                                    dataField: "qty_keluar",
                                    text: "Keluar",
                                    sort: true,
                                    },
                                    {
                                    dataField: "qty_sisa",
                                    text: "Sisa",
                                    sort: true,
                                    },
                                    {
                                    dataField: "status",
                                    text: "Status",
                                    sort: true,
                                    },
                                    // {
                                    // dataField: "",
                                    // text: "",
                                    // sort: true,
                                    // },
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
                            </CardBody>  */}
                            <CardBody>
                            <Row md="12">
                          <Col md="6">
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Kode Item
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                disabled
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Keterangan"
                                  value={kodeitem}
                                  onChange={(e) => {
                                    setKodeItem(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Nama Item
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                disabled
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Nama Item"
                                  value={namaitem}
                                  onChange={(e) => {
                                    setNamaItem(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                          </Col>
                          <Col md="6">
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Qty Masuk
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                            className="form-control-alternative"
                                name="Tipe Po"
                                type="number"
                                value={masuk}
                                onChange={(e) => {
                                    setMasuk(e.target.value);
                                }}
                              />
                              
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Qty Keluar
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                            className="form-control-alternative"
                                name="Tipe Po"
                                type="number"
                                value={keluar}
                                onChange={(e) => {
                                    setKeluar(e.target.value);
                                }}
                              />
                              
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Qty Sisa
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                            className="form-control-alternative"
                                name="Tipe Po"
                                type="number"
                                value={sisa}
                                onChange={(e) => {
                                    setSisa(e.target.value);
                                }}
                              />
                              
                            </Col>
                            </FormGroup>
                          </Col>
                      </Row>
                            </CardBody>
                          <CardFooter>
                                <Link className="btn btn-info" to="/admin/stock-item">
                                Kembali
                                </Link>
                        </CardFooter>
                        </Card>
                    </CardBody>
                   
                </div>
            </Row>
        </Container> 
    </div>
  );
};

export default DetailKartuStok;

