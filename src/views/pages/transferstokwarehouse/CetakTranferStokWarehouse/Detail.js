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
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  
} from "reactstrap";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function DetailCetakTransferStokWarehouse(props)  {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [warehouses1, setWarehouses1] = useState([]);
  const [warehouse1, setWarehouse1] = useState(warehouse);
  const [warehouses2, setWarehouses2] = useState([]);
  const [warehouse2, setWarehouse2] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [input, setInput] = useState("");
  const [savedItems, setSavedItems] = useState([]);
  const [qty, setQty] = useState(0);

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
        `${process.env.REACT_APP_API_BASE_URL}/transfer-warehouse/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        getWarehouse1(data.data.response.warehouse_id1);
        getWarehouse2(data.data.response.warehouse_id2);
        setKeterangan(data.data.response.keterangan);
        getItemDataSaved();
       
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/transfer-warehouse/item`, {

        tw_id: props.match.params.id

    }).then(async response => {
        let stateItem = [];

        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
                item_id: data.item_id,
                item_name:data.item_name,
                qty: data.qty,
                harga: data.harga,
                satuan: data.satuan,
                data: {
                    item_name: data.item_name,
                    harga: data.harga
                },
            }];
        }));

        setSavedItems(stateItem);
    })
}

  const getWarehouse2 = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/warehouse/list/all`,
        { headers }
      )
      .then((data) => {
        setWarehouses2(data.data.response);
        setWarehouse2(id)
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  const getWarehouse1 = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/warehouse/list/all`,
        { headers }
      )
      .then((data) => {
        setWarehouses1(data.data.response);
        setWarehouse1(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

 
 
  return (
    <>
    <SimpleHeader name="Detail Transfer Stok Warehouse" parentName="Inventori" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Card>
                <CardBody>
                    <CardHeader>
                      <h3>Transfer Stok Warehouse</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Warehouse 1
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                  name="person"
                                  type="select"
                                  value={warehouse1}
                                  onChange={(e) => {
                                    setWarehouse1(e.target.value);
                                  }}
                                >
                                  <option value=''>Pilih Warehouse</option>
                                  {warehouses1.map((warehouse, key) => {
                                      return (
                                        <option key={key} value={warehouse.id}>
                                          {warehouse.name}
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
                                disabled
                                  type="textarea"
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
                                Warehouse 2
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                  name="person"
                                  type="select"
                                  value={warehouse2}
                                  onChange={(e) => {
                                    setWarehouse2(e.target.value);
                                  }}
                                >
                                  <option value=''>Pilih Warehouse</option>
                                  {warehouses2.map((warehouse2, key) => {
                                      return (
                                        <option key={key} value={warehouse2.id}>
                                          {warehouse2.name}
                                        </option>
                                      );
                                    })}
                                </Input>
                              </Col>
                            </FormGroup>
                          </Col>
                      </Row>
                      <br></br>
                      <br></br>
                      <br></br>
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
                      <Link className="btn btn-info" to="/admin/transfer-warehouse-stock">
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