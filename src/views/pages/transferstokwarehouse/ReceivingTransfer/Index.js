import React, { useState } from "react";
import { Card, CardBody, Row, Col, Container, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

import SimpleHeader from "components/Headers/SimpleHeader.js";
import classnames from "classnames";

import ReceivingTransfer from "./ReceivingTransfer/Index";
import ValidasiKepalaGudang from "./ValidasiKepalaGudang/Index";
import CetakReceivingTransfer from "./CetakReceivingTransfer/Index";

export default function So() {
	const [activeTab, setActiveTab] = useState("1");
	const allInfo = JSON.parse(localStorage.allinfo);
	const receivingTransfer = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Receiving TE").map((p) => p.read_access));
	const validasiKepalaGudang = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi Receiving TE").map((p) => p.read_access));
	const cetak = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Cetak Receiving TE").map((p) => p.read_access));

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<>
			<SimpleHeader name="Receiving Transfer" parentName="Inventori" />
			<Container className="mt--6" fluid>
				<Row>
					<div className="col">
						<Card>
							<CardBody>
								<Nav tabs>
									{receivingTransfer && receivingTransfer === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "1" })}
												onClick={() => {
													toggle("1");
												}}>
												Receiving Transfer
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
												History Receiving Transfer Stok
											</NavLink>
										</NavItem>
									)}
								</Nav>
								<TabContent activeTab={activeTab}>
									<TabPane tabId="1">
										<Row>
											<Col md="12">
												<ReceivingTransfer />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="2">
										<Row>
											<Col md="12">
												<ValidasiKepalaGudang />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="3">
										<Row>
											<Col md="12">
												<CetakReceivingTransfer />
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
