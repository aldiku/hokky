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
import Select2 from "react-select2-wrapper";

export default function EditPermintaanBarang(props) {
    const token = localStorage.token;
    const warehouse = localStorage.warehouse;
    const username = localStorage.username;
    let history = useHistory();
    const [persons, setPersons] = useState([]);
    const [person, setPerson] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [rfq_code,setRfqCode] = useState("");
    const [qty,setQty] = useState([]);
    const [active, setActive] = useState(0);
    const [typereq,setTypeReq] = useState([]);
    const [keterangan,setKeterangan] = useState("");
    const [input, setInput] = useState("");
    const [savedItems, setSavedItems] = useState([]);
    const [totalPrice,setTotalPrice] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [isShow, setIsShow] = useState(false);
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
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items-po`, { item_info: queryy , warehouse_id: parseInt(warehouse),  }, { headers });
        if (res.data.status !== 404) setAllItemm(res.data);
        else {
          const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items-po`, { item_info: queryy, warehouse_id: parseInt(warehouse), }, { headers });
          if (res.data.status !== 404) setAllItemm(res.data);
          else setAllItemm(null);
        }
      } else {
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items-po`, { item_info: queryy, warehouse_id: parseInt(warehouse), }, { headers });
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
          item_code: item.item_code,
          satuan: item.satuan,
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
          getItemDataSaved();
          setRfqCode(data.data.response.rfq_code);
          setQty(data.data.response.qty_total);
          setTypeReq(data.data.response.type);
          setKeterangan(data.data.response.keterangan);
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
            let stateEditing = [];

            await Promise.all(response.data.response.map(async (data) => {
                stateItem = [...stateItem, {
                    editing:false,
                    item_id: data.item_id,
                    item_name:data.item_name,
                    item_code : data.item_code,
                    satuan:data.satuan, 
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
        username : username,
        person_id: parseInt(person),
        type : parseInt(typereq),
        keterangan: keterangan ,
        status_rfq : 3,
        admin_po: "",
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
 

      const deleteItem = (id) => {
        let array = [...savedItems];
    
        let index = array.findIndex(object => {
            return object.item_id === id;
        });
    
        if (index !== -1) {
            setTotalPrice(totalPrice - array[index].data.harga * array[index].qty);
            array.splice(index, 1);
            setSavedItems(array);
        }
    }
  
  return (
    <>
    <SimpleHeader name="Edit Permintaan Barang" parentName="PO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <CardBody>
              <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                      <h3>Edit Permintaan Barang</h3>
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
                              {/* <Input
                              className="form-control-alternative"
                                  name="person"
                                  type="select"
                                  value={person}
                                  onChange={(e) => {
                                    setPerson(e.target.value);
                                  }}
                                >
                                  <option value='' disabled selected hidden>Pilih Supplier</option>
                                  {persons.map((person, key) => {
                                      return (
                                        <option key={key} value={person.id}>
                                          {person.person_name}
                                        </option>
                                      );
                                    })}
                                  </Input> */}
                                   <Select2
                                      className="form-control-alternative"
                                      defaultValue="1"
                                      value={person}
                                      onChange={(e) => {
                                        setPerson(e.target.value);
                                      }}
                                      options={{
                                        placeholder: "Pilih Supplier"
                                      }}
                                      data={persons.map((person) => {
                                        return (
                                        { id: person.id, text: person.person_name}
                                        );
                                      })}
                                    />
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
                            className="form-control-alternative"
                                name="Tipe Po"
                                type="select"
                                value={typereq}
                                onChange={(e) => {
                                    setTypeReq(e.target.value);
                                }}
                              >
                                <option value="" disabled selected hidden>Pilih Request</option>
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
                                className="form-control-alternative"
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
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle} align="center"></ModalHeader>
                  <ModalBody align="center">
                  <font size="5"><b>Apakah Anda Sudah Yakin ?</b></font><br></br><br></br><br></br>
                  {!isLoading && (
                    <Button color="primary" onClick={() => EditData()}>
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
