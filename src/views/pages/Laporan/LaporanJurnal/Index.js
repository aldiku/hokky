/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Label,
  FormGroup,
  Row,
  Input,
  CardHeader,
  CardFooter,
  Col,
  Button,
  Container,
  CardImg,
  CardImgOverlay,
  CardTitle,
  CardText,
  ListGroupItem,
  ListGroup,
} from "reactstrap";
import { Link , useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function LaporanJurnal() {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  const [itemId, setItemId] = useState(1);
  const [itemTotal, setItemTotal] = useState(null);
  const [query, setQuery] = useState(null);
  const [isSearchShow, setIsSearchShow] = useState(false); 
  const headers = { Authorization: `Bearer ${token}` };
  const redirectPrefix = `/admin/person/edit/`;
  const [namePerson, setNamePerson] = useState("");
  const [limitPiutang, setLimitPiutang] = useState("");
  const [limitHutang, setLimitHutang] = useState("");
  const [npwp, setNpwp] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [citys, setCitys] = useState([]);
  const [city, setCity] = useState("");
  const [bankname1,setBankName1] = useState("");
  const [bankname2,setBankName2] = useState("");
  const [bankname3,setBankName3] = useState("");
  const [bankaccount1,setBankAccount1] = useState("");
  const [bankaccount2,setBankAccount2] = useState("");
  const [bankaccount3,setBankAccount3] = useState("");
  const [banknumber1,setBankNumber1] = useState("");
  const [banknumber2,setBankNumber2] = useState("");
  const [banknumber3,setBankNumber3] = useState("");

	useEffect(() => {
		getById();
        getUser();
	}, [itemId]);

	const getById = () => {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        axios
          .get(
            `${process.env.REACT_APP_API_BASE_URL}/person/${itemId}`,
            { headers }
          )
          .then((data) => {
            setNamePerson(data.data.response.person_name);
            setAddress(data.data.response.address);
            setLimitHutang(data.data.response.limit_hutang);
            setLimitPiutang(data.data.response.limit_piutang);
            setPhone(data.data.response.phone);
            setNpwp(data.data.response.npwp);
            getProvinsi(data.data.response.province);
            setCity(data.data.response.city);
            setBankName1(data.data.response.bank_name1);
            setBankName2(data.data.response.bank_name2);
            setBankName3(data.data.response.bank_name3);
            setBankAccount1(data.data.response.bank_account1);
            setBankAccount2(data.data.response.bank_account2);
            setBankAccount3(data.data.response.bank_account3);
            setBankNumber1(data.data.response.bank_number1);
            setBankNumber2(data.data.response.bank_number2);
            setBankNumber3(data.data.response.bank_number3);
            // setImage(data.data.response.logo);
            
          })
          .catch(function (error) {
            console.log(error);
          });
      };

    //   useEffect(() => {
    //     getProvinsi();
    //   }, []);
    
      const getProvinsi = (id) => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/province/list`, { headers
        })
        .then(data => {
          setProvinces(data.data.response_data);
          getKota(id)
          setProvince(id)
        //   setCity(id)
        })
          .catch(function (error) {
            console.log(error)
          })
      }
    
      const getKota = (id) => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/city?province_id=${id}`, { headers
        })
        .then(data => {
          setCitys(data.data.response_data);
        //   setCity(id)
        })
          .catch(function (error) {
            console.log(error)
          })
      }

  

  const getUser = async () => {
    let filter = {
        page: 1,
        per_page: 10,
        warehouse_id: parseInt(warehouse),
    };
    const data = filter;

    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/person`, data, { headers });
    setItemTotal(res.data.total_item);
};

const search = async () => {
    if (Number(query) > 0) {
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/person`, { person_name: query  }, { headers });
        if (res.data.status !== 404) setAllItem(res.data);
        else {
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/person`, { person_code: query }, { headers });
            if (res.data.status !== 404) setAllItem(res.data);
            else setAllItem(null);
        }
    } else {
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/person`, { npwp_no: query }, { headers });
        if (res.data.status !== 404) setAllItem(res.data);
        else setAllItem(null);
    }
    setIsSearchShow(true);
};

