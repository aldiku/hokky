import React, { useState } from "react";
import { Card, CardBody, Row, Container, Nav, NavItem, NavLink, TabContent, TabPane, Col } from "reactstrap";

import SimpleHeader from "components/Headers/SimpleHeader.js";
import classnames from "classnames";

import PoReturPo from "./PoRetur/Index";
import ValidasiDirekturReturPo from "./ValidasiDirekturPoRetur/Index";
import ValidasiAdminTokoReturPo from "./ValidasiAdminToko/Index";
import CetakReturPo from "./CetakPoRetur/Index";

export default function PoRetur() {
	const [activeTab, setActiveTab] = useState("1");
	const allInfo = JSON.parse(localStorage.allinfo);
	const poRetur = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Retur PO").map((p) => p.read_access));
	const validasiManajer = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi Retur PO Admin").map((p) => p.read_access));
	const validasiDirektur = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi Retur PO Direktur").map((p) => p.read_access));
	const cetak = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Cetak Retur PO").map((p) => p.read_access));

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<>
			<SimpleHeader name="Po Retur" parentName="PO" />
			<Container className="mt--6" fluid>
				<Row>
					<div className="col">
						<Card>
							<CardBody>
								<Nav tabs>
									{poRetur && poRetur === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "1" })}
												onClick={() => {
													toggle("1");
												}}>
												Po Retur
											</NavLink>
										</NavItem>
									)}
									{validasiManajer && validasiManajer === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "2" })}
												onClick={() => {
													toggle("2");
												}}>
												Validasi kepala Purchasing
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
												Validasi Office Manager
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
												<PoReturPo />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="2">
										<Row>
											<Col md="12">
												<ValidasiAdminTokoReturPo />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="3">
										<Row>
											<Col md="12">
												<ValidasiDirekturReturPo />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="4">
										<Row>
											<Col md="12">
												<CetakReturPo />
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
