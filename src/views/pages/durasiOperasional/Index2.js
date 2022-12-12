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
	Col,
	Button,
	Container,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function DurasiOperasional() {
	const token = localStorage.token;
	const warehouseId = localStorage.warehouse;
    const [durasipo, setDurasiPo] = useState("")
    const [durasiso, setDurasiSo] = useState("")
    const [durasitw, setDurasiTw] = useState("")
    const [itemId, setItemId] = useState(1);
    const [itemTotal, setItemTotal] = useState(null);
    const [allItem, setAllItem] = useState([]);
    const [query, setQuery] = useState(null);
    const [isSearchShow, setIsSearchShow] = useState(false);
    const headers = { Authorization: `Bearer ${token}` };
	const redirectPrefix = `/admin/durasi-operasional/edit/`;

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
	        `${process.env.REACT_APP_API_BASE_URL}/durasi-operasional/${itemId}`,
	        { headers }
	      )
	      .then((data) => {
            setDurasiPo(data.data.response.durasi);
            // setDurasiSo(data.data.response.durasi_so);
            // setDurasiTw(data.data.response.durasi_tw);
	      })
	      .catch(function (error) {
	        console.log(error);
	      });
	  };

	const getUser = async () => {
		let filter = {
			page: 1,
			per_page: 10,
			warehouse_id: parseInt(warehouseId),
		};
		const data = filter;
		const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/durasi-operasional`, data, { headers });
		setItemTotal(res.data.total_item);
	};

	const search = async () => {
		if (Number(query) > 0) {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/durasi-operasional`, { durasi_po: query , warehouse_id: parseInt(warehouseId)  }, { headers });
			if (res.data.status !== 404) setAllItem(res.data);
			else {
				const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/durasi-operasional`, { durasi_so: query , warehouse_id: parseInt(warehouseId) }, { headers });
				if (res.data.status !== 404) setAllItem(res.data);
				else setAllItem(null);
			}
		} else {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/durasi-operasional`, { durasi_tw: query , warehouse_id: parseInt(warehouseId) }, { headers });
			if (res.data.status !== 404) setAllItem(res.data);
			else setAllItem(null);
		}
		setIsSearchShow(true);
	};

	const searchShow = (item) => {
		setItemId(item.id);
		setIsSearchShow(false);
	};

	return (
		<>
			<div>
				<SimpleHeader name="Batas Waktu" parentName="Master" />
				<Container className="mt--6" fluid>
					<Row>
						<div className="col">
								{/* <CardBody> */}
								{/* Button card */}
								<Card className="position-sticky boxShadow" style={{ top: 0, zIndex: "5" }}>
									<CardBody className="ml-3 pb-0">
										<Row md="12">
											<Col md="5">
												<Button onClick={() => setItemId(1)} color="danger" type="button">
													First
												</Button>
												<Button onClick={() => setItemId((prev) => prev - 1)} disabled={itemId === 1} color="success" type="button">
													<i className="ni ni-bold-left" /> Prev
												</Button>
												<Button onClick={() => setItemId((prev) => prev + 1)} disabled={itemId === itemTotal} color="success" type="button">
													Next <i className="ni ni-bold-right" />
												</Button>
												<Button onClick={() => setItemId(itemTotal)} disabled={itemTotal === null} color="warning" type="button">
													End
												</Button>
											</Col>
											<Col md="4">
												<FormGroup row>
													<Col sm={7}>
														<Input
															className="form-control-alternative"
															placeholder="Search Batas Waktu"
															type="search"
															onChange={(e) => setQuery(e.target.value)}
															onKeyDown={search}
														/>
													</Col>
													<Col sm={2}>
													</Col>
												</FormGroup>
											</Col>
											<Col md="3">
												<div style={{ textAlign: "right" }}>
													<Link className="btn btn-info" to={redirectPrefix + itemId}
													>
														<i className="fas fa-user-edit" /> Edit
													</Link>
													<Link className="btn btn-danger" to="/admin/durasi-operasional/create">
														Tambah
													</Link>
												</div>
											</Col>
										</Row>
									</CardBody>
								</Card>

								{/* Search card */}
								{isSearchShow && query && (
									<Card className="boxShadow" style={{ maxHeight: "15.5rem", overflowY: "auto", paddingTop: "1rem", position: "relative" }}>
										<div style={{ position: "absolute", top: "2.5px", right: "1rem", cursor: "pointer", fontSize: "2rem" }}>
											<i className="fas fa-window-close text-danger" onClick={() => setIsSearchShow(false)}></i>
										</div>
										<span className="text-center mb-3">
											<b>Pencarian berdasarkan:</b> {query}
										</span>
										{allItem?.response ? (
											allItem.response.map((item) => (
												<CardBody key={item.id} style={{ minHeight: "6rem", padding: "1rem" }} className="bgSearch" onClick={() => searchShow(item)}>
													<div>
														<b>Durasi:</b> {item.durasi}
													</div>
                                                    {/* <div>
														<b>Durasi SO:</b> {item.durasi_so ? item.durasi_so : "(Not available)"}
													</div>
													<div>
														<b>Durasi TW:</b> {item.durasi_tw ? item.durasi_tw : "(Not available)"}
													</div> */}
													<hr style={{ margin: "0.75rem -1rem 0 -1rem" }} />
												</CardBody>
											))
										) : (
											<div className="text-center mb-3 text-danger">User "{query}" tidak ada bosku!</div>
										)}
									</Card>
								)}
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                        <h3>Batas Waktu</h3>
                                    </CardHeader>
                                    <CardBody>
                                    <Row md="12">
                                        <Col md="6">
                                            <FormGroup row>
                                            <Label
                                                for="exampleEmail"
                                                sm={4}
                                            >
                                                Durasi
                                            </Label>
                                            <Col sm={7}>
                                                <Input
                                                disabled
                                                className="form-control-alternative"
                                                type="text"
                                                name="Area"
                                                placeholder="Masukan Durasi"
                                                value={durasipo}
                                                onChange={(e) => {
                                                    setDurasiPo(e.target.value);
                                                }}
                                                />
                                            </Col>
                                            </FormGroup>
                                            {/* <FormGroup row>
                                            <Label
                                                for="exampleEmail"
                                                sm={4}
                                            >
                                                Durasi So
                                            </Label>
                                            <Col sm={7}>
                                                <Input
                                                disabled
                                                className="form-control-alternative"
                                                type="text"
                                                name="SISI"
                                                placeholder="Durasi So"
                                                value={durasiso}
                                                onChange={(e) => {
                                                    setDurasiSo(e.target.value);
                                                }}
                                                />
                                            </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label
                                                    for="exampleEmail"
                                                    sm={4}
                                                >
                                                    Durasi Transfer Stok
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    disabled
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="SISI"
                                                    placeholder="Durasi Transfer Stok"
                                                    value={durasitw}
                                                    onChange={(e) => {
                                                        setDurasiTw(e.target.value);
                                                    }}
                                                    />
                                                </Col>
                                            </FormGroup> */}
                                        </Col>
                                        {/* <Col md="6">
                                            <FormGroup row>
                                            <Label
                                                for="exampleEmail"
                                                sm={4}
                                            >
                                                Rak
                                            </Label>
                                            <Col sm={7}>
                                                <Input
                                                disabled
                                                    className="form-control-alternative"
                                                type="text"
                                                name="SISI"
                                                placeholder="Masukan Rak"
                                                value={display}
                                                onChange={(e) => {
                                                    setDisplay(e.target.value);
                                                }}
                                                />
                                            </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                            <Label
                                                for="exampleEmail"
                                                sm={4}
                                            >
                                                Stock Minimum 
                                            </Label>
                                            <Col sm={7}>
                                                <Input
                                                disabled
                                                    className="form-control-alternative"
                                                type="number"
                                                name="Minimum Stock"
                                                placeholder="Input Stock Minimum"
                                                value={minimumstock}
                                                onChange={(e) => {
                                                setMinimumStock(e.target.value);
                                                }}
                                                />
                                            </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                            <Label
                                                for="exampleEmail"
                                                sm={4}
                                            >
                                                Stock Maximum
                                            </Label>
                                            <Col sm={7}>
                                                <Input
                                                disabled
                                                    className="form-control-alternative"
                                                type="number"
                                                name="Minimum Stock"
                                                placeholder="Input Stock Maximum"
                                                value={maximumstock}
                                                onChange={(e) => {
                                                setMaximumStock(e.target.value);
                                                }}
                                                />
                                            </Col>
                                            </FormGroup>
                                        </Col> */}
                                    </Row>
                                    </CardBody>
                                </Card>
                                {/* <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                        <h3>Planogram</h3>
                                    </CardHeader>
                                    <CardBody>
                                    <Row md="12">
                                        <Col md="12">
                                        <CardGroup>
                                            <Card>
                                                <CardImg
                                                alt="Card image cap"
                                                src={area1}
                                                top
                                                width="100%"
                                                />
                                                <CardBody>
                                                <CardTitle tag="h3" align="center">
                                                    Area
                                                </CardTitle>
                                                </CardBody>
                                            </Card>
                                           
                                            <Card>
                                                <CardImg
                                                alt="Card image cap"
                                                src={posisi1}
                                                top
                                                width="100%"
                                                />
                                                <CardBody>
                                                <CardTitle tag="h3" align="center">
                                                    Posisi
                                                </CardTitle>
                                                </CardBody>
                                            </Card>
                                            <Card>
                                                <CardImg
                                                alt="Card image cap"
                                                src={sisi1}
                                                top
                                                width="100%"
                                                />
                                                <CardBody>
                                                <CardTitle tag="h3" align="center">
                                                    Sisi
                                                </CardTitle>
                                                </CardBody>
                                            </Card>
                                            <Card>
                                                <CardImg
                                                alt="Card image cap"
                                                src={display1}
                                                top
                                                width="100%"
                                                />
                                                <CardBody>
                                                <CardTitle tag="h3" align="center">
                                                    Display
                                                </CardTitle>
                                                </CardBody>
                                            </Card>
                                            </CardGroup>
                                        </Col>
                                        </Row>
                                    </CardBody>
                                </Card> */}
						</div>
					</Row>
				</Container>
			</div>
		</>
	);
}
