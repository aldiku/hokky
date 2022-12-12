/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  CardBody,
  Form,
  CardHeader,
  CardFooter,
  FormGroup,
  Label,
  Input,
  Container,
  Modal, ModalHeader, ModalBody
} from "reactstrap";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

const CreateWarehousePusat = () => {
  const token = localStorage.token;
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city,setCity] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [province, setProvince] = useState([]);
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [citys, setCitys] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    getProvinsi();
  }, []);

  const getProvinsi = () => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/province/list`, { headers
    })
    .then(data => {
      setProvinces(data.data.response_data);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getKota = (id) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/city?province_id=${id}`, { headers
    })
    .then(data => {
      setCitys(data.data.response_data);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  function CreateData() {
    setLoading(true);{
    CreatePusat();
    }
  }
  
  const CreatePusat = () => {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };
    
    const myjson = JSON.stringify ({
        
        name,
        address,
        level:1,
        city : parseInt(city),
        province:parseInt(province),
        phone,
        pusat_id:0,
        toko_id:0

    });     
    let data = new FormData();
    data.append("body",myjson)
    data.append("logo",image)
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/warehouse/save`, data, { headers })
      .then(function (response) {
        history.push("/admin/warehouse");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    {
      CreateData();
    }
  };

  return (
    <div>
      <SimpleHeader name="Tambah Pusat" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <Form onSubmit={handleSubmit}>
                  <CardHeader className="bg-white border-0">
                      <h3>Tambah Pusat</h3>
                  </CardHeader>
                <CardBody>
                <Row md="12">
                      <Col md="6">
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Nama
                          </Label>
                          <Col sm={7}>
                            <Input
                              autoComplete="off"
                              className="form-control-alternative"
                              type="text"
                              name="Nama"
                              placeholder="Masukan Nama Pusat"
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Alamat
                          </Label>
                          <Col sm={7}>
                            <Input
                              autoComplete="off"
                              className="form-control-alternative"
                              type="text"
                              name="Alamat"
                              placeholder="Masukan Alamat"
                              value={address}
                              onChange={(e) => {
                                setAddress(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="exampleEmail"
                                sm={4}
                            >
                                Provinsi
                            </Label>
                            <Col sm={7}>
                                <Input
                                    autoComplete="off"  
                                    className="form-control-alternative"
                                    type="select"
                                    value={province}
                                    onChange={(e) => {
                                    setProvince(e.target.value);
                                    getKota(e.target.value);
                                    }}
                                >
                                    <option>Pilih Provinsi</option>
                                    {
                                    provinces.map((a, key) => {
                                        return <option key={key} value={a.id}>{a.name}</option>
                                    })
                                    }
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="exampleEmail"
                                sm={4}
                            >
                                Kota
                            </Label>
                            <Col sm={7}>
                                <Input
                                    autoComplete="off"
                                    className="form-control-alternative"
                                    name="function"
                                    type="select"
                                    value={city}
                                    onChange={(e) => {
                                    setCity(e.target.value);
                                    }}
                                >
                                    <option>Pilih Kota </option>
                                    {
                                    citys.map((b, key) => {
                                        return <option key={key} value={b.id}>{b.name}</option>
                                    })
                                    }
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
                            Phone
                          </Label>
                          <Col sm={7}>
                            <Input
                              autoComplete="off"
                              className="form-control-alternative"
                              type="number"
                              pattern='[0-9]{0,5}'
                              name="Phone"
                              placeholder="Masukan Phone"
                              value={phone}
                              onChange={(e) => {
                                setPhone(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="exampleEmail"
                                sm={4}
                            >
                                Gambar
                            </Label>
                            <Col sm={7}>
                            <Input
                                autoComplete="off"
                                className="form-control-alternative"
                                id="exampleFile"
                                name="file"
                                type="file"
                                onChange={(event) => {
                                    setImage(event.target.files[0]);
                                }}
                                />
                            </Col>
                        </FormGroup>
                      </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                      <Button color="danger" onClick={toggle}>
                          Simpan
                      </Button>
                    <Link className="btn btn-info" to="/admin/warehouse">
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
    </div>
    
  );
};

export default CreateWarehousePusat;