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
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function ValidasiReceivingPo(props){
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState("");
  const [codereceiving, setCodeReceiving] = useState("");
  const [statusreceive, setStatusReceive] = useState([]);
  const [pembuatreceiving, setPembuatReceiving] = useState("");
  const [codepo, setCodePo] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [savedItems, setSavedItems] = useState([]);
  const [ongkir,setOngkir] = useState([]);
  const [lainnya, setLainnya] = useState([]);
  const [usernamepo, setUsernamePO] = useState("");
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
        `${process.env.REACT_APP_API_BASE_URL}/receiving-po/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        getPerson(data.data.response.person_id);
        getItemDataSaved();
        setCodeReceiving(data.data.response.receiving_code);
        setLainnya(data.data.response.lainnya);
        setOngkir(data.data.response.ongkir);
        setUsernamePO(data.data.response.username);
        setCodePo(data.data.response.code_po);
        setStatusReceive(data.data.response.status_receive);
        setKeterangan(data.data.response.keterangan);
        setPembuatReceiving(data.data.response.username);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/receiving-po/item`, {

        receiving_id: props.match.params.id

    }).then(async response => {
      console.log(response);
        let stateItem = [];

        await Promise.all(response.data.response.map(async (data) => {
          console.log(data);
            stateItem = [...stateItem, {
                item_id: data.item_id,
                item_name:data.item_name,
                item_code : data.item_code,
                satuan : data.satuan,
                qty: data.qty,
                harga : data.harga,
                diskon_nominal : data.diskon_nominal,
                diskon_persen : data.diskon_persen,
                data: {
                    item_name: data.item_name,
                    qty: data.qty,
                    harga : data.harga,
                    diskon_nominal : data.diskon_nominal,
                    diskon_persen : data.diskon_persen,
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
                harga: dataItem.harga,
                diskon_nominal : dataItem.diskon_nominal,
                diskon_persen: dataItem.diskon_persen,
            }]);
    let data = {
      warehouse_id : parseInt(warehouse),
      username : pembuatreceiving,
      code_po: codepo,
      receiving_code: codereceiving,
      ongkir: parseInt(ongkir),
      lainnya:parseInt(lainnya),
      username: usernamepo,
      person_id: parseInt(person),
      status_receive : parseInt(statusreceive),
      admin_gudang : username,
      keterangan: keterangan ,
      items : dataItems
          };
        axios
          .post(
            `${process.env.REACT_APP_API_BASE_URL}/receiving-po/update/${props.match.params.id}`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(function (response) {
            history.push("/admin/receiving-po");
            
          })
          .then((json) => {
            setLoading(false);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID',
            { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
        ).format(money);
      }
   
      const handleSubmit = (e) => {
        {
          
        EditData();
    
        }
      };

  return (
    <>
    <SimpleHeader name="Validasi Receiving PO" parentName="PO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Card className="bg-secondary shadow">
                <Form onSubmit={handleSubmit}>
                    <CardHeader className="bg-white border-0">
                      <h3>Validasi Receiving PO</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Kode Receiving
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                autoComplete="off"
                                disabled
                                    type="text"
                                    name="desc"
                                    placeholder="Masukan Kode Receiving"
                                    value={codereceiving}
                                    onChange={(e) => {
                                        setCodeReceiving(e.target.value);
                                    }}
                                />
                              </Col>                             
                            </FormGroup>
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Kode PO
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                autoComplete="off"
                                disabled
                                    type="text"
                                    name="desc"
                                    placeholder="Masukan Kode PO"
                                    value={codepo}
                                    onChange={(e) => {
                                        setCodePo(e.target.value);
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
                                className="form-control-alternative"
                                disabled
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
                                className="form-control-alternative"
                                disabled
                                  type="textarea"
                                  rows = "5"
                                  name="desc"
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
                                      id="customRadio10"
                                      name="custom-radio-4"
                                      type="radio"
                                      value={5}
                                      checked={statusreceive === 5}
                                      onChange={() => setStatusReceive(5)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio10"
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
                                      id="customRadio11"
                                      name="custom-radio-4"
                                      type="radio"
                                      value={4}
                                      checked={statusreceive === 4}
                                      onChange={() => setStatusReceive(4)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio11"
                                    >
                                      Ditolak
                                    </Label>
                                  </div>
                                </div>
                              </Col>
                            </FormGroup>
                        {/* hidden form */}
                            <Input
                                  name="person"
                                  type="hidden"
                                  value={pembuatreceiving}
                                  onChange={(e) => {
                                    setPembuatReceiving(e.target.value);
                                  }}
                                ></Input>
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
                    <CardBody >
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
                                        <td>{savedItem.data.item_name}</td>
                                        <td>{savedItem.item_code}</td>
                                        <td hidden>{formatRupiah(savedItem.harga)}</td>
                                        <td>{savedItem.qty}</td>
                                        <td>{savedItem.satuan}</td>
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
                      <Link className="btn btn-info" to="/admin/receiving-po">
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
          </div>
        </Row>
    </Container>  
    </>
  );
}
