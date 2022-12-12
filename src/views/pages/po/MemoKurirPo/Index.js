import React, { useState } from "react";
import { Card, CardBody, Row, Col, Container, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

import SimpleHeader from "components/Headers/SimpleHeader.js";
import classnames from "classnames";

import MemoKurirPo from "./MemoKurirPo/Index.js";
import ValidasiAdminPo from "./ValidasiAdminPo/Index.js";
import CetakMemo from "./CetakMemo/Index.js";

export default function Item() {
	const [activeTab, setActiveTab] = useState("1");
	const allInfo = JSON.parse(localStorage.allinfo);
	const memoKurirPO = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Memo PO").map((p) => p.read_access));
	const validasiAdminPO = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi Memo PO").map((p) => p.read_access));
	const cetak = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Cetak Memo PO").map((p) => p.read_access));

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<>
			<SimpleHeader name="Memo Kurir PO" parentName="PO" />
			<Container className="mt--6" fluid>
				<Row>
					<div className="col">
						<Card>
							<CardBody>
								<Nav tabs>
									{memoKurirPO && memoKurirPO === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "1" })}
												onClick={() => {
													toggle("1");
												}}>
												Memo Kurir PO
											</NavLink>
										</NavItem>
									)}
									{validasiAdminPO && validasiAdminPO === "1" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "2" })}
												onClick={() => {
													toggle("2");
												}}>
												Validasi Admin PO
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
												<MemoKurirPo />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="2">
										<Row>
											<Col md="12">
												<ValidasiAdminPo />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="3">
										<Row>
											<Col md="12">
												<CetakMemo />
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
