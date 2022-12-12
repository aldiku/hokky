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
  Modal, ModalHeader, ModalBody
  
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditPermintaanBarang(props) {
    const token = localStorage.token;
    const warehouse = localStorage.warehouse;
    const username = localStorage.username;
    let history = useHistory();
    const [persons, setPersons] = useState([]);
    const [person, setPerson] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [rfq_code,setRfqCode] = useState("");
    const [approve, setApprove] = useState([]);
    const [typereq,setTypeReq] = useState([]);
    const [keterangan,setKeterangan] = useState("");
    const [usernamecreaterfq,setUsernameCreateRfq] = useState("");
    const [savedItems, setSavedItems] = useState([]);
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
          `${process.env.REACT_APP_API_BASE_URL}/rfq-po/get/${props.match.params.id}`,
          { headers }
        )
        .then((data) => {
          getPerson(data.data.response.person_id);
          setRfqCode(data.data.response.rfq_code);
          setUsernameCreateRfq(data.data.response.username);
          setTypeReq(data.data.response.type);
          setApprove(data.data.response.status_rfq);
          setKeterangan(data.data.response.keterangan);
          getItemDataSaved();
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const getItemDataSaved = () => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/rfq-po/item`, {

            rfq_id: props.match.params.id

        }).then(async response => {
            let stateItem = [];

            await Promise.all(response.data.response.map(async (data) => {
                stateItem = [...stateItem, {
                    item_id: data.item_id,
                    item_name:data.item_name,
                    item_code:data.item_code,
                    qty: data.qty,
                    satuan : data.satuan,
                    data: {
                        item_name: data.item_name,
                        qty: data.qty
                    },
                }];
            }));

            setSavedItems(stateItem);
        })
    }

    const getPerson = (id) => {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        axios
          .get(
            `${process.env.REACT_APP_API_BASE_URL}/person/list`,
            { headers }
          )
          .then((data) => {
            setPersons(data.data.response);
            setPerson(id);
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
                satuan: dataItem.satuan,
            }]);
        let data = {
        warehouse_id : parseInt(warehouse),
        username : usernamecreaterfq,
        person_id: parseInt(person),
        type : parseInt(typereq),
        keterangan: keterangan ,
        status_rfq : parseInt(approve),
        admin_po: username,
        items : dataItems
        };
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/rfq-po/update/${props.match.params.id}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/permintaan-barang");
          
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
    <SimpleHeader name="Validasi Permintaan Barang" parentName="PO" />
    <Container className="mt--6" fluid>
        <Row>
        <div className="col">
            <CardBody>
              <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                      <h3>Validasi Permintaan Barang</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Kode RFQ
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                disabled
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan RfqCode"
                                  value={rfq_code}
                                  onChange={(e) => {
                                    setRfqCode(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Supplier
                              </Label>
                              <Col sm={7}>
                              <Input
                              disabled
                              className="form-control-alternative"
                                  name="person"
                                  type="select"
                                  value={person}
                                  onChange={(e) => {
                                    setPerson(e.target.value);
                                  }}
                                >
                                  <option value=''>Pilih Supplier</option>
                                  {persons.map((person, key) => {
                                      return (
                                        <option key={key} value={person.id}>
                                          {person.person_name}
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
                              Tipe PO
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                            className="form-control-alternative"
                                name="Tipe Po"
                                type="select"
                                value={typereq}
                                onChange={(e) => {
                                    setTypeReq(e.target.value);
                                }}
                              >
                                <option value="">Pilih Request</option>
                                <option value={1}>Customer Request</option>
                                <option value={2}>Stok Request</option>
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
                                className="form-control-alternative"
                                  type="textarea"
                                  name="desc"
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
                              <Col sm={7}>
                                <div style={{ display: "flex" }}>
                                  <div className="custom-control custom-radio mb-3">
                                    <Input
                                      className="custom-control-input"
                                      id="customRadio8"
                                      name="custom-radio-3"
                                      type="radio"
                                      value={5}
                                      checked={approve === 5}
                                      onChange={() => setApprove(5)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio8"
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
                                      id="customRadio9"
                                      name="custom-radio-3"
                                      type="radio"
                                      value={4}
                                      checked={approve === 4}
                                      onChange={() => setApprove(4)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio9"
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
                      <Link className="btn btn-info" to="/admin/permintaan-barang">
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
