import React, { useState } from "react";
import { Card, CardBody, Row, Col, Container, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

import SimpleHeader from "components/Headers/SimpleHeader.js";
import classnames from "classnames";

import PenawaranPo from "views/pages/po/PenawaranPo/Index.js";
import ValidatorPo from "views/pages/po/ValidatorPo/Index.js";
import AdminApprovePo from "views/pages/po/AdminApprove/Index.js";
import ValidasiPo from "views/pages/po/ValidasiPo/Index.js";
import CetakPo from "views/pages/po/CetakPo/Index";

export default function Item() {
	const [activeTab, setActiveTab] = useState("1");
	const allInfo = JSON.parse(localStorage.allinfo);
	const penawaranPO = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab PO").map((p) => p.read_access));
	const validasiPenawaranPO = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi PO").map((p) => p.read_access));
	const validasiAdminPO = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi PO Admin").map((p) => p.read_access));
	const validasiDirektur = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi PO Direktur").map((p) => p.read_access));
	const cetakPO = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Cetak PO").map((p) => p.read_access));

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<>
			<SimpleHeader name="Purchase Order" parentName="Admin" />
			<Container className="mt--6" fluid>
				<Row>
					<div className="col">
						<Card>
							<CardBody>
								<Nav tabs>
									{penawaranPO && penawaranPO === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "1" })}
												onClick={() => {
													toggle("1");
												}}>
												Permintaan PO
											</NavLink>
										</NavItem>
									)}
									{validasiPenawaranPO && validasiPenawaranPO === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "2" })}
												onClick={() => {
													toggle("2");
												}}>
												Validasi Permintaan PO
											</NavLink>
										</NavItem>
									)}
									{validasiAdminPO && validasiAdminPO === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "3" })}
												onClick={() => {
													toggle("3");
												}}>
												Validasi Admin PO
											</NavLink>
										</NavItem>
									)}
									{validasiDirektur && validasiDirektur === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "4" })}
												onClick={() => {
													toggle("4");
												}}>
												Validasi Direktur
											</NavLink>
										</NavItem>
									)}
									{cetakPO && cetakPO === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "5" })}
												onClick={() => {
													toggle("5");
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
												<PenawaranPo />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="2">
										<Row>
											<Col md="12">
												<ValidasiPo />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="3">
										<Row>
											<Col md="12">
												<AdminApprovePo />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="4">
										<Row>
											<Col md="12">
												<ValidatorPo />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="5">
										<Row>
											<Col md="12">
												<CetakPo />
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
