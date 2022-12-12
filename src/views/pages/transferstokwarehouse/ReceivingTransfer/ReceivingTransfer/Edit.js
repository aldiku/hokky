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
  const [savedItems, setSavedItems] = useState([]);
  const [editingItem, setEditingitem] = useState([]);
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
        let stateEditing = [];
        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
                item_id: data.item_id,
                item_name:data.item_name,
                item_code:data.item_code,
                satuan : data.satuan,
                qty: data.qty,
                data: {
                    item_name: data.item_name,
                    item_name:data.item_name,
                item_code:data.item_code,
                    qty: data.qty,
                },
            }];stateEditing = [...stateEditing, {
              editing: false
          }];
      }));
        setEditingitem(stateEditing);
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
      username : username,
      status_receive: 3,
      tr_code : codetr,
      code_tw : codetw,
      pengiriman: parseInt(pengiriman),
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
                  item_code: arg.item_code,
                  satuan : arg.satuan,
                  qty:savedItems[arg.index].qty,
              }
          }),
          ...savedItems.slice(arg.index + 1)
      ]);
  
      changePriceStatus(arg.index, false);
  }

 
  return (
    <>
    <SimpleHeader name="Edit Transfer Receiving" parentName="Inventori" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <CardBody>
              <Card className="bg-secondary shadow">
                <Form onSubmit={handleSubmit}>
                    <CardHeader className="bg-white border-0">
                      <h3>Edit Transfer Receiving</h3>
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
                                  rows = "7"
                                  placeholder="Masukan Keterangan"
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
                            <th>
                            
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
                                        <td>{savedItem.data.satuan}</td>
                                        <td>
                                            {editingItem[key].editing ? (
                                                <>
                                                    <Button color="warning" onClick={() => changeItemDataTable({
                                                        index: key,
                                                        itemName: savedItem.data.item_name,
                                                        item_code:savedItem.data.item_code,
                                                          satuan:savedItem.data.satuan,
                                                        qty: savedItem.data.qty,
                                                    })}>Update</Button>
                                                    <Button color="danger" onClick={() => {
                                                        setSavedItems([
                                                            ...savedItems.slice(0, key),
                                                            Object.assign({}, savedItems[key], {
                                                              itemName: savedItem.data.item_name,
                                                              item_code: savedItem.data.item_code,
                                                              satuan:savedItem.data.satuan, 
                                                              qty: savedItem.data.qty}),
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