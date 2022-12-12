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
import Select2 from "react-select2-wrapper";

const CreatePoRetur = () => {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [isShow1, setIsShow1] = useState(false);
  const [active1, setActive1] = useState(0);
  const [filtered1, setFiltered1] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [pocode, setPoCode] = useState("");
  const [input1, setInput1] = useState("");
  const [type,setType] =useState([]);
  const [returtipe,setReturTipe] = useState([]);
  const [ongkir, setOngkir] = useState([]);
  const [lainnya, setLainnya] = useState([]);
  const [editingItem, setEditingitem] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);


  useEffect(() => {
    getPerson();

  }, []);

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
        setPerson(id)
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
                harga: dataItem.harga,
                diskon_nominal:dataItem.diskon_nominal,
                diskon_persen:dataItem.diskon_persen,
            }]);
    let data = {
      warehouse_id : parseInt(warehouse),
      username : username,
      code_invoice: codeinvoice,
      pajak_id : parseInt(pajak),
      diskon_global_persen: parseInt(diskonglobalpersen),
      diskon_global_nominal: parseInt(diskonglobanominal),
      // code_po: pocode,
      // status_m: 3,
      status_d : 3,
      person_id: parseInt(person),
      ongkir:parseFloat(ongkir),
      // lainnya:parseFloat(lainnya),
      keterangan: keterangan ,
      type: parseInt(type),
      return_type: parseInt(returtipe),
      items : dataItems,
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/po-retur/save`,
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

const onChange1 = (e) => {
    const input1 = e.currentTarget.value;

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/invoice-po/page`, {
        page: 1,
        per_page: 10,
        approve:5, 
        status_ap:5,
        status_d: 5,
        invoice_code: input1,
    }).then(async response => {
        let suggests = [];

        await Promise.all(response.data.response.map((data) =>
            suggests = [...suggests, data.invoice_code]
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
        return (active1 - 1 === filtered1.length) ? null : setActive1(active1 + 1);
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

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/invoice-po/page`, {
        page: 1,
        per_page: 1,
        approve:5, 
        status_ap:5,
        status_d: 5,
        invoice_code: input1
    }).then(res => {
        const length = res.data.response.length;
        if (length === 0)
            return;
            const idItem = res.data.response[0].id;

            axios.get(`${process.env.REACT_APP_API_BASE_URL}/invoice-po/get/${idItem}`)
            .then(async response => {
                return {
                    item: response.data.response,
                };
              }).then((data) => {
                getPerson(data.item.person_id);
                setPoCode(data.item.code_po);
                setPoCode(data.item.invoice_code);
                setPoCode(data.item.code_receiving);
                setOngkir(data.item.ongkir);
                setLainnya(data.item.lainnya);
                setKeterangan(data.item.keterangan);
                getItemDataSaved();
              })
              .catch(function (error) {
                console.log(error);
              });
    });
}

const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/purchase-order/item-by-code`, {

        po_code: input1

    }).then(async response => {
        let stateItem = [];
        let stateEditing =[];

        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
                editing:false,
                item_id: data.item_id,
                item_name:data.item_name,
                qty: data.qty,
                harga: data.harga,
                diskon_nominal : data.diskon_nominal,
                diskon_persen : data.diskon_persen,
                data: {
                    item_name: data.item_name,
                    qty: data.qty,
                    harga: data.harga,
                    diskon_nominal : data.diskon_nominal,
                    diskon_persen : data.diskon_persen,
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


const formatRupiah = (money) => {
  return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
  ).format(money);
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
                  qty:savedItems[arg.index].qty,
                  harga: savedItems[arg.index].harga,
                  diskon_nominal:savedItems[arg.index].diskon_nominal,
                  diskon_persen:savedItems[arg.index].diskon_persen,
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
    <SimpleHeader name="Po Retur" parentName="PO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
          <Card className="bg-secondary shadow">
                <Form onSubmit={handleSubmit}>
                    <CardHeader className="bg-white border-0">
                      <h3>Po Retur</h3>
                    </CardHeader>
                    <CardBody>
                    <Row md="12">
                          <Col md="6">
                          <Input
                                  type="hidden"
                                  name="desc"
                                  placeholder="Masukan Keterangan"
                                  value={pocode}
                                  onChange={(e) => {
                                    setPoCode(e.target.value);
                                  }}
                                />
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Kode PO
                              </Label>
                              <Col sm={7}>
                                <Input
                                  placeholder="Masukan Kode PO"
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
                                sm={4}
                              >
                                Supplier
                              </Label>
                              <Col sm={7}>
                                {/* <Input
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
                                </Input> */}
                                <Select2
                                      className="form-control-alternative"
                                      defaultValue="1"
                                      value={person}
                                      onChange={(e) => {
                                        setPerson(e.target.value);
                                      }}
                                      options={{
                                        placeholder: "Pilih Customer"
                                      }}
                                      data={persons.map((person) => {
                                        return (
                                        { id: person.id, text: person.person_name}
                                        );
                                      })}
                                    />
                              </Col>
                            </FormGroup><FormGroup row>
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
                          </Col>
                          <Col md="6">
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Ongkir
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Ongkir"
                                  value={ongkir}
                                  onChange={(e) => {
                                    setOngkir(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            {/* <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Lain-Lain
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Lainnya"
                                  value={lainnya}
                                  onChange={(e) => {
                                    setLainnya(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup> */}
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
                                sm={4}
                              >
                                Tipe
                              </Label>
                              <Col sm={7}>
                                <Input
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
                                Tipe Retur
                              </Label>
                              <Col sm={7}>
                                <Input
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
                          </Col>
                      </Row>
                        <Col xs="12">
                            <hr />
                        </Col>
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
                            Harga
                            </th>
                            <th>
                            Diskon Persen
                            </th>
                            <th>
                            Diskon Nominal
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
                                                <td>
                                                    {editingItem[key].editing ? (
                                                        <Input
                                                            placeholder="qty Fisik"
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
                                                            <>{savedItem.data.qty}</>
                                                        )}
                                                </td>
                                                <td>{formatRupiah(savedItem.data.harga)}</td>
                                                <td>{formatRupiah(savedItem.data.diskon_persen)}</td>
                                                <td>{formatRupiah(savedItem.data.diskon_nominal)}</td>
                                                <td>
                                                    {editingItem[key].editing ? (
                                                        <>
                                                            <Button color="warning" onClick={() => changeItemDataTable({
                                                                index: key,
                                                                itemName: savedItem.data.item_name,
                                                                qty : savedItem.data.qty,
                                                                harga: savedItem.data.harga,
                                                                diskon_nominal: savedItem.data.diskon_nominal,
                                                                diskon_persen: savedItem.data.diskon_persen

                                                            })}>Update</Button>
                                                            <Button color="danger" onClick={() => {
                                                                setSavedItems([
                                                                    ...savedItems.slice(0, key),
                                                                    Object.assign({}, savedItems[key], { qty: savedItem.data.qty}),
                                                                    ...savedItems.slice(key + 1)
                                                                ]);

                                                                changePriceStatus(key, false);
                                                            }}>Cancel</Button>
                                                        </>
                                                    ) : (
                                                            <>
                                                                <Button color="warning" onClick={() => changePriceStatus(key, true)}>Edit</Button>
                                                                <Button color="danger" onClick={() => deleteItem(savedItem.item_id)}>Delete</Button>
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
                </Form>
              </Card>
          </div>
        </Row>
    </Container>  
    </>
  );
}

export default CreatePoRetur;

