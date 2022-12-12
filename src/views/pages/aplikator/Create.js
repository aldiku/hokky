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
} from "reactstrap";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

const CreateAplikator = () => {
    const token = localStorage.token;
    const username = localStorage.username;
    const warehouse = localStorage.warehouse;
    let history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const [qty,setQty] = useState([]);
    const [harga, setHarga] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [active, setActive] = useState(0);
    const [filtered, setFiltered] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [savedItems, setSavedItems] = useState([]);
    const [nama,setNama] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [ongkir, setOngkir] = useState(0);
    const [lainnya, setLainnya] = useState(0);
    const [survey, setSurvey] = useState([]);
    const [nameFunction, setNameFunction] = useState([]);
    const [nameFunctions, setNameFunctions] = useState([]);
    const [input, setInput] = useState("");

  useEffect(() => {
    getFunction();
  }, []);


  const getFunction = (id) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
    axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/item-function/list`, { headers })
        .then((data) => {
            setNameFunctions(data.data.response);
            setNameFunction(id);
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
                harga: dataItem.harga
            }]);
    let data = {
      warehouse_id : parseInt(warehouse),
      username : username,
      function_id: parseInt(nameFunction),
      name : nama,
      durasi_survey : "",
      ongkir : parseFloat(ongkir),
      lainnya : parseFloat(lainnya),
      keterangan: keterangan ,
      items : dataItems
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/aplikator/save`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/aplikator");
        })
        .then((json) => {
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  const saveItem = () => {
    if (qty === '' || qty <= 0)
        return;

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, {
        page: 1,
        per_page: 1,
        item_name: input,
        warehouse_id:parseInt(warehouse)
    }).then(async response => {
        const length = response.data.response.length;
        if (length === 0)
            return;
            const idItem = response.data.response[0].id;
            const qtyy = qty;
            const headers = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            };
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/items-by-price?item_id=${idItem}&qty=${qtyy}
            `, {headers})
            .then(async response => {
                let stateItem = [];

                await Promise.all(response.data.response.map(async (data) => {
                    stateItem = [...savedItems, {
                        item_id: idItem,
                        item_name:data.item_name,
                        qty: qty,
                        harga: harga,
                        data: {
                            item_name: data.item_name,
                            qty: qty,
                            harga: harga
                        },
                    }];
                }));
          
        setSavedItems(stateItem);
    })
    });
}

const onChange = (e) => {
    const input = e.currentTarget.value;

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, {
        page: 1,
        per_page: 10,
        item_name: input,
        warehouse_id: parseInt(warehouse)
    }).then(async response => {
        let suggests = [];

        await Promise.all(response.data.response.map((data) =>
            suggests = [...suggests, data.item_name]
        ));

        setActive(0);
        setFiltered(suggests);
        setIsShow(true);
    });

    setInput(e.currentTarget.value);
};
const onClick = e => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText)
};
const onKeyDown = e => {
    if (e.keyCode === 13) { // enter key
        setActive(0);
        setIsShow(false);
        setInput(filtered[active])
    }
    else if (e.keyCode === 38) { // up arrow
        return (active === 0) ? null : setActive(active - 1);
    }
    else if (e.keyCode === 40) { // down arrow
        return (active - 1 === filtered.length) ? null : setActive(active + 1);
    }
};

const AutoCompleTes = () => {
    if (isShow && input) {
        if (filtered.length) {
            return (
                <ul className="autocomplete">
                    {filtered.map((suggestion, index) => {
                        let className;
                        if (index === active) {
                            className = "active";
                        }
                        return (
                            <li key={index} className={className} onClick={onClick}>
                                {suggestion}
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
 
  const handleSubmit = (e) => {
    e.preventDefault();
    {
      saveItem();
      setInput("");
      setQty([]);
      setHarga([]);
    }
  };

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

const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
        { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
  }
    
  // Change separator
	const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

	const handleSeparator = (e) => setInputAngka(addCommas(removeNonNumeric(e.target.value)));

  return (
    <>
    <SimpleHeader name="Tambah Aplikator" parentName="Master" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Card className="bg-secondary shadow">
                    <CardHeader>
                      <h3>Tambah Aplikator</h3>
                    </CardHeader>
                    <CardBody>
                        <Row md="12">
                            <Col md="6">
                                <CardBody>
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={4}>
                                            Nama
                                        </Label>
                                        <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                name="barcode"
                                                placeholder="Masukan Nama"
                                                value={nama}
                                                onChange={(e) => {
                                                    setNama(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={4}>
                                            keterangan
                                        </Label>
                                        <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                name="Supplier"
                                                type="textarea"
                                                rows="5"
                                                placeholder="Masukan Keterangan"
                                                value={keterangan}
                                                onChange={(e) => {
                                                    setKeterangan(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                </CardBody>
                            </Col>
                            <Col md="6">
                                <CardBody>
                                <FormGroup row>
                                            <Label for="exampleEmail" sm={4}>
                                                Function
                                            </Label>
                                            <Col sm={7}>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="function"
                                                    type="select"
                                                    value={nameFunction}
                                                    onChange={(e) => {
                                                        setNameFunction(e.target.value);
                                                    }}>
                                                    <option value="">Pilih Function</option>
                                                    {nameFunctions.map((nameFunction, key) => {
                                                        return (
                                                            <option key={key} value={nameFunction.id}>
                                                                {nameFunction.name}
                                                            </option>
                                                        );
                                                    })}
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={4}>
                                            Ongkir
                                        </Label>
                                        <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                name="barcode"
                                                placeholder="Masukan Nama"
                                                value={ongkir}
                                                onChange={(e) => {
                                                    setOngkir(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={4}>
                                            Lainnya
                                        </Label>
                                        <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                name="barcode"
                                                placeholder="Masukan Nama"
                                                value={lainnya}
                                                onChange={(e) => {
                                                    setLainnya(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                </CardBody>
                            </Col>
                        </Row>
                    </CardBody>
                    <Col xs="12">
                        <hr />
                        <h3>Tambah Item</h3>
                    </Col>
                    <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row md="12">
                          <Col md="6">
                            <FormGroup row>
                              <Label
                                  for="exampleEmail"
                                  sm={4}
                                >
                                  Item
                                </Label>
                              <Col sm={7}>
                              <Input
                                className="form-control-alternative"
                                  placeholder="Item ..."
                                  type="search"
                                  onChange={onChange}
                                  onKeyDown={onKeyDown}
                                  value={input}
                              />
                              </Col>
                              <AutoCompleTes />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                          <FormGroup row>
                            <Label
                                  for="exampleEmail"
                                  sm={4}
                                >
                                  Quantity
                              </Label>
                            <Col sm={7}>
                              <Input
                              className="form-control-alternative"
                                  placeholder="Qty"
                                  type="number"
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                                  for="exampleEmail"
                                  sm={4}
                                >
                                  Harga
                              </Label>
                            <Col sm={7}>
                              <Input
                              className="form-control-alternative"
                                  placeholder="Harga"
                                  type="text"
                                  value={harga}
                                  onChange={(e) => setHarga(e.target.value)}
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
                      <Col xl="12">
                      </Col>
                    </Form>
                      <Table>
                              <thead>
                                <tr>
                                  <th>
                                    Nama Item
                                  </th>
                                  <th>
                                    Harga
                                  </th>
                                  <th>
                                    Qty
                                  </th>
                                  <th>
                                    Sub Total
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
                                                <td>{formatRupiah(savedItem.harga)}</td>
                                                <td>{savedItem.qty}</td>
                                                <td>{formatRupiah(savedItem.harga * savedItem.qty)}</td>
                                                <td>
                                                    <Button color="danger" onClick={() => deleteItem(savedItem.item_id)}>Hapus</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                              </tbody>
                      </Table>
                    </CardBody>
                <CardFooter>
                      {!isLoading && (
                        <Button color="primary" onClick={() => CreateData()}>Tambah</Button>
                      )}
                      {isLoading && (
                        <Button color="primary" disabled>
                          <i className="fas fa-spinner fa-spin"></i>
                          {""}
                          loading...
                        </Button>
                      )}
                      <Link className="btn btn-info" to="/admin/permintaan-barang">
                        Kembali
                      </Link>
                </CardFooter>
              </Card>
          </div>
        </Row>
    </Container>  
    </>
  );
}

export default CreateAplikator;