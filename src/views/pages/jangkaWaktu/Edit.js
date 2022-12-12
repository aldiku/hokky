/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  
  Card,
  Button,
  Row,
  Col,
  CardBody,
  CardFooter,
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

export default function JangkaWaktu(props) {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [name,setName] = useState("");
  const [durasi,setDurasi] = useState([]);
  const [keterangan,setKeterangan] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    getById();
  }, []);

  const getById = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/jwkredit/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        setName(data.data.response.name);
        setDurasi(data.data.response.durasi);
        setKeterangan(data.data.response.keterangan);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function EditData() {
    setLoading(true);
    let data = {
        warehouse_id : parseInt(warehouse),
        username : username,
        name: name,
        durasi: parseInt(durasi), 
        keterangan: keterangan ,
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/jwkredit/update/${props.match.params.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/jangka-waktu");
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
    <SimpleHeader name="Edit Jatuh Tempo" parentName="Master" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Card>
                <Form onSubmit={handleSubmit}>
                <CardBody>
                  <Row md="12">
                      <Col md="6">
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Kode
                            {/* <span className="text-danger">*</span> */}
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                              type="text"
                              name="Nama"
                              placeholder="Masukan Nama"
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
                            Durasi
                            {/* <span className="text-danger">*</span> */}
                          </Label>
                          <Col sm={5}>
                            <Input
                            autoComplete="off"
                              type="text"
                              name="Alamat"
                              placeholder="Masukan Durasi"
                              value={durasi}
                              onChange={(e) => {
                                setDurasi(e.target.value);
                              }}
                            />
                          </Col>
                          <Label
                            for="exampleEmail"
                            sm={2}
                          >
                            Hari
                            {/* <span className="text-danger">*</span> */}
                          </Label>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Deskripsi
                            {/* <span className="text-danger">*</span> */}
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                              type="text"
                              name="Longitude"
                              placeholder="Masukan Deskripsi"
                              value={keterangan}
                              onChange={(e) => {
                                setKeterangan(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                      </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                    <Button color="danger" onClick={toggle}>
                        Simpan
                    </Button>
                    <Link className="btn btn-info" to="/admin/jangka-waktu">
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