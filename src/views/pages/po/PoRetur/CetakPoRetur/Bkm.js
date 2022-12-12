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

const CreatePoReturBuktiKasMasuk = (props) => {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState("");
  const [coderetur,setCodeRetur] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [isShow1, setIsShow1] = useState(false);
  const [active1, setActive1] = useState(0);
  const [filtered1, setFiltered1] = useState([]);
  const [pembayarantotal, setPembayaranTotal] = useState([]);
  const [codeinvoice,setCodeInvoice] = useState("");
  const [invoicecode,setInvoiceCode] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    getCustomer();
    getPerson();

  }, []);

  const getCustomer = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/customer/list`,
        { headers }
      )
      .then((data) => {
        setCustomers(data.data.response);
        setCustomer(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
        setPerson(id)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
        `${process.env.REACT_APP_API_BASE_URL}/po-retur/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        getPerson(data.data.response.person_id);
        setCodeRetur(data.data.response.retur_code);
        setPembayaranTotal(data.data.response.payment_total);
        setKeterangan(data.data.response.keterangan);
       
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
        code_retur: coderetur,
        person_id: parseInt(person),
        pembayaran_total: parseFloat(pembayarantotal),
        keterangan: keterangan ,
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/bkm/save`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/po-retur");
        })
        .then((json) => {
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

 
  return (
    <>
    <SimpleHeader name="Bukti Kas Masuk" parentName="SO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <CardBody>
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                      <h3>Bukti Kas Masuk</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Kode Retur
                              </Label>
                              <Col sm={7}>
                                <Input 
                                disabled
                                className="form-control-alternative"
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Retur"
                                  value={coderetur}
                                  onChange={(e) => {
                                    setCodeRetur(e.target.value);
                                  }}
                                />
                               </Col>
                            </FormGroup>
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
                                  name="customer"
                                  type="select"
                                  value={person}
                                  onChange={(e) => {
                                    setPerson(e.target.value);
                                  }}
                                >
                                  <option value=''>Pilih Supplier</option>
                                  {persons.map((customer, key) => {
                                      return (
                                        <option key={key} value={customer.id}>
                                          {customer.person_name}
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
                                Total Pembayaran
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                className="form-control-alternative"
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Total Pembayaran"
                                  value={pembayarantotal}
                                  onChange={(e) => {
                                    setPembayaranTotal(e.target.value);
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
                                Keterangan
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                className="form-control-alternative"
                                  type="textarea"
                                  name="desc"
                                  rows = "7"
                                  placeholder="Masukan Keterangan"
                                  value={keterangan}
                                  onChange={(e) => {
                                    setKeterangan(e.target.value);
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
                        <Link className="btn btn-info" to="/admin/bukti-kas-masuk">
                          Kembali
                        </Link>
                  </CardFooter>
                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} align="center"></ModalHeader>
                    <ModalBody align="center">
                    <font size="5"><b>Apakah Anda Sudah Yakin ?</b></font><br></br><br></br><br></br>
                    {!isLoading && (
                      <Button color="primary" onClick={() => CreateData()}>
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
              </Card>
            </CardBody>
          </div>
        </Row>
    </Container>
    </>
  );
}

export default CreatePoReturBuktiKasMasuk;