import React, { useState } from "react";
import { Card, CardBody, Row, Col, Container, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

import SimpleHeader from "components/Headers/SimpleHeader.js";
import classnames from "classnames";

import ReceivingPo from "./ReceivingPo/Index";
import ValidasiReceivingPo from "./ValidasiReceivingPo/Index";
import CetakReceiving from "./CetakReceivingPo/Index";

export default function ReceivingPO() {
	const [activeTab, setActiveTab] = useState("1");
	const allInfo = JSON.parse(localStorage.allinfo);
	const receivingPO = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Receiving PO").map((p) => p.read_access));
	const validasiKepalaGudang = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi PO").map((p) => p.read_access));
	const cetak = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Cetak Receiving PO").map((p) => p.read_access));

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<>
			<SimpleHeader name="Receiving PO" parentName="PO" />
			<Container className="mt--6" fluid>
				<Row>
					<div className="col">
						<Card>
							<CardBody>
								<Nav tabs>
									{receivingPO && receivingPO === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "1" })}
												onClick={() => {
													toggle("1");
												}}>
												Receiving PO
											</NavLink>
										</NavItem>
									)}
									{validasiKepalaGudang && validasiKepalaGudang === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "2" })}
												onClick={() => {
													toggle("2");
												}}>
												Validasi Kepala Gudang
											</NavLink>
										</NavItem>
									)}
									{cetak && cetak === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "3" })}
												onClick={() => {
													toggle("3");
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
												<ReceivingPo />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="2">
										<Row>
											<Col md="12">
												<ValidasiReceivingPo />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="3">
										<Row>
											<Col md="12">
												<CetakReceiving />
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