const searchShow = (item) => {
    setItemId(item.id);
    setIsSearchShow(false);
};

    const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  return (
    <>
      <div>
      <SimpleHeader name="Laporan Jurnal" parentName="Report" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
                <CardBody>
                    <Row>
                        <div className="card-columns">
                            <Card>
                                <CardImg
                                alt="..."
                                src={require("assets/img/theme/neraca.png").default}
                                top
                                />
                                <CardBody className="bg-secondary shadow">
                                <CardTitle><b>NERACA</b></CardTitle>
                                <CardText>
                                Menampilan apa yang anda miliki (aset), apa yang anda hutang (liabilitas), dan apa yang anda sudah investasikan pada perusahaan anda (ekuitas).
                                </CardText>
                                <CardText>
                                    <Link className="btn btn-info" to="/admin/laporan-jurnal/jurnal-neraca">
                                        Lihat Laporan
                                    </Link>
                                </CardText>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardImg
                                alt="..."
                                src={require("assets/img/theme/umum.png").default}
                                top
                                />
                                <CardBody className="bg-secondary shadow">
                                <CardTitle><b>UMUM</b></CardTitle>
                                <CardText>
                                    Menampilkan Laporan Secara Umum.
                                    <br></br>
                                </CardText>
                                <CardText>
                                    {/* <Link color="primary"  to="/admin/warehouse/pusat/create">
                                    Lihat Laporan
                                    </Link> */}
                                    <Link className="btn btn-info" to="/admin/laporan-jurnal/jurnal-umum">
                                        Lihat Laporan
                                    </Link>
                                </CardText>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardImg
                                alt="..."
                                src={require("assets/img/theme/laba-rugi.png").default}
                                top
                                />
                                <CardBody className="bg-secondary shadow">
                                <CardTitle><b>LABA RUGI</b></CardTitle>
                                <CardText>
                                Menampilkan setiap tipe transaksi dan jumlah total untuk pendapatan dan pengeluaran anda.
                                </CardText>
                                <CardText>
                                <Link className="btn btn-info" to="/admin/laporan-jurnal/jurnal-laba-rugi">
                                        Lihat Laporan
                                    </Link>
                                </CardText>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardImg
                                alt="..."
                                src={require("assets/img/theme/buku-besar.png").default}
                                top
                                />
                                <CardBody className="bg-secondary shadow">
                                <CardTitle><b>BUKU BESAR</b></CardTitle>
                                <CardText>
                                    Laporan ini menampilkan semua transaksi yang telah dilakukan untuk suatu periode.
                                </CardText>
                                <CardText>
                                    <Link className="btn btn-info" to="/admin/laporan-jurnal/jurnal-buku-besar">
                                        Lihat Laporan
                                    </Link>
                                </CardText>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardImg
                                alt="..."
                                src={require("assets/img/theme/penyesuaian.png").default}
                                top
                                />
                                <CardBody className="bg-secondary shadow">
                                <CardTitle><b>PENYESUAIAN</b></CardTitle>
                                <CardText>
                                    Laporan ini menampilkan semua transaksi yang telah dilakukan untuk Penyesuaian.
                                </CardText>
                                <CardText>
                                    <Link className="btn btn-info" to="/admin/laporan-jurnal/jurnal-penyesuaian">
                                        Lihat Laporan
                                    </Link>
                                </CardText>
                                </CardBody>
                            </Card>
                            {/* <Card>
                                <CardImg
                                alt="..."
                                src={require("assets/img/theme/umum.png").default}
                                top
                                />
                                <CardBody>
                                <CardTitle>Card title</CardTitle>
                                <CardText>
                                    This card has supporting text below as a natural lead-in to
                                    additional content.
                                </CardText>
                                <CardText>
                                    <Button color="primary"  onClick={""}>
                                    Lihat Laporan
                                    </Button>
                                </CardText>
                                </CardBody>
                            </Card> */}
                        </div>
					</Row>
                </CardBody>
          </div>
        </Row>
      </Container>
      </div>
    </>
  );
}