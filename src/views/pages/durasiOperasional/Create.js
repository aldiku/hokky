/*eslint-disable*/
import React, { useState } from "react";
import {
  Card,
  CardBody,
  Label,
  FormGroup,
  Row,
  Col,
  Input,
  Container,
  CardHeader,
  CardFooter,
  Button,
  Form,
  Modal, ModalHeader, ModalBody
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function CreateDurasiOperasional() {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [durasipo,setDurasiPo] = useState([]);
  const [durasiso,setDurasiSo] = useState([]);
  const [durasitw,setDurasiTw] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  function CreateData() {
    setLoading(true);
    let data = {
      // durasi_po: parseInt(durasipo),
      // durasi_so: parseInt(durasiso),
      // durasi_tw: parseInt(durasitw),
      durasi: parseInt(durasipo),
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/durasi-operasional/save`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        history.push("/admin/durasi-operasional");
      })
      .then((json) => {
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSubmit = (e) => {
    {
      CreateData();
    }
  };
  return (
    <>
      <SimpleHeader name="Tambah Batas Waktu" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Tambah Batas Waktu</h3>
                  </CardHeader>
                  <CardBody>
                    <Row md="12">
                          <Col md="6">
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Durasi 
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                  type="number"
                                  name="desc"
                                  placeholder="Masukan Durasi"
                                  value={durasipo}
                                  onChange={(e) => {
                                    setDurasiPo(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            {/* <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Durasi SO
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                  type="number"
                                  name="desc"
                                  placeholder="Masukan Durasi SO"
                                  value={durasiso}
                                  onChange={(e) => {
                                    setDurasiSo(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Durasi TW
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                  type="number"
                                  name="desc"
                                  placeholder="Masukan Durasi TW"
                                  value={durasitw}
                                  onChange={(e) => {
                                    setDurasiTw(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup> */}
                          </Col>
                          {/* <Col md="6">
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pengiriman PO
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                  type="number"
                                  name="desc"
                                  placeholder="Masukan Pengiriman PO"
                                  value={pengirimanpo}
                                  onChange={(e) => {
                                    setPengirimanPo(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pengiriman SO
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                  type="number"
                                  name="desc"
                                  placeholder="Masukan Pengiriman SO"
                                  value={pengirimanso}
                                  onChange={(e) => {
                                    setPengirimanSo(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pengiriman TW
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                  type="number"
                                  name="desc"
                                  placeholder="Masukan Pengiriman TW"
                                  value={pengirimantw}
                                  onChange={(e) => {
                                    setPengirimanTw(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                          </Col> */}
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <Button color="danger" onClick={toggle}>
                        Simpan
                    </Button>
                    <Link className="btn btn-info" to="/admin/durasi-operasional">
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
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
