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

const Edit1Adjustment = (props ) => {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [keterangan,setKeterangan] = useState("");
  const [reasons, setReasons] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [editingItem, setEditingitem] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [qtyTotal, setTotalQty] = useState(0);
  const [allItemm, setAllItemm] = useState([]);
  const [queryy, setQueryy] = useState("");
  const [isSearchShoww, setIsSearchShoww] = useState(false);
  const headers = { Authorization: `Bearer ${token}` };

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
        `${process.env.REACT_APP_API_BASE_URL}/adjustment/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        setKeterangan(data.data.response.keterangan);
        getItemDataSaved();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getItemDataSaved = () => {
      axios.post(`${process.env.REACT_APP_API_BASE_URL}/adjustment/item`, {

        adjustment_id: props.match.params.id

      }).then(async response => {
          let stateItem = [];
          let stateEditing = [];
          await Promise.all(response.data.response.map(async (data) => {
              stateItem = [...stateItem, {
                  item_id: data.item_id,
                  item_name:data.item_name,
                  qty: data.qty,
                  reason:data.reason,
                  ket:data.ket,
                  data: {
                    item_name: data.item_name,
                    qty: data.qty,
                    reason:data.reason,
                    ket:data.ket,
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
    setTotalQty(qtyTotal + aqtyTotal);
  }else{return false}
}

const handleEditReason = (index, value) => {
  let updateList = savedItems;
  let aqtyTotal = value;
  
  if(value){
    updateList[index] = {...updateList[index], reason: value};
    setSavedItems(updateList);
    setTotalQty(qtyTotal + aqtyTotal);
  }else{return false}
}

const handleEditKeterangan = (index, value) => {
  let updateList = savedItems;
  let aqtyTotal =  value;
  
  if(value){
    updateList[index] = {...updateList[index], ket: value};
    setSavedItems(updateList);
    setTotalQty(qtyTotal + aqtyTotal);
  }else{return false}
}

const saveItemOrUpdate = (item) => {
  let oldobj = savedItems.find(o => o.item_id === item.id);
  if(oldobj===undefined){
    setSavedItems([...savedItems,{
      item_id: item.id,
      item_name: item.item_name,
      qty: 1,
      reason : item.reason,
      ket : item.ket, 
    }]);
    
  }else{
    let index = savedItems.findIndex(e=>e.item_id===item.id);
    let updateList = savedItems;
    let qtyupdate = parseInt(updateList[index].qty)+parseInt(1);
    updateList[index] = {...updateList[index], qty: qtyupdate};
    setSavedItems(updateList);
  };
}

  useEffect(() => {
    getReason();
  }, []);

  const getReason = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/reason/list/`,
        { headers }
      )
      .then((data) => {
        setReasons(data.data.response);
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
                reason:dataItem.reason,
                ket:dataItem.ket,
            }]);
    let data = {
      status_d : 3,
      warehouse_id : parseInt(warehouse),
      username : username,
      keterangan: keterangan ,
      items : dataItems
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/adjustment/update/${props.match.params.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/stock-adjustment");
        })
        .then((json) => {
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

//   const saveItem = () => {
//     if (qty === '' || qty <= -1000)
//         return;

//         axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, {
//             page: 1,
//             per_page: 1,
//             item_name: input
//         }).then(async response => {
//             const length = response.data.response.length;
//             if (length === 0)
//                 return;

//             const idItem = response.data.response[0].id;

//             axios.get(`${process.env.REACT_APP_API_BASE_URL}/items/${idItem}`)
//                 .then(async response => {
//                     return {
//                         item: response.data.response.items,
//                     };
//                 }).then((data) => {
//                     let stateItem = [...savedItems, {
//                         item_id: idItem,
//                         qty: parseInt(qty),
//                         reason:reason,
//                         ket:ket,
//                         data: data.item,
//                     }];
//                     setSavedItems(stateItem);
//                 });
//         });
// }

// const onChange = (e) => {
//     const input = e.currentTarget.value;

//     axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, {
//         page: 1,
//         per_page: 10,
//         item_name: input,
//         warehouse_id: parseInt(warehouse)
//     }).then(async response => {
//         let suggests = [];

//         await Promise.all(response.data.response.map((data) =>
//             suggests = [...suggests, data.item_name]
//         ));

//         setActive(0);
//         setFiltered(suggests);
//         setIsShow(true);
//     });

//     setInput(e.currentTarget.value);
// };
// const onClick = e => {
//     setActive(0);
//     setFiltered([]);
//     setIsShow(false);
//     setInput(e.currentTarget.innerText)
// };
// const onKeyDown = e => {
//     if (e.keyCode === 13) { // enter key
//         setActive(0);
//         setIsShow(false);
//         setInput(filtered[active])
//     }
//     else if (e.keyCode === 38) { // up arrow
//         return (active === 0) ? null : setActive(active - 1);
//     }
//     else if (e.keyCode === 40) { // down arrow
//         return (active - 1 === filtered.length) ? null : setActive(active + 1);
//     }
// };

// const AutoCompleTes = () => {
//     if (isShow && input) {
//         if (filtered.length) {
//             return (
//                 <ul className="autocomplete">
//                     {filtered.map((suggestion, index) => {
//                         let className;
//                         if (index === active) {
//                             className = "active";
//                         }
//                         return (
//                             <li key={index} className={className} onClick={onClick}>
//                                 {suggestion}
//                             </li>
//                         );
//                     })}
//                 </ul>
//             );
//         } else {
//             return (
//                 <div className="no-autocomplete">
//                     <em>Not found</em>
//                 </div>
//             );
//         }
//     }
//     return <></>;
// }
 
const handleSubmit = async (e) => {
  e.preventDefault();
  {
    setQueryy("");
    setIsSearchShoww("");
    return true
  }
};

  const deleteItem = (id) => {
    let array = [...savedItems];

    let index = array.findIndex(object => {
        return object.item_id === id;
    });

    if (index !== -1) {
        array.splice(index, 1);
        setSavedItems(array);
    }
}

  return (
    <>
    <SimpleHeader name="Adjustment" parentName="Inventori" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
          <CardBody>
                  <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                      <h3>Adjustment</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="9">
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={2}
                              >
                                Keterangan
                              </Label>
                              <Col sm={10}>
                                <Input
                                autoComplete="off"
                                  type="textarea"
                                  name="keterangan"
                                  placeholder="Masukan Keterangan"
                                  style={{
                                    fontSize: 14,
                                    paddingTop: 20,
                                    top: "50%",
                                    height: 117,
                                    resize: "none",
                                  }}
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
                    <CardHeader>
                      <h3>Item </h3>
                    </CardHeader>
                    {/* <CardBody>
                      <Form onSubmit={handleSubmit}>
                        <Row md="12">
                            <Col md="6">
                              <FormGroup row>
                                <Label
                                    for="exampleEmail"
                                    sm={3}
                                  >
                                    Item
                                  </Label>
                                <Col sm={6}>
                                <Input
                                autoComplete="off"
                                    placeholder="Item"
                                    type="search"
                                    onChange={onChange}
                                    onKeyDown={onKeyDown}
                                    value={input}
                                />
                                </Col>
                                <AutoCompleTes />
                              </FormGroup>
                              <FormGroup row>
                              <Label
                                  for="exampleEmail"
                                  sm={3}
                                >
                                  Alasan
                              </Label>
                              <Col sm={6}>
                                <Input
                                autoComplete="off"
                                    type="select"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                >
                                 <option value="">Pilih Alasan</option>
                                    {reasons.map((reason, key) => {
                                        return (
                                        <option key={key} value={reason.description}>
                                            {reason.description}
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
                                  sm={3}
                                >
                                  Quantity
                              </Label>
                              <Col sm={6}>
                                <Input
                                autoComplete="off"
                                    placeholder="Qty"
                                    type="text"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                />
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
                                autoComplete="off"
                                    placeholder="Masukan Keterangan"
                                    type="textarea"
                                    style={{
                                        fontSize: 14,
                                        paddingTop: 20,
                                        top: "50%",
                                        height: 117,
                                        resize: "none",
                                    }}
                                    value={ket}
                                    onChange={(e) => setKet(e.target.value)}
                                />
                              </Col>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row md="12">
                            <Col md="6">
                            </Col>
                            <Col md="6">
                            <FormGroup row>
                              <Label
                                    for="exampleEmail"
                                    sm={3}
                                  >
                                </Label>
                              <Col sm={6}>
                              <Button color="primary" type="submit">Tambah</Button>
                              </Col>
                            </FormGroup>
                            </Col>
                        </Row>
                      </Form>
                      <Table>
                              <thead>
                                <tr>
                                  <th>
                                    Nama Item
                                  </th>
                                  <th>
                                    Qty
                                  </th>
                                  <th>
                                    Alasan
                                  </th>
                                  <th>
                                    Keterangan
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
                                                <td>{savedItem.qty}</td>
                                                <td>{savedItem.reason}</td>
                                                <td>{savedItem.ket}</td>
                                                <td>
                                                    <Button color="danger" onClick={() => deleteItem(savedItem.item_id)}>Hapus</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                              </tbody>
                      </Table>
                    </CardBody> */}
                    <CardBody>
                          <Table size="sm" responsive>
                            <thead>
                              <tr>
                                <th><b>Nama Item</b></th>
                                {/* <th><b>Harga</b></th> */}
                                <th><b>Qty</b></th>
                                <th><b>Alasan</b></th>
                                <th><b>Keterangan</b></th>
                                {/* <th><b>Sub Total</b></th> */}
                                {/* <th>
                                  {editable?(<Button color="danger" onClick={() => setEditable(false)} size="sm">Simpan</Button>
                                  ):(<Button onClick={() => setIsConfEditableOpen(true)} size="sm">Izinkan Edit</Button>)}
                                </th> */}
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
                                      <td>
                                          <Input
                                              className="form-control-alternative"
                                              autoComplete="off"
                                              type="select"
                                              value={savedItem.reason}
                                              onChange={(e) => {
                                                handleEditReason(key, e.target.value);
                                            }}>
                                           <option value="" disabled hidden selected>Pilih Alasan</option>
                                              {reasons.map((reason, key) => {
                                                  return (
                                                  <option key={key} value={reason.description}>
                                                      {reason.description}
                                                  </option>
                                                  );
                                              })}
                                        </Input>
                                      </td>
                                      <td>
                                           <Input
                                          className="form-control-alternative"
                                          placeholder="Keterangan"
                                          type="text"
                                          value={savedItem.ket}
                                          onChange={(e) => {
                                            handleEditKeterangan(key, e.target.value);
                                          }}/>
                                      </td>
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
                      <Link className="btn btn-info" to="/admin/stock-adjustment">
                        Kembali
                      </Link>
                </CardFooter>
              </Card>
              </CardBody>
          </div>
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
        </Row>
    </Container>  
    </>
  );
}

export default Edit1Adjustment;