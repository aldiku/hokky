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

export default function EditReceivingPo(props){
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState("");
  const [codereceiving, setCodeReceiving] = useState("");
  const [codepo, setCodePo] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [savedItems, setSavedItems] = useState([]);
  const [editingItem, setEditingitem] = useState([]);
  const [ongkir, setOngkir] = useState([]);
  const [lainnya, setLainnya] = useState([]);
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
        setOngkir(data.data.response.ongkir);
        setLainnya(data.data.response.lainnya);
        setCodeReceiving(data.data.response.receiving_code);
        setCodePo(data.data.response.code_po);
        setKeterangan(data.data.response.keterangan);
        getItemDataSaved();
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
        let stateEditing = [];
        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
              item_id: data.item_id,
              item_name:data.item_name,
              item_code:data.item_code,
              satuan:data.satuan,
              qty: data.qty,
              harga:data.harga,
              diskon_nominal: data.diskon_nominal,
              diskon_persen: data.diskon_persen,
              data: {
                  item_name: data.item_name,
                  item_code:data.item_code,
                  satuan:data.satuan,
                  qty: data.qty,
              },
          }]; stateEditing = [...stateEditing, {
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
                harga:dataItem.harga,
                diskon_nominal: dataItem.diskon_nominal,
                diskon_persen: dataItem.diskon_persen,
            }]);
    let data = {
      warehouse_id : parseInt(warehouse),
      username : username,
      code_po: codepo,
      ongkir: parseInt(ongkir),
      lainnya: parseInt(lainnya),
      receiving_code: codereceiving,
      person_id: parseInt(person),
      status_receive : 3, 
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
                      item_code : arg.item_code,
                      satuan : arg.satuan,
                      qty:savedItems[arg.index].qty,
                      harga : savedItems[arg.index].harga,
                      diskon_nominal: savedItems[arg.index].diskon_nominal,
                      diskon_persen : savedItems[arg.index].diskon_persen,
                  }
              }),
              ...savedItems.slice(arg.index + 1)
          ]);
      
          changePriceStatus(arg.index, false);
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
    <SimpleHeader name="Edit Receiving PO" parentName="PO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Card className="bg-secondary shadow">
                <Form onSubmit={handleSubmit}>
                    <CardHeader className="bg-white border-0">
                      <h3>Edit Receiving PO</h3>
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
                                disabled
                                className="form-control-alternative"
                                autoComplete="off"
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
                                disabled
                                className="form-control-alternative"
                                autoComplete="off"
                                  type="textarea"
                                  rows = "7"
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
                   <Table size="sm" responsive>
                        <thead>
                        <tr>
                            <th><b>Nama Item</b></th>
                            <th><b>Kode Item</b></th>
                            <th><b>Qty</b></th>
                            <th><b>Satuan</b></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            savedItems.map((savedItem, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{savedItem.data.item_name}</td>
                                        <td>{savedItem.data.item_code}</td>
                                        <td hidden>{formatRupiah(savedItem.harga)}</td>
                                        <td>
                                            {editingItem[key].editing ? (
                                                    <Input
                                                    className="form-control-alternative"
                                                    autoComplete="off"
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
                                        <td hidden>{savedItem.diskon_nominal}</td>
                                        <td hidden>{savedItem.diskon_persen}</td>
                                        <td>
                                            {editingItem[key].editing ? (
                                                <>
                                                    <Button color="warning" onClick={() => changeItemDataTable({
                                                        index: key,
                                                        itemName: savedItem.data.item_name,
                                                        item_code : savedItem.item_code,
                                                        satuan : savedItem.satuan,
                                                        qty: savedItem.data.qty,
                                                        harga: savedItem.data.harga,
                                                        diskon_nominal : savedItem.data.diskon_nominal,
                                                        diskon_persen : savedItem.data.diskon_persen
                                                    })}>Update</Button>
                                                    <Button color="danger" onClick={() => {
                                                        setSavedItems([
                                                            ...savedItems.slice(0, key),
                                                            Object.assign({}, savedItems[key], { 
                                                              qty: savedItem.data.qty,
                                                              itemName: savedItem.data.item_name,
                                                              item_code : savedItem.item_code,
                                                              satuan : savedItem.satuan,
                                                            
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
