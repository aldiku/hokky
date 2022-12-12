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
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Modal, ModalHeader, ModalBody
  
} from "reactstrap";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function ValidasiDirekturTSW(props)  {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [warehouses1, setWarehouses1] = useState([]);
  const [warehouse1, setWarehouse1] = useState("");
  const [warehouses2, setWarehouses2] = useState([]);
  const [pengiriman, setPengiriman] = useState([]);
  const [warehouse2, setWarehouse2] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [savedItems, setSavedItems] = useState([]);
  const [statusm, setStatusM] = useState([]);
  const [statusd, setStatusD] = useState([]);
  const [manajer, setManajer] = useState("");
  const [ongkir, setOngkir] = useState(0);
  const [lainnya, setLainnya] = useState(0);
  const [usernamets, setUsernameTS] = useState("");
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
        `${process.env.REACT_APP_API_BASE_URL}/transfer-warehouse/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        getWarehouse1(data.data.response.warehouse_id1);
        getWarehouse2(data.data.response.warehouse_id2);
        setKeterangan(data.data.response.keterangan);
        setPengiriman(data.data.response.pengiriman);
        setOngkir(data.data.response.ongkir);
        setLainnya(data.data.response.lainnya);
        setStatusM(data.data.response.status_m);
        setStatusD(data.data.response.status_d);
        setUsernameTS(data.data.response.username);
        setManajer(data.data.response.manajer);
        getItemDataSaved();
       
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/transfer-warehouse/item`, {

        tw_id: props.match.params.id

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
                satuan : data.satuan,
                data: {
                    item_name: data.item_name,
                    harga: data.harga
                },
            }];
        }));

        setSavedItems(stateItem);
    })
}

  const getWarehouse2 = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/warehouse/list/all`,
        { headers }
      )
      .then((data) => {
        setWarehouses2(data.data.response);
        setWarehouse2(id)
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getWarehouse1 = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/warehouse/list/all`,
        { headers }
      )
      .then((data) => {
        setWarehouses1(data.data.response);
        setWarehouse1(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function EditData() {
    setLoading(true);
    let dataItems = [];
    savedItems.map((dataItem) => dataItems = [...dataItems, 
        { 
            item_id: dataItem.item_id, 
            qty: dataItem.qty,
            satuan : dataItem.satuan,
        }]);
    let data = {
        warehouse_id : parseInt(warehouse),
        warehouse_id1: parseInt(warehouse1),
        warehouse_id2: parseInt(warehouse2),
        pengiriman:parseInt(pengiriman),
        status_m: parseInt(statusm),
        status_d: parseInt(statusd),
        ongkir : parseFloat(ongkir),
        lainnya : parseFloat(lainnya),
        manajer : manajer,
        direktur: username,
        username : usernamets,
        keterangan,
        items : dataItems
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/transfer-warehouse/update/${props.match.params.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/transfer-warehouse-stock");
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
    <SimpleHeader name="Validasi Direktur" parentName="Inventori" />
    <Container className="mt--6" fluid>
        <Row>
        <div className="col">
            <CardBody>
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                      <h3>Validasi Direktur</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Cabang Asal
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                disabled
                                  name="person"
                                  type="select"
                                  value={warehouse1}
                                  onChange={(e) => {
                                    setWarehouse1(e.target.value);
                                  }}
                                >
                                  <option value=''>Pilih Cabang</option>
                                  {warehouses1.map((warehouse, key) => {
                                      return (
                                        <option key={key} value={warehouse.id}>
                                          {warehouse.name}
                                        </option>
                                      );
                                    })}
                                </Input>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Keterangan
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                className="form-control-alternative"
                                  type="textarea"
                                  rows= "7"
                                  name="desc"
                                  placeholder="Masukan Keterangan"
                                  value={keterangan}
                                  onChange={(e) => {
                                    setKeterangan(e.target.value);
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
                                Cabang Tujuan
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                className="form-control-alternative"
                                  name="person"
                                  type="select"
                                  value={warehouse2}
                                  onChange={(e) => {
                                    setWarehouse2(e.target.value);
                                  }}
                                >
                                  <option value='' selected hidden>Pilih Cabang</option>
                                  {warehouses2.map((warehouse2, key) => {
                                      return (
                                        <option key={key} value={warehouse2.id}>
                                          {warehouse2.name}
                                        </option>
                                      );
                                    })}
                                </Input>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Pengiriman
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                            className="form-control-alternative"
                                name="Tipe Request"
                                type="select"
                                value={pengiriman}
                                onChange={(e) => {
                                  setPengiriman(e.target.value);
                                }}
                              >
                                <option value="" selected hidden>Pilih Pengiriman</option>
                                <option value={1}>Ambil Sendiri</option>
                                <option value={2}>Delivery</option>
                              </Input>
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Ongkir
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                className="form-control-alternative"
                                  type="number"
                                  name="desc"
                                  placeholder="Masukan Ongkir"
                                  value={ongkir}
                                  onChange={(e) => {
                                    setOngkir(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            {/* <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Lain-lain
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                className="form-control-alternative"
                                  type="number"
                                  name="desc"
                                  placeholder="Masukan Lainnya"
                                  value={lainnya}
                                  onChange={(e) => {
                                    setLainnya(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup> */}
                            <Col sm={6}>
                                <div style={{ display: "none" }}>
                                  <div className="custom-control custom-radio mb-3">
                                    <Input
                                      className="custom-control-input"
                                      id="customRadio11"
                                      name="custom-radio-4"
                                      type="radio"
                                      value={5}
                                      checked={statusm === 5}
                                      onChange={() => setStatusM(5)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio11"
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
                                      id="customRadio12"
                                      name="custom-radio-4"
                                      type="radio"
                                      value={4}
                                      checked={statusm === 4}
                                      onChange={() => setStatusM(4)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio12"
                                    >
                                      Ditolak
                                    </Label>
                                  </div>
                                </div>
                              </Col>
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Validasi
                            </Label>
                              <Col sm={6}>
                                <div style={{ display: "flex" }}>
                                  <div className="custom-control custom-radio mb-3">
                                    <Input
                                      className="custom-control-input"
                                      id="customRadio14"
                                      name="custom-radio-5"
                                      type="radio"
                                      value={5}
                                      checked={statusd === 5}
                                      onChange={() => setStatusD(5)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio14"
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
                                      id="customRadio15"
                                      name="custom-radio-5"
                                      type="radio"
                                      value={4}
                                      checked={statusd === 4}
                                      onChange={() => setStatusD(4)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio15"
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
                            <th>
                            Nama Item
                            </th>
                            <th>
                            Kode Item
                            </th>
                            <th>
                            Qty
                            </th>
                            <th>
                            Satuan
                            </th>
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
                      <Link className="btn btn-info" to="/admin/transfer-warehouse-stock">
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