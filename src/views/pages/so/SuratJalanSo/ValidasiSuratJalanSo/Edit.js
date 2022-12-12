/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  
  Card,
  Button,
  Row,
  Col,
  CardBody,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Modal, 
  ModalHeader, 
  ModalBody,
  
} from "reactstrap";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function ValidasiSuratJalanSo(props) {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [pengiriman, setPengiriman] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [savedItems, setSavedItems] = useState([]);
  const [statussj,setStatusSj] = useState([]);
  const [codeso, setCodeSo] = useState("");
  const [codesj, setCodeSj] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    getById();
  }, []);

  const getById = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/surat-jalan-so/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        getCustomer(data.data.response.customer_id);
        setStatusSj(data.data.response.status_sj);
        setKeterangan(data.data.response.keterangan);
        setCodeSo(data.data.response.code_so);
        setCodeSj(data.data.response.sj_code);
        setPengiriman(data.data.response.pengiriman);
        getItemDataSaved();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/surat-jalan-so/item`, {

        sj_id: props.match.params.id

    }).then(async response => {
        let stateItem = [];

        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
                item_id: data.item_id,
                item_name:data.item_name,
                item_code : data.item_code,
                satuan : data.satuan,
                qty: data.qty,
                harga: data.harga,
                diskon_nominal: data.diskon_nominal,
                diskon_persen : data.diskon_persen,
                data: {
                    item_name: data.item_name,
                    harga: data.harga,
                    qty: data.qty,
                    diskon_nominal: data.diskon_nominal,
                    diskon_persen : data.diskon_persen,
                },
            }];
        }));

        setSavedItems(stateItem);
    })
}

const getCustomer = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/customer/list`,
        { headers }
      )
      .then((data) => {
        setCustomers(data.data.response);
        setCustomer(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function EditData() {
    setLoading(true);
    
   }

   function EditData() {
    setLoading(true);
    let dataItems = [];
        savedItems.map((dataItem) => dataItems = [...dataItems, 
            { 
                item_id: dataItem.item_id, 
                qty: dataItem.qty, 
                harga:dataItem.harga,
                // diskon_nominal: data.diskon_nominal,
                // diskon_persen : data.diskon_persen,
            }]);
    let data = {
        warehouse_id : parseInt(warehouse),
        code_so: codeso,
        code_sj: codesj,
        status_sj: parseInt(statussj),
        admin_gudang: username,
        customer_id: parseInt(customer),
        pengiriman: parseInt(pengiriman),
        keterangan: keterangan ,
        items : dataItems
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/surat-jalan-so/update/${props.match.params.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/surat-jalan-so");
        })
        .then((json) => {
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

const handleSubmit = (e) => {
    {
      EditData();
    }
  };

  return (
    <>
    <SimpleHeader name="Validasi Surat Jalan" parentName="SO" />
    <Container className="mt--6" fluid>
        <Row>
        <div className="col">
            <CardBody>
              <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                      <h3>Validasi Surat Jalan </h3>
                    </CardHeader>
                    <CardBody>
                    <Row md="12">
                          <Col md="6">
                          <Input
                          className="form-control-alternative"
                                  type="hidden"
                                  name="desc"
                                  placeholder="Masukan Keterangan"
                                  value={codeso}
                                  onChange={(e) => {
                                    setCodeSo(e.target.value);
                                  }}
                                />
                          </Col>
                      </Row>
                        <Col xs="12">
                            <hr />
                        </Col>
                      <Row md="12">
                          <Col md="6">
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={3}
                              >
                                Customer
                              </Label>
                              <Col sm={6}>
                              <Input
                              className="form-control-alternative"
                              disabled
                                  name="customer"
                                  type="select"
                                  value={customer}
                                  onChange={(e) => {
                                    setCustomer(e.target.value);
                                  }}
                                >
                                  <option value=''>Pilih Customer</option>
                                  {customers.map((customer, key) => {
                                      return (
                                        <option key={key} value={customer.id}>
                                          {customer.name}
                                        </option>
                                      );
                                    })}
                                  </Input>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={3}
                            >
                              Pengiriman
                            </Label>
                            <Col sm={6}>
                            <Input
                            className="form-control-alternative"
                            disabled
                                name="Tipe Request"
                                type="select"
                                value={pengiriman}
                                onChange={(e) => {
                                  setPengiriman(e.target.value);
                                }}
                              >
                                <option value="">Pilih Request</option>
                                <option value={1}>Ambil Sendiri</option>
                                <option value={2}>Delivery</option>
                                <option value={3}>Kurir</option>
                              </Input>
                            </Col>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={3}
                              >
                                Keterangan
                              </Label>
                              <Col sm={6}>
                                <Input
                                className="form-control-alternative"
                                disabled
                                  type="textarea"
                                  name="keterangan"
                                  rows = "6"
                                  placeholder="Masukan Keterangan"
                                  value={keterangan}
                                  onChange={(e) => {
                                    setKeterangan(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={3}
                            >
                              Validasi
                            </Label>
                              <Col sm={7}>
                                <div style={{ display: "flex" }}>
                                  <div className="custom-control custom-radio mb-3">
                                    <Input
                                      className="custom-control-input"
                                      id="customRadio12"
                                      name="custom-radio-5"
                                      type="radio"
                                      value={5}
                                      checked={statussj === 5}
                                      onChange={() => setStatusSj(5)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio12"
                                    >
                                      Disetujui
                                    </Label>
                                  </div>
                                  <div
                                    className="custom-control custom-radio mb-3"
                                    style={{ marginLeft: "20px" }}
                                  >
                                    <Input
                                      className="custom-control-input"
                                      id="customRadio13"
                                      name="custom-radio-5"
                                      type="radio"
                                      value={4}
                                      checked={statussj === 4}
                                      onChange={() => setStatusSj(4)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio13"
                                    >
                                      Ditolak
                                    </Label>
                                  </div>
                                </div>
                              </Col>
                          </FormGroup>
                          </Col>
                      </Row>
                    </CardBody>
                
              </Card>
              <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                      <h3>Item</h3>
                    </CardHeader>
                    <CardBody>
                      <Table size="sm" responsive>
                        <thead>
                        <tr>
                            <th><b>Nama Item</b></th>
                            <th><b>Kode Item</b></th>
                            <th><b>Qty</b></th>
                            <th><b>Satuan</b></th>
                        </tr>
                        </thead>
                        <tbody>
                          {
                              savedItems.map((savedItem, key) => {
                                  return (
                                      <tr key={key}>
                                          <td>{savedItem.item_name}</td>
                                          <td>{savedItem.item_code}</td>
                                          <td>{savedItem.qty}</td>
                                          <td>{savedItem.satuan}</td>
                                          <td hidden>{savedItem.harga}</td>
                                          <td hidden>{savedItem.diskon_nominal}</td>
                                          <td hidden>{savedItem.diskon_persen}</td>
                                      </tr>
                                  )
                              })
                          }
                        </tbody>
                      </Table>
                    </CardBody>
                <CardFooter>
                <Button color="danger" onClick={toggle}>
                          Simpan
                      </Button>
                      <Link className="btn btn-info" to="/admin/surat-jalan-so">
                        Kembali
                      </Link>
                </CardFooter>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle} align="center"></ModalHeader>
                  <ModalBody align="center">
                  <font size="5"><b>Apakah Anda Sudah Yakin ?</b></font><br></br><br></br><br></br>
                  {!isLoading && (
                    <Button color="primary" onClick={() => handleSubmit()}>
                    Lanjutkan
                    </Button>
                  )}
                  {isLoading && (
                    <Button color="primary" disabled>
                    <i className="fas fa-spinner fa-spin"></i>
                    {""}
                    loading...
                    </Button>
                  )}
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                  </ModalBody>
                </Modal>
              </Card>
            </CardBody>
          </div>
        </Row>
    </Container> 
    </>
  );
}