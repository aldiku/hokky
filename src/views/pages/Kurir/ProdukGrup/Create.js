/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  CardBody,
  Form,
  CardFooter,
  FormGroup,
  Label,
  Input,
  Container,
  CardHeader,
} from "reactstrap";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

const CreateProdukGrup = () => {
  const token = localStorage.token;
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  
  function CreateData() {
    setLoading(true);{
    CreateProdukGrup();
    }
  }

  const CreateProdukGrup = () => {
    let data = {
        name,
      };
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/item-group/save`,
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
    <div>
      <SimpleHeader name="Tambah Produk Grup" parentName="E-Commerce" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <Form onSubmit={handleSubmit}>
                <CardHeader>
                  <h3>Tambah Produk Grup</h3>
                </CardHeader>
                <CardBody>
                  <Row md="12">
                      <Col md="6">
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Name
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                              type="text"
                              name="Nama"
                              placeholder="Input Name"
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                    {!isLoading && (<Button color="primary" type="submit">
                      Save
                    </Button>)}
                    {isLoading && (
                      <Button color="primary" disabled>
                        <i className="fas fa-spinner fa-spin"></i>
                        {""}
                        loading...
                      </Button>
                    )}
                    <Link className="btn btn-info" to="/admin/warehouse">
                      Kembali
                    </Link>
                </CardFooter>
               </Form>      
            </Card>
          </div>
        </Row>
      </Container>
    </div>
    
  );
};

export default CreateProdukGrup;