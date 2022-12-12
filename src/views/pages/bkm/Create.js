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
import Select2 from "react-select2-wrapper";

const CreateBkmSo = () => {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [pembayarantotal, setPembayaranTotal] = useState([]);
  const [codeinvoice, setCodeInvoice] = useState("")
  const [codebatch, setCodeBatch] = useState("");
  const [transaksi, setTransaksi] = useState([]);
  const [isShow1, setIsShow1] = useState(false);
  const [active1, setActive1] = useState(0);
  const [filtered1, setFiltered1] = useState([]);

  useEffect(() => {
    getCustomer();

  }, []);

  const getCustomer = () => {
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
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onChange1 = (e) => {
    const codeinvoice = e.currentTarget.value;

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/invoice-so/page`, {
        page: 1,
        per_page: 10,
        invoice_code: codeinvoice,
        warehouse_id : parseInt(warehouse),
    }).then(async response => {
        let suggests = [];

        await Promise.all(response.data.response.map((data) =>
            suggests = [...suggests, data.invoice_code]
        ));

        setActive1(0);
        setFiltered1(suggests);
        setIsShow1(true);

    });

    setCodeInvoice(e.currentTarget.value);
};

const onClick1 = e => {
    setActive1(0);
    setFiltered1([]);
    setIsShow1(false);
    setCodeInvoice(e.currentTarget.innerText)
};

const onKeyDown1 = e => {
    if (e.keyCode === 13) { // enter key
        setActive1(0);
        setIsShow1(false);
        setCodeInvoice(filtered1[active1])
    }
    else if (e.keyCode === 38) { // up arrow
        return (active1 === 0) ? null : setActive1(active1 - 1);
    }
    else if (e.keyCode === 40) { // down arrow
        return (active1 - 1 === filtered1.length) ? null : setActive1(active1 + 1);
    }
};

const AutoCompleTes1 = () => {
    if (isShow1 && codeinvoice) {
        if (filtered1.length) {
            return (
                <ul className="autocomplete">
                    {filtered1.map((suggestion1, index1) => {
                        let className;
                        if (index1 === active1) {
                            className = "active";
                        }
                        return (
                            <li key={index1} className={className} onClick={onClick1}>
                                {suggestion1}
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            return (
                <div className="no-autocomplete">
                    <em>Not found</em>
                </div>
            );
        }
    }
    return <></>;
}

  function CreateData() {
    setLoading(true);
    let data = {
      warehouse_id : parseInt(warehouse),
      username : username,
      code_invoice: codeinvoice,
      code_batch : codebatch,
      customer_id: parseInt(customer),
      pembayaran_total: parseFloat(pembayarantotal),
      keterangan: keterangan ,
      status: parseInt(transaksi)
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
          history.push("/admin/bukti-kas-masuk");
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
    <SimpleHeader name="Tambah BKM" parentName="SO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Card>
                <Form onSubmit={handleSubmit}>
                <CardBody>
                    <CardHeader>
                      <h3>Tambah BKM</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Customer
                              </Label>
                              <Col sm={7}>
                              {/* <Input
                                  name="customer"
                                  type="select"
                                  value={customer}
                                  onChange={(e) => {
                                    setCustomer(e.target.value);
                                  }}
                                >
                                  <option value=''>Pilih Customer</option>
                                  {customers.map((customers, key) => {
                                      return (
                                        <option key={key} value={customer.id}>
                                          {customer.name}
                                        </option>
                                      );
                                    })}
                                  </Input> */}
                                <Select2
                                      className="form-control-alternative"
                                      defaultValue="1"
                                      value={customer}
                                      onChange={(e) => {
                                        setCustomer(e.target.value);
                                      }}
                                      options={{
                                        placeholder: "Pilih Customer"
                                      }}
                                      data={customers.map((customer) => {
                                        return (
                                        { id: customer.id, text: customer.name}
                                        );
                                      })}
                                    />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pembayaran Total
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="text"
                                  name="nomorPart"
                                  placeholder="Masukan Pembayaran total"
                                  value={pembayarantotal}
                                  onChange={(e) => {
                                    setPembayaranTotal(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Tipe Transaksi
                            </Label>
                            <Col sm={7}>
                            <Input
                                name="Tipe Po"
                                type="select"
                                value={transaksi}
                                onChange={(e) => {
                                    setTransaksi(e.target.value);
                                }}
                              >
                                <option value={1}>Kasir</option>
                                <option value={2}>Proyek</option>
                                <option value={3}>E-Commerce</option>
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
                                Kode Invoice
                              </Label>
                              <Col sm={7}>
                                <Input
                                  placeholder="Kode Invoice"
                                  type="search"
                                  style={{ height: 38 }}
                                  onChange={onChange1}
                                  onKeyDown={onKeyDown1}
                                  value={codeinvoice}
                              />
                              <AutoCompleTes1 />
                              </Col>                             
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Kode Batch
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="text"
                                  name="nomorPart"
                                  placeholder="Masukan Batch"
                                  value={codebatch}
                                  onChange={(e) => {
                                    setCodeBatch(e.target.value);
                                  }}
                                />
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
                                  type="textarea"
                                  name="keterangan"
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
                </CardBody>
                <CardFooter>
                      {!isLoading && (
                        <Button color="primary" type="submit">
                          Simpan
                        </Button>
                      )}
                      {isLoading && (
                        <Button color="primary" disabled>
                          <i className="fas fa-spinner fa-spin"></i>
                          {""}
                          loading...
                        </Button>
                      )}
                      <Link className="btn btn-info" to="/admin/surat-jalan-so">
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

export default CreateBkmSo;