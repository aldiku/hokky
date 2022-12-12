/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Label,
  FormGroup,
  Row,
  Input,
  Container,
  CardHeader,
  CardFooter,
  Button,
  Form, FormFeedback
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import SimpleHeader from "components/Headers/SimpleHeader.js";
import Warehouse from "../warehouse";

export default function CreateAccount() {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [nameAccount1, setNameAccount1] = useState("");
  const [codeAccount, setCodeAccount] = useState("");
  const [sub, setSub] = useState("");
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    getCoa();
  }, []);



  const getCoa = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/account/list/${warehouse}`, { headers })
      .then((data) => {
        setSubs(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function CreateData() {
    setLoading(true);
    let data = {
      warehouse_id : parseInt(warehouse),
      sub : parseInt(sub),
      account_code:codeAccount,
      account_name:nameAccount1,
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/account/save`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(function (response) {
        history.push("/admin/account");
      })
      .then(json => {
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
      CreateData();
  }
  return (
    <>
      <SimpleHeader name="Daftar Account" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit} >
                  <CardHeader>
                    <h3>Daftar Account</h3>
                  </CardHeader>
                  <CardBody>
                  {/* <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Sub Account Dari
                      </Label>
                      <Input
                        autoComplete="off"
                        type="text"
                        name="phoneNumber"
                        placeholder="Masukan Sub Account Dari"
                        value={sub}
                        onChange={(e) => {
                          setSub(e.target.value);
                        }}
                      />
                      <FormFeedback>
                        Sub tidak boleh kosong
                      </FormFeedback>
                    </FormGroup> */}
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Sub Account Dari
                      </Label>
                      <Input
                      autoComplete="off"
                        name="coa"
                        type="select"
                        value={sub}
                        onChange={(e) => {
                          setSub(e.target.value);
                        }}
                      >
                        <option value="">Sub Account Dari</option>
                        {subs.map((coa, key) => {
                          return (
                            <option key={key} value={coa.id}>
                              {coa.account_code} {coa.account_name}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Kode Account
                      </Label>
                      <Input
                        autoComplete="off"
                        type="text"
                        name="phoneNumber"
                        placeholder="Masukan Kode Account"
                        value={codeAccount}
                        onChange={(e) => {
                          setCodeAccount(e.target.value);
                        }}
                      />
                      <FormFeedback>
                        Kode Account tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nama Account
                      </Label>
                      <Input
                        autoComplete="off"
                        type="text"
                        name="alamat"
                        placeholder="Masukan Nama Account"
                        value={nameAccount1}
                        onChange={(e) => {
                          setNameAccount1(e.target.value);
                        }}
                      />
                      <FormFeedback>
                        Nama Account tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                    
                  </CardBody>
                  <CardFooter>
                    {!isLoading && (<Button color="primary" type="submit">
                      Simpan
                    </Button>)}
                    {isLoading && (<Button color="primary" disabled>
                      <i className="fas fa-spinner fa-spin"></i>{""}
                      loading...
                    </Button>)}
                    <Link to="/admin/account" className="btn btn-info">
                      Kembali
                    </Link>
                  </CardFooter>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
