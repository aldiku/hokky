import React, { useState } from "react";
import { Card, CardBody, Row, Col, Container, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

import SimpleHeader from "components/Headers/SimpleHeader.js";
import classnames from "classnames";
// import CreateFinanceBkk from "./financeBkk/Create";
import BuktiKasKeluarFinance from "./financeBkk/Index";
import ValidasiKepalaTokoBKK from "./ValidasiKepalaFinance/Index";
import ValidasiDirekturFinanceBkk from "./ValidasiDirektur/Index";
// import BuktiKasKeluar from "./BuktiKasKeluar/Index";
// import ValidasiKepalaFinance from "./ValidasiKepalaFinance/Index";
// import ValidasiPimpinan from "./ValidasiPimpinan/Index";
// import CetakKasKeluar from "./CetakKasKeluar/Index";

export default function BKKFINANCE() {
	const [activeTab, setActiveTab] = useState("1");
	const allInfo = JSON.parse(localStorage.allinfo);
	const buktiKasKeluar = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab BKK").map((p) => p.read_access));
	const validasiKepalaFinance = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi BKK Admin").map((p) => p.read_access));
	const validasiDirektur = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi BKK Direktur").map((p) => p.read_access));
	// const cetak = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Cetak BKK").map((p) => p.read_access));

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<>
			<SimpleHeader name="Bukti Kas Keluar" parentName="PO" />
			<Container className="mt--6" fluid>
				<Row>
					<div className="col">
						<Card>
							<CardBody>
								<Nav tabs>
									{buktiKasKeluar && buktiKasKeluar === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "1" })}
												onClick={() => {
													toggle("1");
												}}>
												Bukti Kas Keluar
											</NavLink>
										</NavItem>
									)}
									{validasiKepalaFinance && validasiKepalaFinance === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "2" })}
												onClick={() => {
													toggle("2");
												}}>
												Validasi Kepala Finance
											</NavLink>
										</NavItem>
									)}
									{validasiDirektur && validasiDirektur === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "3" })}
												onClick={() => {
													toggle("3");
												}}>
												Validasi Direktur
											</NavLink>
										</NavItem>
									)}
									{/* {cetak && cetak === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "4" })}
												onClick={() => {
													toggle("4");
												}}>
												Cetak
											</NavLink>
										</NavItem>
									)} */}
								</Nav>
								<TabContent activeTab={activeTab}>
									<TabPane tabId="1">
										<Row>
											<Col md="12">
												<BuktiKasKeluarFinance />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="2">
										<Row>
											<Col md="12">
												<ValidasiKepalaTokoBKK />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="3">
										<Row>
											<Col md="12">
												<ValidasiDirekturFinanceBkk />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="4">
										<Row>
											<Col md="12">
												{/* <CetakKasKeluar /> */}
											</Col>
										</Row>
									</TabPane>
								</TabContent>
							</CardBody>
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}
