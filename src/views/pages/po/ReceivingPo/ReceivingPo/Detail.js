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

export default function DetailReceivingPo(props){
  const token = localStorage.token;
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState("");
  const [codereceiving, setCodeReceiving] = useState("");
  const [codepo, setCodePo] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [savedItems, setSavedItems] = useState([]);

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
        getItemDataSaved();
        setCodeReceiving(data.data.response.receiving_code);
        setCodePo(data.data.response.code_po);
        setKeterangan(data.data.response.keterangan);
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

        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
                item_id: data.item_id,
                item_name:data.item_name,
                satuan : data.satuan,
                item_code:data.item_code,
                qty: data.qty,
                qty_fisik: data.qty_fisik,
                harga: data.harga,
                diskon_persen : data.diskon_persen,
                diskon_nominal : data.diskon_nominal,
                data: {
                    item_name: data.item_name,
                    qty: data.qty,
                    qty_fisik: data.qty_fisik,
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

    const formatRupiah = (money) => {
      return new Intl.NumberFormat('id-ID',
          { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
      ).format(money);
    }
  return (
    <>
    <SimpleHeader name="Detail Receiving PO" parentName="PO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
          <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                      <h3>Detail Receiving PO</h3>
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
                                Kode Receiving
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
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
                          </Col>
                      </Row>
                   <br></br>
                   <br></br>
                   <br></br>
                      <Table size="sm" responsive>
                        <thead>
                        <tr>
                            <th>
                            Nama Item
                            </th>
                            <th>
                            Kode Item
                            </th>
                            <th hidden>
                            Harga
                            </th>
                            <th>
                            Qty 
                            </th>
                            <th>
                            Satuan
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
                                        <td hidden>{formatRupiah(savedItem.harga)}</td>
                                        <td>{savedItem.qty}</td>
                                        <td>{savedItem.satuan}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                      </Table>
                    </CardBody>
                <CardFooter>
                      <Link className="btn btn-info" to="/admin/receiving-po">
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
