// import React, { useState } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Container,
  Nav,
  NavItem,
  TabPane
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import StockPribadi from "views/pages/itemStock/StockPribadi/Index.js";

export default function ItemStock() {
  return (
    <>
      <SimpleHeader name="Stok Item" parentName="Inventori" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                 <StockPribadi />
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}