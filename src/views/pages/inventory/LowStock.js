/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  CardBody,
  CardHeader,
  TabContent,
  Container,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader.js";

const base_url = process.env.REACT_APP_API_BASE_URL;

export default function LowStock() {
  const [amountShown, setAmountShown] = useState(10);
  const [listData, setListData] = useState([]);

  // pagination
  const [nav, setNav] = useState([1]);
  const [activeNav, setActiveNav] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  async function getData(perpage = 10, page = 1) {
    try {
      const payload = {
        page: page,
        per_page: perpage,
      };

      // request to the server
      const req = await fetch(`${base_url}/lowstok/page`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
        method: "POST",
        body: JSON.stringify(payload),
      });

      //
      const res = await req.json();
      if (res.status === 200) {
        setListData(res.response);

        // membuat list tombol navigasi ie.1,2,3,4 etc
        const navigationList = [];
        for (let i = 0; i < res.total_item / amountShown; i++) {
          navigationList.push(i + 1);
        }
        setNav(navigationList);
      } else {
        setListData([]);
      }
    } catch (err) {
      setListData([]);
    }
  }

  return (
    <>
      <SimpleHeader name="Low Stock" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>Low Stock</h3>
                  <div style={{ textAlign: "right" }}></div>
                </div>
              </CardHeader>
              <CardBody>
                <TabContent activeTab={"1"}>
                  <div className="table-container">
                    <Table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nama Item</th>
                          <th>Kode Item</th>
                          <th>Sisa Stok</th>
                          <th>Tanggal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listData.map((items, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{items.item_name}</td>
                            <td>{items.item_code}</td>
                            <td>{items.sisa_stok}</td>
                            <td>{items.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>

                    <div className="filter-page">
                      <div className="section-1">
                        <span>Show</span>
                        <select
                          className="filter-select"
                          onChange={(evt) => {
                            setAmountShown(parseInt(evt.target.value));
                            getData(parseInt(evt.target.value), activeNav);
                          }}
                        >
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                        </select>
                        <span>
                          {" "}
                          entries. Showing rows 1 to {listData.length} of{" "}
                          {amountShown}
                        </span>
                      </div>
                      <div className="section-2">
                        <nav aria-label="...">
                          <Pagination>
                            <PaginationItem className="disabled">
                              <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                                tabIndex="-1"
                              >
                                <i className="fa fa-angle-left" />
                                <span className="sr-only">Previous</span>
                              </PaginationLink>
                            </PaginationItem>

                            {nav.map((items, i) => (
                              <PaginationItem
                                className={activeNav === items ? "active" : ""}
                                key={i}
                              >
                                <PaginationLink
                                  href="#pablo"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setActiveNav(items);
                                    getData(amountShown, items);
                                  }}
                                >
                                  {items}
                                </PaginationLink>
                              </PaginationItem>
                            ))}
                            <PaginationItem>
                              <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fa fa-angle-right" />
                                <span className="sr-only">Next</span>
                              </PaginationLink>
                            </PaginationItem>
                          </Pagination>
                        </nav>
                      </div>
                    </div>
                  </div>
                </TabContent>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
