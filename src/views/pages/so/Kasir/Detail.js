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
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
  
} from "reactstrap";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function DetailKasirSettlement(props) {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [modal1, setModal1] = useState(0);
  const [pecahanseratus, setPecahanSeratus] = useState(0);
  const [pecahanduaratus, setPecahanDuaRatus] = useState(0);
  const [pecahanlimaratus, setPecahanLimaRatus] = useState(0);
  const [pecahanseribu, setPecahanSeribu] = useState(0);
  const [pecahanduaribu, setPecahanDuaRibu] = useState(0);
  const [pecahanlimaribu, setPecahanLimaRibu] = useState(0);
  const [pecahansepuluhribu, setPecahanSepuluhRibu] = useState(0);
  const [pecahanduapuluhribu, setPecahanDuapuluhRibu] = useState(0);
  const [pecahanlimapuluhribu, setPecahanLimapuluhRibu] = useState(0);
  const [pecahantujuhlimaribu, setPecahanTujuhLimaRibu] = useState(0);
  const [pecahanseratusribu, setPecahanSeratusRibu] = useState(0);

  // useeffect total omset
  const [pecahanseratus1, setPecahanSeratus1] = useState(0);
  const [pecahanduaratus1, setPecahanDuaRatus1] = useState(0);
  const [pecahanlimaratus1, setPecahanLimaRatus1] = useState(0);
  const [pecahanseribu1, setPecahanSeribu1] = useState(0);
  const [pecahanduaribu1, setPecahanDuaRibu1] = useState(0);
  const [pecahanlimaribu1, setPecahanLimaRibu1] = useState(0);
  const [pecahansepuluhribu1, setPecahanSepuluhRibu1] = useState(0);
  const [pecahanduapuluhribu1, setPecahanDuapuluhRibu1] = useState(0);
  const [pecahanlimapuluhribu1, setPecahanLimapuluhRibu1] = useState(0);
  const [pecahantujuhlimaribu1, setPecahanTujuhLimaRibu1] = useState(0);
  const [pecahanseratusribu1, setPecahanSeratusRibu1] = useState(0);
  const [totalomset,setTotalOmset] = useState(0);
  const [totalomset1,setTotalOmset1] = useState(0);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  //pecahan seratus
	useEffect(() => {
		setPecahanSeratus1(pecahanseratus * 100);
	}, [pecahanseratus]);

  //pecahan seratus
	useEffect(() => {
		setPecahanDuaRatus1(pecahanduaratus * 200);
	}, [pecahanduaratus]);

  //pecahan seratus
	useEffect(() => {
		setPecahanLimaRatus1(pecahanlimaratus * 500);
	}, [pecahanlimaratus]);

  //pecahan seratus
	useEffect(() => {
		setPecahanSeribu1(pecahanseribu * 1000);
	}, [pecahanseribu]);

  //pecahan seratus
	useEffect(() => {
		setPecahanDuaRibu1(pecahanduaribu * 2000);
	}, [pecahanduaribu]);

  //pecahan seratus
	useEffect(() => {
		setPecahanLimaRibu1(pecahanlimaribu * 5000);
	}, [pecahanlimaribu]);

  //pecahan seratus
	useEffect(() => {
		setPecahanSepuluhRibu1(pecahansepuluhribu * 10000);
	}, [pecahansepuluhribu]);

  //pecahan seratus
	useEffect(() => {
		setPecahanDuapuluhRibu1(pecahanduapuluhribu * 20000);
	}, [pecahanduapuluhribu]);

  //pecahan seratus
	useEffect(() => {
		setPecahanLimapuluhRibu1(pecahanlimapuluhribu * 50000);
	}, [pecahanlimapuluhribu]);

  //pecahan seratus
	useEffect(() => {
		setPecahanTujuhLimaRibu1(pecahantujuhlimaribu * 75000);
	}, [pecahantujuhlimaribu]);

   //pecahan seratus
	useEffect(() => {
		setPecahanSeratusRibu1(pecahanseratusribu * 100000);
	}, [pecahanseratusribu]);


  //Total Omset
  useEffect(() => {
		setTotalOmset(pecahanseratus1 + pecahanduaratus1 + pecahanlimaratus1 + pecahanseribu1 + pecahanduaribu1 + pecahanlimaribu1 + pecahansepuluhribu1 + pecahanduapuluhribu1 + pecahanlimapuluhribu1 + pecahantujuhlimaribu1 + pecahanseratusribu1);
	}, [pecahanseratusribu1,pecahanseratus1,pecahanduaratus1,pecahanlimaratus1,pecahanseribu1,pecahanduaribu1, pecahanlimaribu1,pecahansepuluhribu1, pecahanduapuluhribu1, pecahanlimapuluhribu1, pecahantujuhlimaribu1  ]);

  useEffect(() => {
		setTotalOmset1(modal1 + pecahanseratus1 + pecahanduaratus1 + pecahanlimaratus1 + pecahanseribu1 + pecahanduaribu1 + pecahanlimaribu1 + pecahansepuluhribu1 + pecahanduapuluhribu1 + pecahanlimapuluhribu1 + pecahantujuhlimaribu1 + pecahanseratusribu1);
	}, [modal1,pecahanseratusribu1,pecahanseratus1,pecahanduaratus1,pecahanlimaratus1,pecahanseribu1,pecahanduaribu1, pecahanlimaribu1,pecahansepuluhribu1, pecahanduapuluhribu1, pecahanlimapuluhribu1, pecahantujuhlimaribu1  ]);




  
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
        `${process.env.REACT_APP_API_BASE_URL}/chasier-settlement/get-by-username/${username}`,
        { headers }
      )
      .then((data) => {
        setModal1(data.data.response.modal);
        setPecahanSeratus(data.data.response.pecahan_seratus);
        setPecahanDuaRatus(data.data.response.pecahan_dua_ratus);
        setPecahanLimaRatus(data.data.response.pecahan_lima_ratus);
        setPecahanSeribu(data.data.response.pecahan_seribu);
        setPecahanDuaRibu(data.data.response.pecahan_dua_ribu);
        setPecahanLimaRibu(data.data.response.pecahan_lima_ribu);
        setPecahanSepuluhRibu(data.data.response.pecahan_sepuluh_ribu);
        setPecahanDuapuluhRibu(data.data.response.pecahan_dua_puluh_ribu);
        setPecahanLimapuluhRibu(data.data.response.pecahan_lima_puluh_ribu);
        setPecahanTujuhLimaRibu(data.data.response.pecahan_tujuh_lima_ribu);
        setPecahanSeratusRibu(data.data.response.pecahan_seratus_ribu);
       
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
      modal : parseFloat(modal1),
      pecahan_seratus : parseInt(pecahanseratus),
      pecahan_dua_ratus : parseInt(pecahanduaratus),
      pecahan_lima_ratus : parseInt(pecahanlimaratus),
      pecahan_seribu : parseInt(pecahanseribu),
      pecahan_dua_ribu : parseInt(pecahanduaribu),
      pecahan_lima_ribu : parseInt(pecahanlimaribu),
      pecahan_sepuluh_ribu: parseInt(pecahansepuluhribu),
      pecahan_dua_puluh_ribu: parseInt(pecahanduapuluhribu),
      pecahan_lima_puluh_ribu: parseInt(pecahanlimapuluhribu),
      pecahan_tujuh_lima_ribu: parseInt(pecahantujuhlimaribu),
      pecahan_seratus_ribu: parseInt(pecahanseratusribu),
      active_flag: 5,
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/chasier-settlement/update/${username}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/kasir-sales-order");
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
    <SimpleHeader name="Closing Cashier" parentName="SO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <CardBody>
              <Card className="bg-secondary shadow">
                <Form onSubmit={handleSubmit}>
                    <CardHeader className="bg-white border-0">
                      <h3>Closing Cashier</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                                <Input
                                  type="hidden"
                                  name="nomorPart"
                                  placeholder="Masukan modal"
                                  value={modal1}
                                  onChange={(e) => {
                                    setModal1(e.target.value);
                                  }}
                                />
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan <b>Rp. 100</b>
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="number"
                                  placeholder="Masukan Pecahan Seratus"
                                  value={pecahanseratus}
                                  onChange={(e) => {
                                    setPecahanSeratus(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan <b>Rp. 200</b>
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="number"
                                  placeholder="Masukan Pecahan Dua ratus"
                                  value={pecahanduaratus}
                                  onChange={(e) => {
                                    setPecahanDuaRatus(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan <b>Rp. 500</b>
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="number"
                                  placeholder="Masukan Pecahan lima ratus"
                                  value={pecahanlimaratus}
                                  onChange={(e) => {
                                    setPecahanLimaRatus(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan <b>Rp. 1.000</b>
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="number"
                                  placeholder="Masukan seribu"
                                  value={pecahanseribu}
                                  onChange={(e) => {
                                    setPecahanSeribu(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan <b>Rp. 2.000</b>
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="number"
                                  placeholder="Masukan 2 ribu"
                                  value={pecahanduaribu}
                                  onChange={(e) => {
                                    setPecahanDuaRibu(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan <b>Rp. 5.000</b>
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="number"
                                  placeholder="Masukan Lima Ribu"
                                  value={pecahanlimaribu}
                                  onChange={(e) => {
                                    setPecahanLimaRibu(e.target.value);
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
                               Pecahan <b>Rp. 10.000</b>
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="number"
                                  placeholder="Pecahan Sepuluh Ribu"
                                  value={pecahansepuluhribu}
                                  onChange={(e) => {
                                    setPecahanSepuluhRibu(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan <b>Rp. 20.000</b>
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="number"
                                  placeholder="Pecahan Dua Puluh Ribu"
                                  value={pecahanduapuluhribu}
                                  onChange={(e) => {
                                    setPecahanDuapuluhRibu(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan <b>Rp. 50.000</b>
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="number"
                                  placeholder="Pecahan Lima Puluh Ribu"
                                  value={pecahanlimapuluhribu}
                                  onChange={(e) => {
                                    setPecahanLimapuluhRibu(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan <b>Rp. 75.000</b>
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="number"
                                  placeholder="Pecahan Tujuh Puluh Lima Ribu"
                                  value={pecahantujuhlimaribu}
                                  onChange={(e) => {
                                    setPecahanTujuhLimaRibu(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan <b>Rp. 100.000</b>
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="number"
                                  placeholder="Pecahan Seratus Ribu"
                                  value={pecahanseratusribu}
                                  onChange={(e) => {
                                    setPecahanSeratusRibu(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                      </Row>
                    </CardBody>
                    <CardFooter >
                      <Row md="12">
                          <Col md="6">
                          </Col>
                          <Col md="2">
                          </Col>
                          <Col md="4">
                          {/* <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                            size="small"
                          >
                            <b>Total</b>
                          </Label>
                          <Col sm={6}>
                          <Input
                          className="form-control-alternative"
                            disabled
                            style={{fontWeight: 'bold'}}
                            type="text"
                            name="barcode"
                            placeholder="Harga Total"
                            // value={totalPrice1}
                            value={"<b></b>Rp." + totalPrice1.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
                            />
                          </Col>
                          </FormGroup>
                          <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            <b>Total Diskon</b>
                          </Label>
                          <Col sm={6}>
                          <Input
                            className="form-control-alternative"
                            style={{fontWeight: 'bold'}}
                            disabled
                            type="text"
                            name="barcode"
                            placeholder="Total Diskon"
                            value={"<b></b>Rp." + totaldiskon1.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
                            />
                          </Col>
                          </FormGroup>
                          <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            <b>PPN</b>
                          </Label>
                          <Col sm={6}>
                          <Input
                            className="form-control-alternative"
                            disabled
                            style={{fontWeight: 'bold'}}
                            type="text"
                            name="barcode"
                            placeholder="PPN"
                            value={"<b></b>Rp." + ppnnew.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
                            />
                          </Col>
                          </FormGroup> */}
                          <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            <b>Modal</b>
                          </Label>
                          <Col sm={6}>
                          <Input
                          className="form-control-alternative"
                            disabled
                            type="text"
                            name="barcode"
                            style={{fontWeight: 'bold'}}
                            placeholder="Grand Total"
                            value={"Rp." + modal1.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
                            />
                          </Col>
                          </FormGroup>
                          <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            <b>Total Fisik</b>
                          </Label>
                          <Col sm={6}>
                          <Input
                          className="form-control-alternative"
                            disabled
                            type="text"
                            name="barcode"
                            style={{fontWeight: 'bold'}}
                            placeholder="Grand Total"
                            value={"Rp." + totalomset.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
                            />
                          </Col>
                          </FormGroup>
                          <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            <b>Total Omset</b>
                          </Label>
                          <Col sm={6}>
                          <Input
                          className="form-control-alternative"
                            disabled
                            type="text"
                            name="barcode"
                            style={{fontWeight: 'bold'}}
                            placeholder="Grand Total"
                            value={"Rp." + totalomset1.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
                            />
                          </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardFooter>
                    <CardFooter>
                      <Button color="danger" onClick={toggle}>
                          Simpan
                      </Button>
                      <Link className="btn btn-info" to="/admin/sales-order">
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
                </Form>
              </Card>
            </CardBody>
          </div>
        </Row>
    </Container>
    </>
  );
}