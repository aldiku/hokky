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

export default function EditReceivingTransfer(props)  {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [pengiriman, setPengiriman] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [codetr, setCodeTR] = useState("");
  const [codetw, setCodeTW] = useState("");
  const [statusr, setStatusR] =  useState([]);
  const [isShow, setIsShow] = useState(false);
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [input, setInput] = useState("");
  const [savedItems, setSavedItems] = useState([]);
  const [qty, setQty] = useState(0);
  const [usernametr, setUsernameTR]= useState("");
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
        `${process.env.REACT_APP_API_BASE_URL}/transfer-receiving/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        setPengiriman(data.data.response.pengiriman);
        setKeterangan(data.data.response.keterangan);
        setCodeTR(data.data.response.tr_code);
        setCodeTW(data.data.response.code_tw);
        setStatusR(data.data.response.status_receive);
        setUsernameTR(data.data.response.username);
        getItemDataSaved();
       
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/transfer-receiving/item`, {

        tr_id: props.match.params.id

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
                data: {
                    item_name: data.item_name,
                    harga: data.harga
                },
            }];
        }));

        setSavedItems(stateItem);
    })
}

  function EditData() {
    setLoading(true);
    let dataItems = [];
    savedItems.map((dataItem) => dataItems = [...dataItems, 
        { 
            item_id: dataItem.item_id, 
            qty: parseInt(dataItem.qty),
        }]);
    let data = {
      warehouse_id : parseInt(warehouse),
      status_receive: parseInt(statusr),
      admin_gudang : username,
      username : usernametr,
      tr_code : codetr,
      code_tw : codetw,
      pengiriman: parseInt(warehouse),
      keterangan,
      items : dataItems
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/transfer-receiving/update/${props.match.params.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/receiving-transfer");
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
    <SimpleHeader name="Validasi Kepala Gudang" parentName="Inventori" />
    <Container className="mt--6" fluid>
        <Row>
        <div className="col">
            <CardBody>
              <Card className="bg-secondary shadow">
                <Form onSubmit={handleSubmit}>
                    <CardHeader className="bg-white border-0">
                      <h3>Validasi Kepala Gudang</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={3}
                              >
                                Kode TR
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                  type="text"
                                  name="keterangan"
                                  placeholder="Masukan Keterangan"
                                  value={codetr}
                                  onChange={(e) => {
                                    setCodeTR(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={3}
                              >
                                Kode TR
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                  type="text"
                                  name="keterangan"
                                  placeholder="Masukan Keterangan"
                                  value={codetw}
                                  onChange={(e) => {
                                    setCodeTW(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={3}
                            >
                              Pengiriman
                            </Label>
                            <Col sm={7}>
                            <Input
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
                              </Input>
                            </Col>
                            </FormGroup>
                          </Col>
                          <Col md="6">
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
                                  type="textarea"
                                  name="keterangan"
                                  rows = "5"
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
                              sm={4}
                            >
                              Validasi
                            </Label>
                              <Col sm={6}>
                                <div style={{ display: "flex" }}>
                                  <div className="custom-control custom-radio mb-3">
                                    <Input
                                      className="custom-control-input"
                                      id="customRadio11"
                                      name="custom-radio-4"
                                      type="radio"
                                      value={5}
                                      checked={statusr === 5}
                                      onChange={() => setStatusR(5)}
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
                                      checked={statusr === 4}
                                      onChange={() => setStatusR(4)}
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
                            </FormGroup>
                          </Col>
                      </Row>  
                    </CardBody>
                </Form>
              </Card>
              <Card className="bg-secondary shadow">
                <Form onSubmit={handleSubmit}>
                    <CardHeader className="bg-white border-0">
                      <h3>Item</h3>
                    </CardHeader>
                    <CardBody>
                    <Table>
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
                                        <td>{savedItem.data.item_name}</td>
                                        <td>{savedItem.data.item_code}</td>
                                        <td>{savedItem.qty}</td>
                                        <td>{savedItem.data.satuan}</td>
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
                          <Link className="btn btn-info" to="/admin/receiving-transfer">
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
                </Form>
              </Card>
            </CardBody>
          </div>
        </Row>
    </Container>
    </>
  );
}