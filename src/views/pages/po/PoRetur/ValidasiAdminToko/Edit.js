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

export default function ValidasiAdminToko(props)  {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState("");
  const [pocode, setPoCode] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [editingItem, setEditingitem] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [coderfq, setCodeRfq] = useState([]);
  const [type,setType] =useState([]);
  const [returtipe,setReturTipe] = useState([]);
  const [statusm, setStatusM] = useState([]);
  const [ongkir, setOngkir] = useState([]);
  const [lainnya, setLainnya] = useState("");
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
        `${process.env.REACT_APP_API_BASE_URL}/po-retur/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        getPerson(data.data.response.person_id);
        getItemDataSaved();
        setOngkir(data.data.response.ongkir);
        setLainnya(data.data.response.lainnya);
        setUsernamePO(data.data.response.username);
        setCodeRfq(data.data.response.code_rfq);
        setPoCode(data.data.po_code)
        setType(data.data.response.type);
        setStatusM(data.data.response.status_m);
        setReturTipe(data.data.response.return_type);
        setKeterangan(data.data.response.keterangan);
       
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/po-retur/item`, {

        rpo_id: props.match.params.id

    }).then(async response => {
        let stateItem = [];
        let stateEditing = [];

        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
                item_id: data.item_id,
                item_name:data.item_name,
                qty: data.qty,
                harga: data.harga,
                diskon_nominal: data.diskon_nominal,
                diskon_persen: data.diskon_persen,
                data: {
                    item_name: data.item_name,
                    qty: data.qty,
                    harga: data.harga
                },
            }];
                stateEditing = [...stateEditing, {
                  editing: false
            }];
      }));
        setEditingitem(stateEditing);
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
                diskon_nominal: dataItem.diskon_nominal,
                diskon_persen:dataItem.diskon_persen,
            }]);
    let data = {
        warehouse_id : parseInt(warehouse),
        code_po: pocode,
        person_id: parseInt(person),
        keterangan: keterangan ,
        type: parseInt(type),
        status_d: 3,
        status_ar: parseInt(statusm),
        manajer_toko : username,
        return_type: parseInt(returtipe),
        username : usernamepo,
        ongkir : parseInt(ongkir),
        lainnya : parseInt(lainnya),
        items : dataItems,
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/po-retur/update/${props.match.params.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/po-retur");
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
    <SimpleHeader name="Validasi Manager" parentName="PO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
          <Form onSubmit={handleSubmit}>
          <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                      <h3>Validasi Manager</h3>
                    </CardHeader>
                    <CardBody>
                          <Col md="6">
                          <Input
                                  type="hidden"
                                  name="desc"
                                  placeholder="Masukan Keterangan"
                                  value={coderfq}
                                  onChange={(e) => {
                                    setCodeRfq(e.target.value);
                                  }}
                                />
                          </Col>
                          <Input
                                  type="hidden"
                                  name="desc"
                                  placeholder="Masukan Keterangan"
                                  value={pocode}
                                  onChange={(e) => {
                                    setPoCode(e.target.value);
                                  }}
                                />
                                <Input
                                  type="hidden"
                                  name="desc"
                                  placeholder="Masukan Keterangan"
                                  value={usernamepo}
                                  onChange={(e) => {
                                    setUsernamePO(e.target.value);
                                  }}
                                />
                      <Row md="12">
                          <Col md="6">
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
                                Tipe
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                  name="Tipe Po"
                                  type="select"
                                  value={type}
                                  onChange={(e) => {
                                      setType(e.target.value);
                                  }}
                                >
                                  <option value={""}>Pilih Tipe </option>
                                  <option value={1}>Dari Supplier ke Toko</option>
                                  <option value={2}>Dari Supplier ke Customer</option>
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
                                  type="text"
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
                                Tipe Retur
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                  name="Tipe Po"
                                  type="select"
                                  value={returtipe}
                                  onChange={(e) => {
                                      setReturTipe(e.target.value);
                                  }}
                                >
                                  <option value="" selected hidden disabled>Pilih Retur</option>
                                  <option value={1}>Ganti Uang</option>
                                  <option value={2}>Ganti Barang</option>
                                </Input>
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
                            </FormGroup>
                          </Col>
                      </Row>
                        <Col xs="12">
                            <hr />
                        </Col>
                      <Table>
                      <tr>
                            <th>
                            Nama Item
                            </th>
                            <th>
                            Qty
                            </th>
                            <th>
                            Harga
                            </th>
                            <th>
                            Diskon Persen
                            </th>
                            <th>
                            Diskon Nominal
                            </th>
                        </tr>
                        <tbody>
                        {
                            savedItems.map((savedItem, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{savedItem.data.item_name}</td>
                                        <td>{savedItem.data.qty}</td>
                                        <td>{formatRupiah(savedItem.data.harga)}</td>
                                        <td>{savedItem.diskon_persen}</td>
                                        <td>{formatRupiah(savedItem.diskon_nominal)}</td>
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
                      <Link className="btn btn-info" to="/admin/po-retur">
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
            </Form>
          </div>
        </Row>
    </Container>  
    </>
  );
}