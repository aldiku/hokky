/*eslint-disable*/
import React, { useState, useEffect } from "react";
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

export default function EditDurasiOperasional(props) {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [durasipo,setDurasiPo] = useState("");
  const [durasiso,setDurasiSo] = useState([]);
  const [durasitw,setDurasiTw] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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
        `${process.env.REACT_APP_API_BASE_URL}/durasi-operasional/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        setDurasiPo(data.data.response.durasi);
        // setDurasiSo(data.data.response.durasi_so);
        // setDurasiTw(data.data.response.durasi_tw);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function EditData() {
    setLoading(true);
    let data = {
      durasi: parseInt(durasipo),
      // durasi_so: parseInt(durasiso),
      // durasi_tw: parseInt(durasitw),
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/durasi-operasional/update/${props.match.params.id}`, data, {
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
      EditData();
    }
  };
  return (
    <>
      <SimpleHeader name="Edit Batas Waktu" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Edit Batas Waktu</h3>
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
                                Durasi Transfer Stok
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
