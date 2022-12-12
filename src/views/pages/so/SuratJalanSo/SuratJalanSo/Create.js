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

const CreateSuratJalanSo = () => {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [pengiriman, setPengiriman] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [isShow1, setIsShow1] = useState(false);
  const [active1, setActive1] = useState(0);
  const [filtered1, setFiltered1] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [editingItem, setEditingitem] = useState([]);
  const [codeso, setCodeSo] = useState("");
  const [input1, setInput1] = useState("");
  const [alamat, setAlamat] = useState();
  const [diskonglobalnominal, setDiskonGlobalNominal] = useState();
  const [diskonglobalpersen,setDiskonGlobalPersen] = useState();
  const [ongkir, setOngkir] = useState(0);
  const [pajak, setPajak] = useState("");
  const [payment, setPayment] = useState();
  const [jangkawaktu1,setJangkaWaktu1] = useState(0);
  const [lainnya, setLainnya] = useState(0);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    getCustomer();

  }, []);

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

  function CreateData() {
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
          `${process.env.REACT_APP_API_BASE_URL}/surat-jalan-so/save`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/surat-jalan-so");
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

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/sales-order/page`, {
        page: 1,
        per_page: 10,
        status_ph: 5,
        so_code: input1,
        warehouse_id : parseInt(warehouse),
    }).then(async response => {
        let suggests = [];

        await Promise.all(response.data.response.map((data) =>
            suggests = [...suggests, data.so_code]
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

const saveItem1 = () => {

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/sales-order/page`, {
        page: 1,
        per_page: 1,
        status_ph: 5,
        code_so: input1,
        warehouse_id : parseInt(warehouse),
    }).then(res => {
        const length = res.data.response.length;
        if (length === 0)
            return;
            const idItem = res.data.response[0].id;

            axios.get(`${process.env.REACT_APP_API_BASE_URL}/sales-order/get/${idItem}`)
            .then(async response => {
                return {
                    item: response.data.response,
                };
              }).then((data) => {
                getCustomer(data.item.customer_id);
                setCodeSo(data.item.so_code);
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
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/sales-order/item-by-code`, {

        so_code: input1

    }).then(async response => {
    //     let stateItem = [];
    //     let tempItem = [];
    //     let stateEditing = [];

    //     await Promise.all(response.data.response.map(async (data) => {
    //         stateItem = [...stateItem, {
    //             item_id: data.item_id,
    //             item_name:data.item_name,
    //             qty: data.qty,
    //             harga: data.harga,
    //             diskon_nominal: data.diskon_nominal,
    //             diskon_persen: data.diskon_persen,
    //             data: {
    //                 item_name: data.item_name,
    //                 harga: data.harga
    //             },
    //         }];
    //     }));
    //     setSavedItems(stateItem);
    // })
        let stateItem = [];
        let stateEditing = [];
        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
              item_id: data.item_id,
              item_name:data.item_name,
              item_code : data.item_code,
              satuan : data.satuan,
              qty: data.qty,
              harga: data.harga,
              diskon_nominal: data.diskon_nominal,
              diskon_persen: data.diskon_persen,
                data: {
                    item_id: data.item_id,
                    item_name: data.item_name,
                    qty: data.qty,
                    harga: data.harga,
                    diskon_nominal: data.diskon_nominal,
                    diskon_persen: data.diskon_persen,
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
                item_code : arg.item_code,
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
    <SimpleHeader name="Buat Surat Jalan SO" parentName="SO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <CardBody>
              <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                      <h3>Buat Surat Jalan SO</h3>
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
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={3}
                              >
                                <b>Kode SO</b>
                              </Label>
                              <Col sm={6}>
                                <Input
                                className="form-control-alternative"
                                  placeholder="Masukan Kode SO"
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
                          <Button color="primary" className="mb-3" onClick={() => saveItem1()}>search</Button>
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
                                disabled
                                  type="textarea"
                                  name="Alamat Kirim"
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
                                        <td>{savedItem.data.item_name}</td>
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
                                                        item_code : savedItem.item_code,
                                                        satuan : savedItem.satuan,
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
                                                              item_code : savedItem.item_code,
                                                              satuan : savedItem.satuan,
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
                      <Link className="btn btn-info" to="/admin/surat-jalan-so">
                        Kembali
                      </Link>
                </CardFooter>
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

export default CreateSuratJalanSo;