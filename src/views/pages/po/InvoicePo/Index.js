import React, { useState } from "react";
import { Card, CardBody, Row, Col, Container, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

import SimpleHeader from "components/Headers/SimpleHeader.js";
import classnames from "classnames";

import InvoicePO from "./InvoicePo/Index";
import ValidasiAdminFinance from "./ValidasiAdminFinance/Index";
import ValidasiPimpinan from "./ValidasiPimpinan/Index";
import CetakInvoice from "./CetakInvoice/Index";

export default function Item() {
	const [activeTab, setActiveTab] = useState("1");
	const allInfo = JSON.parse(localStorage.allinfo);
	const invoicePO = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Invoice PO").map((p) => p.read_access));
	const validasiAdminFinance = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi Invoice PO Admin").map((p) => p.read_access));
	const validasiDirektur = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi Invoice PO Direktur").map((p) => p.read_access));
	const cetak = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Cetak Invoice PO").map((p) => p.read_access));

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<>
			<SimpleHeader name="Invoice PO" parentName="PO" />
			<Container className="mt--6" fluid>
				<Row>
					<div className="col">
						<Card>
							<CardBody>
								<Nav tabs>
									{invoicePO && invoicePO === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "1" })}
												onClick={() => {
													toggle("1");
												}}>
												Invoice PO
											</NavLink>
										</NavItem>
									)}
									{validasiAdminFinance && validasiAdminFinance === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "2" })}
												onClick={() => {
													toggle("2");
												}}>
												Validasi Admin Finance
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
									{cetak && cetak === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "4" })}
												onClick={() => {
													toggle("4");
												}}>
												Cetak
											</NavLink>
										</NavItem>
									)}
								</Nav>
								<TabContent activeTab={activeTab}>
									<TabPane tabId="1">
										<Row>
											<Col md="12">
												<InvoicePO />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="2">
										<Row>
											<Col md="12">
												<ValidasiAdminFinance />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="3">
										<Row>
											<Col md="12">
												<ValidasiPimpinan />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="4">
										<Row>
											<Col md="12">
												<CetakInvoice />
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
