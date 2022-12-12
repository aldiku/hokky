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

const CreateReceivingTransfer = () => {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  
  let history = useHistory();

  const [isLoading, setLoading] = useState(false);
  const [pengiriman, setPengiriman] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isShow1, setIsShow1] = useState(false);
  const [tempSavedItems, setTempSavedItems] = useState([]);
  const [editingItem, setEditingitem] = useState([]);
  const [qty, setQty] = useState(0);
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [active1, setActive1] = useState(0);
  const [filtered1, setFiltered1] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [savedItems, setSavedItems] = useState([]);
  const [codetw, setCodeTW] = useState("");
  const [input, setInput] = useState("");
  const [input1, setInput1] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  function CreateData() {
    setLoading(true);
    let dataItems = [];
        savedItems.map((dataItem) => dataItems = [...dataItems, 
            { 
                item_id: dataItem.item_id, 
                qty: dataItem.qty,
            }]);
    let data = {
      warehouse_id : parseInt(warehouse),
      username : username,
      code_tw: codetw,
      pengiriman: parseInt(pengiriman),
      keterangan: keterangan ,
      items : dataItems
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/transfer-receiving/save`,
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

const onChange1 = (e) => {
    const input1 = e.currentTarget.value;

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/transfer-warehouse/page`, {
        page: 1,
        per_page: 10,
        status_d: 5 ,
        status_m : 5 ,
        tw_code: input1 ,
        warehouse_id : parseInt(warehouse),
    }).then(async response => {
        let suggests = [];

        await Promise.all(response.data.response.map((data) =>
            suggests = [...suggests, data.tw_code]
        ));

        setActive1(0);
        setFiltered1(suggests);
        setIsShow1(true);

    });

    setInput1(e.currentTarget.value);
};

const onClick1 = e => {
    setActive1(0);
    setFiltered1([]);
    setIsShow1(false);
    setInput1(e.currentTarget.innerText)
};

const onKeyDown1 = e => {
    if (e.keyCode === 13) { // enter key
        setActive1(0);
        setIsShow1(false);
        setInput1(filtered1[active1])
    }
    else if (e.keyCode === 38) { // up arrow
        return (active1 === 0) ? null : setActive1(active1 - 1);
    }
    else if (e.keyCode === 40) { // down arrow
        return (active1 - 1 === filtered.length) ? null : setActive1(active1 + 1);
    }
};

const AutoCompleTes1 = () => {
    if (isShow1 && input1) {
        if (filtered1.length) {
            return (
                <ul className="autocomplete">
                    {filtered1.map((suggestion1, index1) => {
                        let className;
                        if (index1 === active1) {
                            className = "active";
                        }
                        return (
                            <li key={index1} className={className} onClick={onClick1}>
                                {suggestion1}
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            return (
                <div className="no-autocomplete">
                    <em>Not found</em>
                </div>
            );
        }
    }
    return <></>;
}

//menampilkan search getbyid
const saveItem1 = () => {

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/transfer-warehouse/page`, {
        page: 1,
        per_page: 1,
        tw_code: input1,
        warehouse_id : parseInt(warehouse),
    }).then(res => {
        const length = res.data.response.length;
        if (length === 0)
            return;
            const idItem = res.data.response[0].id;

            axios.get(`${process.env.REACT_APP_API_BASE_URL}/transfer-warehouse/get/${idItem}`)
            .then(async response => {
                return {
                    item: response.data.response,
                };
              }).then((data) => {
                setCodeTW(data.item.tw_code);
                setPengiriman(data.item.pengiriman);
                setKeterangan(data.item.keterangan);
                getItemDataSaved();
              })
              .catch(function (error) {
                console.log(error);
              });
    });
}

const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/transfer-warehouse/item-by-code`, {

        tw_code: input1

    }).then(async response => {
        let stateItem = [];
        let stateEditing = [];

        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
                item_id: data.item_id,
                item_name:data.item_name,
                item_code:data.item_code,
                satuan:data.satuan,
                qty: data.qty,
                data: {
                    item_name: data.item_name,
                    item_code:data.item_code,
                    satuan:data.satuan,
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
                item_code:arg.item_code,
                satuan:arg.satuan,
                qty:savedItems[arg.index].qty,
            }
        }),
        ...savedItems.slice(arg.index + 1)
    ]);

    changePriceStatus(arg.index, false);
}

  const handleSubmit = (e) => {
    {
      CreateData();
    }
  };

  return (
    <>
    <SimpleHeader name="Tambah Receiving Transfer" parentName="Inventori" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <CardBody>
              <Card className="bg-secondary shadow">
                <Form onSubmit={handleSubmit}>
                  
                      <CardHeader className="bg-white border-0">
                        <h3>Tambah Receiving Transfer </h3>
                      </CardHeader>
                      <CardBody>
                          <Row md="12">
                            <Col md="6">
                            <Input
                                    type="hidden"
                                    name="desc"
                                    placeholder="Masukan Keterangan"
                                    value={codetw}
                                    onChange={(e) => {
                                      setCodeTW(e.target.value);
                                    }}
                                  />
                            <FormGroup row>
                                <Label
                                  for="exampleEmail"
                                  sm={3}
                                >
                                  Kode
                                </Label>
                                <Col sm={7}>
                                  <Input
                                    placeholder="Masukan Kode Transfef Stok "
                                    type="search"
                                    onChange={onChange1}
                                    onKeyDown={onKeyDown1}
                                    value={input1}
                                />
                                <AutoCompleTes1 />
                                </Col>                             
                              </FormGroup>
                            </Col>
                            <Col md="6">
                            <Button color="primary" className="mb-3" onClick={() => saveItem1()}>Search</Button>
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
                                    rows = "7"
                                    name="keterangan"
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
                        <h3>Item </h3>
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
                                                                qty: savedItem.data.qty,
                                                                itemName: savedItem.data.item_name,
                                                                item_code: savedItem.data.item_code,
                                                                satuan:savedItem.data.satuan,}),
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

export default CreateReceivingTransfer;