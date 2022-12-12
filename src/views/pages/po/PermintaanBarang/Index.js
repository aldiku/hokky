import React, { useState } from "react";
import { Card, CardBody, Row, Col, Container, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

import SimpleHeader from "components/Headers/SimpleHeader.js";
import classnames from "classnames";

import PermintaanBarang from "./PermintaanBarang/Index.js";
import ValidasiPermintaanBarang from "./ValidasiPermintaanBarang/Index.js";
import CetakPermintaanBarang from "./CetakPermintaanBarang/Index.js";

export default function Item() {
	const [activeTab, setActiveTab] = useState("1");
	const allInfo = JSON.parse(localStorage.allinfo);
	const permintaanBarang = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Rfq PO").map((p) => p.read_access));
	const validasiPermintaanBarang = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi Rfq PO").map((p) => p.read_access));
	const cetak = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Cetak Rfq PO").map((p) => p.read_access));

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<>
			<SimpleHeader name="Permintaan Barang" parentName="PO" />
			<Container className="mt--6" fluid>
				<Row>
					<div className="col">
						<Card>
							<CardBody>
								<Nav tabs>
									{permintaanBarang && permintaanBarang === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "1" })}
												onClick={() => {
													toggle("1");
												}}>
												Permintaan Barang
											</NavLink>
										</NavItem>
									)}
									{validasiPermintaanBarang && validasiPermintaanBarang === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "2" })}
												onClick={() => {
													toggle("2");
												}}>
												Validasi Permintaan Barang
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
												<PermintaanBarang />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="2">
										<Row>
											<Col md="12">
												<ValidasiPermintaanBarang />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="3">
										<Row>
											<Col md="12">
												<CetakPermintaanBarang />
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
