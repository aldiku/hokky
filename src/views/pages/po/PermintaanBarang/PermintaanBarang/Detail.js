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
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

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

            await Promise.all(response.data.response.map(async (data) => {
                stateItem = [...stateItem, {
                    item_id: data.item_id,
                    item_name:data.item_name,
                    item_code:data.item_code,
                    qty: data.qty,
                    satuan: data.satuan,
                    description: data.description,
                    data: {
                        item_name: data.item_name,
                        harga: data.harga
                    },
                }];
            }));

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
                satuan : dataItem.satuan,
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
 
    const handleSubmit = (e) => {
      e.preventDefault();
      {
        
      EditData();
  
      }
    };
  
  return (
    <>
    <SimpleHeader name="Detail Permintaan Barang" parentName="PO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Card>
                <Form onSubmit={handleSubmit}>
                <CardBody>
                    <CardHeader>
                      <h3>Detail Permintaan Barang</h3>
                    </CardHeader>
                    <CardBody>
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
                              <Input
                              className="form-control-alternative" 
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
                                  </Input>
                              </Col>
                            </FormGroup>
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
                              Tipe Request
                            </Label>
                            <Col sm={7}>
                            <Input
                            className="form-control-alternative"
                            disabled
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
                      </Row>
                    </CardBody>
                        <Col xs="12">
                        <hr />
                        <h3>Item</h3>
                        </Col>
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
                                                <td>{savedItem.qty}</td>
                                                <td>{savedItem.satuan}</td>
                                            </tr>
                                        )
                                    })
                                }
                              </tbody>
                      </Table>
                    </CardBody>
                </CardBody>
                <CardFooter>
                      <Link className="btn btn-info" to="/admin/permintaan-barang">
                        Kembali
                      </Link>
                </CardFooter>
                </Form>
              </Card>
          </div>
        </Row>
    </Container>  
    </>
  );
}
