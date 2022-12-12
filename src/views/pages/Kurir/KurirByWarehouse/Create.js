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

const CreateKurirByWarehouse = () => {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [kurirs, setKurirs] = useState([]);
  const [kurir, setKurir] = useState("");
  const [tipekurirs, setTipeKurirs] = useState([]);
  const [tipekurir, setTipeKurir] = useState("");
  const [grupitems, setGrupItems] = useState([]);
  const [grupitem, setGrupItem] = useState("");
  const [keterangan,setKeterangan] = useState("");
  const [unitprice, setUnitPrice] = useState([]);
  const [spaceprice, setSpacePrice] = useState([]);

  useEffect(() => {
    getKurir();
    getTipeKurir();
    getItemGroup();
  }, []);

  const getKurir = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/courier-name/list`,
        { headers }
      )
      .then((data) => {
        setKurirs(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getTipeKurir = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/courier-type/list`,
        { headers }
      )
      .then((data) => {
        setTipeKurirs(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  const getItemGroup = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/item-group/list`,
        { headers }
      )
      .then((data) => {
        setGrupItems(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  function CreateData() {
    setLoading(true);
    let data = {
      warehouse_id : parseInt(warehouse),
      username : username,
      courier_id : parseInt(kurir),
      courier_type : parseInt(tipekurir),
      ig_id : parseInt(grupitem),
      unit_price : parseFloat(unitprice),
      space_price : parseFloat(spaceprice)
      
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/courier/save`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/list-kurir");
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
      CreateData();
    }
  };



  return (
    <>
    <SimpleHeader name="Tambah Kurir By Warehouse" parentName="E-Commerce" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
          <Form onSubmit={handleSubmit}>
              <Card>
                <CardBody>
                    <CardHeader>
                      <h3>Tambah Kurir By Warehouse</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={3}
                              >
                                Kurir
                              </Label>
                              <Col sm={6}>
                              <Input
                              autoComplete="off"
                                  name="person"
                                  type="select"
                                  value={kurir}
                                  onChange={(e) => {
                                    setKurir(e.target.value);
                                  }}
                                >
                                  <option value=''>Pilih Kurir</option>
                                  {kurirs.map((kurir, key) => {
                                      return (
                                        <option key={key} value={kurir.id}>
                                          {kurir.name}
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
                                Tipe Kurir 
                              </Label>
                              <Col sm={6}>
                              <Input
                              autoComplete="off"
                                  name="person"
                                  type="select"
                                  value={tipekurir}
                                  onChange={(e) => {
                                    setTipeKurir(e.target.value);
                                  }}
                                >
                                  <option value=''>Pilih Tipe Kurir</option>
                                  {tipekurirs.map((TipeKurir, key) => {
                                      return (
                                        <option key={key} value={TipeKurir.id}>
                                          {TipeKurir.name}
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
                                Unit Price
                              </Label>
                              <Col sm={6}>
                                <Input
                                autoComplete="off"
                                  type="number"
                                  name="Unit Price"
                                  placeholder="Masukan Unit Price"
                                  value={unitprice}
                                  onChange={(e) => {
                                    setUnitPrice(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={3}
                              >
                                Grup Item
                              </Label>
                              <Col sm={6}>
                              <Input
                              autoComplete="off"
                                  name="person"
                                  type="select"
                                  value={grupitem}
                                  onChange={(e) => {
                                    setGrupItem(e.target.value);
                                  }}
                                >
                                  <option value=''>Pilih Grup Item</option>
                                  {grupitems.map((grup, key) => {
                                      return (
                                        <option key={key} value={grup.id}>
                                          {grup.name}
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
                                Jarak Per Km
                              </Label>
                              <Col sm={6}>
                                <Input
                                autoComplete="off"
                                  type="number"
                                  name="keterangan"
                                  placeholder="Masukan Jarak Per KM"
                                  value={spaceprice}
                                  onChange={(e) => {
                                    setSpacePrice(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                      </Row>
                    </CardBody>
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
            </Form>
          </div>
        </Row>
    </Container>  
    </>
  );
}

export default CreateKurirByWarehouse;