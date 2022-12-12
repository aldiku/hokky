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
  Modal, ModalHeader, ModalBody
  
} from "reactstrap";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditBank(props) {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [accountname,setAccountName] = useState("");
  const [accountnumber,setAccountNumber] = useState("");
  const [bankname,setBankName] = useState("");
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
        `${process.env.REACT_APP_API_BASE_URL}/bank/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        setAccountName(data.data.response.account_name);
        setAccountNumber(data.data.response.account_number);
        setBankName(data.data.response.bank_name);
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
      account_name: accountname,
      account_number: accountnumber,
      bank_name: bankname,
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/bank/update/${props.match.params.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/bank");
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
    <SimpleHeader name="Bank" parentName="Master" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Card>
                <Form onSubmit={handleSubmit}>
                <CardBody>
                    <CardHeader>
                      <h3>Bank</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Nama Pemilik 
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Nama Pemilik"
                                  value={accountname}
                                  onChange={(e) => {
                                    setAccountName(e.target.value);
                                  }}
                                />
                               </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Nomor rekening
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Nomer Akun"
                                  value={accountnumber}
                                  onChange={(e) => {
                                    setAccountNumber(e.target.value);
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
                                Bank 
                              </Label>
                              <Col sm={6}>
                                <Input
                                autoComplete="off"
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Bank"
                                  value={bankname}
                                  onChange={(e) => {
                                    setBankName(e.target.value);
                                  }}
                                />
                               </Col>
                            </FormGroup>
                          </Col>
                      </Row>   
                    </CardBody>
                </CardBody>
                <CardFooter>
                      <Button color="danger" onClick={toggle}>
                          Simpan
                      </Button>
                      <Link className="btn btn-info" to="/admin/bank">
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