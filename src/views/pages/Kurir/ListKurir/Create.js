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

const CreateListKurir = () => {
  const token = localStorage.token;
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  
  function CreateData() {
    setLoading(true);{
    CreateWarehouseGudang();
    }
  }

  const CreateWarehouseGudang = () => {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };
    
    const myjson = JSON.stringify ({
        name,
    });     
    let data = new FormData();
    data.append("kurir",myjson)
    data.append("gambar",image)
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/courier-name/save`, data, { headers })
      .then(function (response) {
        history.push("/admin/list-kurir");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      CreateData();
    }
  };

  return (
    <div>
      <SimpleHeader name="Tambah Kurir" parentName="E-Commerce" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <Form onSubmit={handleSubmit}>
                <CardHeader>
                  <h3>Tambah Kurir</h3>
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
                      <Col md="6">
                        <FormGroup row>
                            <Label
                                for="exampleEmail"
                                sm={4}
                            >
                                Image
                            </Label>
                            <Col sm={7}>
                            <Input
                            autoComplete="off"
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
                      kembali
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

export default CreateListKurir;