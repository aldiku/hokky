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

import SuratJalanKasir from "views/pages/so/SuratJalanKasir/SuratJalanKasir/Index.js";
import ValidasiSuratJalanKasir from "views/pages/so/SuratJalanKasir/ValidasiSuratJalanKasir/Index.js"
import CetakSuratJalanKasir from "views/pages/so/SuratJalanKasir/CetakSuratJalanKasir/Index";
 
export default function So() {
  const [activeTab, setActiveTab] = useState('1');
  const allInfo = JSON.parse(localStorage.allinfo);
  const permintaanBarang = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Surat Jalan SO").map((p) => p.read_access));
	const validasiPermintaanBarang = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi Surat Jalan SO").map((p) => p.read_access));
	const cetak = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Cetak Surat Jalan SO").map((p) => p.read_access));

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);

  }

  return (
    <>
      <SimpleHeader name="Surat Jalan Kasir" parentName="SO" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Nav tabs>
                {permintaanBarang && permintaanBarang === "1" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => { toggle('1'); }}
                    >
                      Surat Jalan
                    </NavLink>
                  </NavItem>
                )}
                {validasiPermintaanBarang && validasiPermintaanBarang === "1" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '2' })}
                      onClick={() => { toggle('2'); }}
                    >
                      Validasi Kepala Gudang
                    </NavLink>
                  </NavItem>
                )}
                {cetak && cetak === "1" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '3' })}
                      onClick={() => { toggle('3'); }}
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
                        <SuratJalanKasir />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col md="12">
                        <ValidasiSuratJalanKasir />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col md="12">
                        <CetakSuratJalanKasir />
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
