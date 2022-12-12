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

const CreateTransferRak = () => {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [qty,setQty] = useState([]);
  const [typereq, setTypeReq] = useState([]);
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState("");
  const [keterangan,setKeterangan] = useState("");
  const [rak1, setRak1] = useState("");
  const [rak2, setRak2] = useState("");
  const [raks, setRaks] = useState([]);
  const [rakss, setRakss] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [savedItems, setSavedItems] = useState([]);
  const [input, setInput] = useState("");
  const [coderak, setCodeRak] = useState("");
  const [isSearchShoww, setIsSearchShoww] = useState(false);
  const [itemIdd, setItemIdd] = useState("");
	const [allItemm, setAllItemm] = useState([]);
	const [queryy, setQueryy] = useState("");
  const [editingItem, setEditingitem] = useState([{ editing: false}]);
  const [addingItem, setAddingItem] = useState(false);
  const headers = { Authorization: `Bearer ${token}` };
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [qtyTotal, setTotalQty] = useState(0);

  const searchh = async () => {
    if (Number(queryy) > 0) {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, { item_name: queryy , warehouse_id: parseInt(warehouse),  }, { headers });
      if (res.data.status !== 404) setAllItemm(res.data);
      else {
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, { item_name: queryy, warehouse_id: parseInt(warehouse), }, { headers });
        if (res.data.status !== 404) setAllItemm(res.data);
        else setAllItemm(null);
      }
    } else {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, { item_name: queryy, warehouse_id: parseInt(warehouse), }, { headers });
      if (res.data.status !== 404) setAllItemm(res.data);
      else setAllItemm(null);
    }
    setIsSearchShoww(true);
  };
  
  
  const handleEditQty = (index, value) => {
    let updateList = savedItems;
    let aqtyTotal = parseInt(updateList[index].harga) + value;
    
    if(!isNaN(value) && value.length > -1){
      updateList[index] = {...updateList[index], qty: value};
      setSavedItems(updateList);
      // setTotalPrice(totalPrice+plusTotal-minTotal);
      setTotalQty(qtyTotal + aqtyTotal);
      // setDiskonTotal(diskontotal + diskonnominal1 - diskonnominal2)
    }else{return false}
  }
  
  
  // save
  const saveItemOrUpdate = (item) => {
    let oldobj = savedItems.find(o => o.item_id === item.id);
    if(oldobj===undefined){
      setSavedItems([...savedItems,{
        item_id: item.id,
        item_name: item.item_name,
        satuan : item.satuan,
        qty: 1,
      }]);
      
    }else{
      let index = savedItems.findIndex(e=>e.item_id===item.id);
      let updateList = savedItems;
      let qtyupdate = parseInt(updateList[index].qty)+parseInt(1);
      updateList[index] = {...updateList[index], qty: qtyupdate};
      setSavedItems(updateList);
    };
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    {
      setQueryy("");
      setIsSearchShoww("");
      return true
    }
  };

  useEffect(() => {
    getRak1();
    getRak2();
  }, []);

  const getRak1 = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/rak/list/${warehouse}`,
        { headers }
      )
      .then((data) => {
        setRaks(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getRak2 = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/rak/list/${warehouse}`,
        { headers }
      )
      .then((data) => {
        setRakss(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
      code_rak1: rak1,
      code_rak2: rak2,
      type : parseInt(typereq),
      keterangan: keterangan ,
      items : dataItems
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/pindah-rak/save`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/transfer-rak");
        })
        .then((json) => {
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
  }


  const deleteItem = (id) => {
    let array = [...savedItems];

    let index = array.findIndex(object => {
        return object.item_id === id;
    });

    if (index !== -1) {
        setTotalPrice(totalPrice - array[index].data.price_1 * array[index].qty);
        array.splice(index, 1);
        setSavedItems(array);
    }
}

  return (
    <>
    <SimpleHeader name="Buat Transfer Rak" parentName="Inventori" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <CardBody>
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <h3>Buat Transfer Rak</h3>
                  </CardHeader>
                  <CardBody>
                    <Row md="12">
                        <Col md="6">
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={3}
                            >
                              Rak Asal
                            </Label>
                            <Col sm={6}>
                            <Input
                            className="form-control-alternative"
                                name="Tipe Request"
                                type="select"
                                value={rak1}
                                onChange={(e) => {
                                  setRak1(e.target.value);
                                }}
                              >
                                <option value="">Pilih Rak</option>
                                {raks.map((suppliers, key) => {
                                  return (
                                    <option key={key} value={suppliers.id}>
                                      {suppliers.rak_code}
                                    </option>
                                  );
                                })}
                              </Input>
                            </Col>
                          </FormGroup>
                          {/* <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={3}
                          >
                            Tipe Transfer
                          </Label>
                          <Col sm={6}>
                          <Input
                          className="form-control-alternative"
                              name="Tipe Request"
                              type="select"
                              value={typereq}
                              onChange={(e) => {
                                setTypeReq(e.target.value);
                              }}
                            >
                              <option value="" disabled selected hidden>Pilih Transfer</option>
                              <option value={1}>Masuk</option>
                              <option value={2}>Keluar</option>
                            </Input>
                          </Col>
                          </FormGroup> */}
                        </Col>
                        <Col md="6">
                        <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={3}
                            >
                              Rak Tujuan
                            </Label>
                            <Col sm={6}>
                            <Input
                            className="form-control-alternative"
                                name="Tipe Request"
                                type="select"
                                value={rak2}
                                onChange={(e) => {
                                  setRak2(e.target.value);
                                }}
                              >
                                <option value="">Pilih Rak</option>
                                {rakss.map((suppliers, key) => {
                                  return (
                                    <option key={key} value={suppliers.id}>
                                      {suppliers.rak_code}
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
                              Keterangan
                            </Label>
                            <Col sm={6}>
                              <Input
                              className="form-control-alternative"
                                type="textarea"
                                name="keterangan"
                                rows = "4"
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
                                      <td>
                                        <Input
                                          className="form-control-alternative"
                                          placeholder="qty"
                                          type="number"
                                          value={savedItem.qty}
                                          onChange={(e) => {
                                              handleEditQty(key, e.target.value);
                                          }}/>
                                      </td>
                                      <td>{savedItem.satuan}</td>
                                      <td>
                                        <Button color="danger" onClick={() => deleteItem(savedItem.item_id)}>Delete</Button>
                                      </td>
                                    </tr>
                                  )
                                })
                              }
                              <tr>
                                <td>
                                  <><Form onSubmit={handleSubmit}>
                                          <Input
                                            autoComplete="off"
                                            placeholder="Masukan Item Manual"
                                            type="search"
                                            onKeyDown={searchh}
                                            value={queryy}
                                            onChange={(e) => setQueryy(e.target.value)}
                                          />
                                          {/* <Button type="submit"><i className="fa fa-search" /></Button> */}
                                        
                                        {isSearchShoww && queryy && (
                                        <Card className="position-sticky boxShadow" style={{ maxHeight: "15.5rem", overflowY: "auto", paddingTop: "1rem", position: "relative" }}>
                                          <div style={{ position: "absolute", top: "2.5px", right: "1rem", cursor: "pointer", fontSize: "1rem" }}>
                                            <i className="fas fa-window-close text-danger" onClick={() => setIsSearchShoww(false)}></i>
                                          </div>
                                          {allItemm?.response ? (
                                            allItemm.response.map((item) => (
                                              <CardBody key={item.id} style={{ minHeight: "5rem", padding: "1rem" }} className="bgSearch" onClick={() => {saveItemOrUpdate(item);setQueryy('');setIsSearchShoww(false);}}>
                                                <div>
                                                  <b>Nama item:</b> {item.item_name}
                                                </div>
                                              </CardBody>
                                            ))
                                          ) : (
                                            <div className="text-center mb-3 text-danger">Item "{queryy}" tidak ada bosku!</div>
                                          )}
                                        </Card>
                                      )}
                                  </Form></>
                                  </td>
                                 </tr>
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
                {/* modal */}
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle} align="center"></ModalHeader>
                  <ModalBody align="center">
                  <font size="5"><b>Apakah Anda Sudah Yakin ?</b></font><br></br><br></br><br></br>
                  {!isLoading && (
                    <Button color="primary" onClick={() => CreateData()}>
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

export default CreateTransferRak;