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

export default function EditSuratJalanSo(props) {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [pengiriman, setPengiriman] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [editingItem, setEditingitem] = useState([]);
  const [qty, setQty] = useState(0);
  const [savedItems, setSavedItems] = useState([]);
  const [codeso, setCodeSo] = useState("");
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
        getItemDataSaved();
        setQty(data.data.response.qty_total);
        setKeterangan(data.data.response.keterangan);
        setCodeSo(data.data.response.code_so);
        setPengiriman(data.data.response.pengiriman);
       
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/surat-jalan-so/item`, {

        sj_id: props.match.params.id

      }).then(async response => {
        console.log(response);
          let stateItem = [];
          let stateEditing = [];
          await Promise.all(response.data.response.map(async (data) => {
              stateItem = [...stateItem, {
                item_id: data.item_id,
                item_name:data.item_name,
                item_code : data.item_code,
                satuan : data.satuan,
                qty: data.qty,
                data: {
                    item_name: data.item_name,
                    qty: data.qty,
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
    let dataItems = [];
        savedItems.map((dataItem) => dataItems = [...dataItems, 
            { 
                item_id: dataItem.item_id, 
                qty: dataItem.qty, 
                harga:dataItem.harga,
            }]);
    let data = {
        warehouse_id : parseInt(warehouse),
        username : username,
        code_so: codeso,
        status_sj: 3,
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
          history.push("/admin/surat-jalan-kasir");
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

  const changePriceStatus = (index, status) => {
    setEditingitem([
        ...editingItem.slice(0, index),
        Object.assign({}, editingItem[index], { editing: status }),
        ...editingItem.slice(index + 1)
    ]);
  }
  
  const changeItemDataTable = async (arg) => {
      setSavedItems([
          ...savedItems.slice(0, arg.index),
          Object.assign({}, savedItems[arg.index], {
              data: {
                  item_name: arg.itemName,
                  qty:savedItems[arg.index].qty,
              }
          }),
          ...savedItems.slice(arg.index + 1)
      ]);
  
      changePriceStatus(arg.index, false);
  }

  return (
    <>
    <SimpleHeader name="Edit Surat Jalan Kasir" parentName="SO" />
    <Container className="mt--6" fluid>
        <Row>
        <div className="col">
            <CardBody>
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                      <h3>Edit Surat Jalan Kasir</h3>
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
                                Alamat Kirim
                              </Label>
                              <Col sm={6}>
                                <Input
                                className="form-control-alternative"
                                  type="textarea"
                                  name="keterangan"
                                  rows = "6"
                                  placeholder="Masukan Alamat Kirim"
                                  value={keterangan}
                                  onChange={(e) => {
                                    setKeterangan(e.target.value);
                                  }}
                                />
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
                                        <td>
                                            {editingItem[key].editing ? (
                                                    <Input
                                                        placeholder="qty"
                                                        type="number"
                                                        value={savedItems[key].qty}
                                                        onChange={(e) => {
                                                            setSavedItems([
                                                                ...savedItems.slice(0, key),
                                                                Object.assign({}, savedItems[key], { qty: e.target.value}),
                                                                ...savedItems.slice(key + 1)
                                                            ]);
                                                        }}
                                                    />
                                            ) : (
                                                        <>{savedItem.qty}</>
                                                    )}
                                        </td>
                                        <td>{savedItem.satuan}</td>
                                        <td hidden>{savedItem.harga}</td>
                                        <td hidden>{savedItem.diskon_nominal}</td>
                                        <td hidden>{savedItem.diskon_persen}</td>
                                        <td>
                                            {editingItem[key].editing ? (
                                                <>
                                                    <Button color="warning" onClick={() => changeItemDataTable({
                                                        index: key,
                                                        itemName: savedItem.item_name,
                                                        diskon_nominal: savedItem.diskon_nominal,
                                                        diskon_persen: savedItem.diskon_persen,
                                                        harga: savedItem.harga,
                                                        qty: savedItem.qty,
                                                    })}>Update</Button>
                                                    <Button color="danger" onClick={() => {
                                                        setSavedItems([
                                                            ...savedItems.slice(0, key),
                                                            Object.assign({}, savedItems[key], {
                                                              itemName: savedItem.data.item_name,
                                                              diskon_nominal: savedItem.data.diskon_nominal,
                                                              diskon_persen: savedItem.data.diskon_persen,
                                                              harga: savedItem.data.harga,
                                                              qty: savedItem.data.qty,
                                                            }),
                                                            ...savedItems.slice(key + 1)
                                                        ]);

                                                        changePriceStatus(key, false);
                                                    }}>Cancel</Button>
                                                </>
                                            ) : (
                                                    <>
                                                        <Button color="warning" onClick={() => changePriceStatus(key, true)}>Edit</Button>
                                                    </>
                                                )}
                                        </td>
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
                      <Link className="btn btn-info" to="/admin/surat-jalan-kasir">
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