import React, { useState } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

import SimpleHeader from "components/Headers/SimpleHeader.js";
import classnames from "classnames";

import TransferStokWarehouse from "./transferstokwarehouse/Index";
import ValidasiKepalaToko from "./ValidasiKepalaToko/Index";
import ValidasiDirektur from "./ValidasiDirektur/Index";
import CetakTransferStokWarehouse from "./CetakTranferStokWarehouse/Index";

export default function TransferStokWarehousePage() {
  const [activeTab, setActiveTab] = useState("1");
  const allInfo = JSON.parse(localStorage.allinfo);
  const transferStockWarehouse = String(
    allInfo.privileges
      .filter((i) => i.privilege_name === "Tab Transfer Eksternal")
      .map((p) => p.read_access)
  );
  const validasiManajer = String(
    allInfo.privileges
      .filter((i) => i.privilege_name === "Tab Validasi TE Kepala Toko")
      .map((p) => p.read_access)
  );
  const validasiDirektur = String(
    allInfo.privileges
      .filter((i) => i.privilege_name === "Tab Validasi TE Direktur")
      .map((p) => p.read_access)
  );
  const cetak = String(
    allInfo.privileges
      .filter((i) => i.privilege_name === "Tab Cetak TE")
      .map((p) => p.read_access)
  );

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <SimpleHeader name="Transfer Eksternal" parentName="Inventori" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Nav tabs>
                  {transferStockWarehouse && transferStockWarehouse === "1" && (
                    <NavItem className="pointer">
                      <NavLink
                        aria-selected={activeTab.tabs === 1}
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        Transfer Eksternal
                      </NavLink>
                    </NavItem>
                  )}
                  {validasiManajer && validasiManajer === "1" && (
                    <NavItem className="pointer">
                      <NavLink
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        Validasi Manajer
                      </NavLink>
                    </NavItem>
                  )}
                  {validasiDirektur && validasiDirektur === "1" && (
                    <NavItem className="pointer">
                      <NavLink
                        className={classnames({ active: activeTab === "3" })}
                        onClick={() => {
                          toggle("3");
                        }}
                      >
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
                        }}
                      >
                        History Transfer Stok
                      </NavLink>
                    </NavItem>
                  )}
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col md="12">
                        <TransferStokWarehouse />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col md="12">
                        <ValidasiKepalaToko />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col md="12">
                        <ValidasiDirektur />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="4">
                    <Row>
                      <Col md="12">
                        <CetakTransferStokWarehouse />
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
