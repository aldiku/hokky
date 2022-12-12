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
  TabPane
} from "reactstrap";

import SimpleHeader from "components/Headers/SimpleHeader.js";
import classnames from 'classnames';

// import PermintaanBarang from "./PermintaanBarang/Index.js";
// import ValidasiPermintaanBarang from "./ValidasiPermintaanBarang/Index.js";
// import CetakPenawawaran from "./CetakPenawaranBarang/Index.js";
import SoReturKasir from "./SoReturKasir/Index";
import ValidasiKepalaTokoReturKasir from "./ValidasiKepalaToko/Index";
import ValidasiOfficeManager from "./ValidasiOfficeManager/Index";
import ValidasiDirekturReturKasir from "./ValidasiDirektur/Index";
import CetakReturKasir from "./CetakReturKasir/Index";
// import SoReturAdminSo from "./ValidasiAdminSo/Index.js";
// import SoReturValidasiManajerOffice from "./ValidasiManajerOffice/Index.js";
// import ValidasiDirekturSoRetur from "./ValidasiDirektur/Index.js";
// import ValidasiCetakRetur from "./CetakReturSo/Index.js";



export default function SoRetur() {
    const [activeTab, setActiveTab] = useState('1');
    const allInfo = JSON.parse(localStorage.allinfo);
    // const ReturSoProyek = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Retur SO").map((p) => p.read_access));
    const ReturSoKasir = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Retur Cashier").map((p) => p.read_access));
    const validasiadmin1 = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi Retur SO Admin1").map((p) => p.read_access));
    const validasiadmin2 = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi Retur SO Admin2").map((p) => p.read_access));
    const validasidirektur = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi Retur SO Direktur").map((p) => p.read_access));
    const cetak = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Cetak Retur SO").map((p) => p.read_access));

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <>
      <SimpleHeader name="Retur Penjualan" parentName="SO" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Nav tabs>
                {ReturSoKasir && ReturSoKasir === "1" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => { toggle('1'); }}
                    >
                      Kasir
                    </NavLink>
                  </NavItem>
                )}
                {validasiadmin1 && validasiadmin1 === "1" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '2' })}
                      onClick={() => { toggle('2'); }}
                    >
                      Validasi Kepala Toko
                    </NavLink>
                  </NavItem>
                )}
                {validasiadmin2 && validasiadmin2 === "1" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '3' })}
                      onClick={() => { toggle('3'); }}
                    >
                      Validasi Operation Manager 
                    </NavLink>
                  </NavItem>
                )}
                {validasidirektur && validasidirektur === "1" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '4' })}
                      onClick={() => { toggle('4'); }}
                    >
                      Validasi Direktur
                    </NavLink>
                  </NavItem>
                )}
                {cetak && cetak === "1" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '5' })}
                      onClick={() => { toggle('5'); }}
                    >
                      Cetak
                    </NavLink>
                  </NavItem>
                )}
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col md="12">
                        <SoReturKasir />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col md="12">
                        <ValidasiKepalaTokoReturKasir />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col md="12">
                        <ValidasiOfficeManager />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="4">
                    <Row>
                      <Col md="12">
                        <ValidasiDirekturReturKasir />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="5">
                    <Row>
                      <Col md="12">
                        <CetakReturKasir />
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
