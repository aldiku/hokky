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
  FormGroup,
  Label,
  Input, 
} from "reactstrap";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function ValidasiDirekturOpname(props)  {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [keterangan,setKeterangan] = useState("");
  const [statusd, setStatusD] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  
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
        `${process.env.REACT_APP_API_BASE_URL}/opname/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        setKeterangan(data.data.response.keterangan);
        setStatusD(data.data.response.status_d);
        getItemDataSaved();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getItemDataSaved = () => {
      axios.post(`${process.env.REACT_APP_API_BASE_URL}/opname/item`, {

        opname_id: props.match.params.id

      }).then(async response => {
          let stateItem = [];

          await Promise.all(response.data.response.map(async (data) => {
              stateItem = [...stateItem, {
                  item_id: data.item_id,
                  item_name:data.item_name,
                  qty_fisik: data.qty_fisik,
                  ket:data.ket,
                  data: {
                    item_name: data.item_name,
                    qty_fisik: data.qty_fisik,
                    keterangan:data.keterangan,
                  },
              }];
          }));

          setSavedItems(stateItem);
      })
  }

  
  function EditData() {
    setLoading(true);
    let dataItems = [];
        savedItems.map((dataItem) => dataItems = [...dataItems, 
            { 
                item_id: dataItem.item_id, 
                qty_fisik: dataItem.qty_fisik,
                ket:dataItem.ket,
            }]);
    let data = {
      warehouse_id : parseInt(warehouse),
      keterangan: keterangan,
      direktur : username,
      status_d: parseInt(statusd),
      items : dataItems
    };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/opname/update/${props.match.params.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        history.push("/admin/stock-opname");
        
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
    <SimpleHeader name="Validasi Direktur" parentName="Finance" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Card>
                <CardBody>
                    <CardHeader>
                      <h3>Validasi Direktur</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="9">
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={3}
                              >
                                Keterangan
                              </Label>
                              <Col sm={9}>
                                <Input
                                  type="textarea"
                                  name="keterangan"
                                  placeholder="Masukan Keterangan"
                                  style={{
                                    fontSize: 14,
                                    paddingTop: 20,
                                    top: "50%",
                                    height: 117,
                                    resize: "none",
                                  }}
                                  value={keterangan}
                                  onChange={(e) => {
                                    setKeterangan(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={3}
                            >
                              Validasi Kepala Gudang
                            </Label>
                              <Col sm={6}>
                                <div style={{ display: "flex" }}>
                                  <div className="custom-control custom-radio mb-3">
                                    <Input
                                      className="custom-control-input"
                                      id="customRadio11"
                                      name="custom-radio-4"
                                      type="radio"
                                      value={5}
                                      checked={statusd === 5}
                                      onChange={() => setStatusD(5)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio11"
                                    >
                                      Disetujui
                                    </Label>
                                  </div>
                                  <div
                                    className="custom-control custom-radio mb-3"
                                    style={{ marginLeft: "20px" }}
                                  >
                                    <Input
                                      className="custom-control-input"
                                      id="customRadio12"
                                      name="custom-radio-4"
                                      type="radio"
                                      value={4}
                                      checked={statusd === 4}
                                      onChange={() => setStatusD(4)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio12"
                                    >
                                      Ditolak
                                    </Label>
                                  </div>
                                </div>
                              </Col>
                            </FormGroup>
                          </Col>
                      </Row>
                    </CardBody>
                    <CardBody>
                      <Table>
                              <thead>
                                <tr>
                                  <th>
                                    Nama Item
                                  </th>
                                  <th>
                                  Qty
                                  </th>
                                  <th>
                                    Keterangan
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                    savedItems.map((savedItem, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{savedItem.data.item_name}</td>
                                                <td>{savedItem.qty_fisik}</td>
                                                <td>{savedItem.ket}</td>
                                            </tr>
                                        )
                                    })
                                }
                              </tbody>
                      </Table>
                    </CardBody>
                </CardBody>
                <CardFooter>
                      {!isLoading && (
                        <Button color="primary" onClick={() => EditData()}>save</Button>
                      )}
                      {isLoading && (
                        <Button color="primary" disabled>
                          <i className="fas fa-spinner fa-spin"></i>
                          {""}
                          loading...
                        </Button>
                      )}
                      <Link className="btn btn-info" to="/admin/stock-opname">
                      Kembali
                      </Link>
                </CardFooter>
              </Card>
          </div>
        </Row>
    </Container>  
    </>
  );
}