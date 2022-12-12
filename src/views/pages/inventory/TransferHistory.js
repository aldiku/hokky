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
  Button,
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import PreviewHistory from "./snippets/Preview";
import Axios from "axios";
import store from "./snippets/redux";

const base_url = process.env.REACT_APP_API_BASE_URL;

export default function TransferHistory() {
  const [amountShown, setAmountShown] = useState(10);
  const [listData, setListData] = useState([]);
  const [preview, setPreview] = useState(false);
  const [detailData, setDetailData] = useState({ status: "-" });

  // pagination
  const [nav, setNav] = useState([1]);
  const [activeNav, setActiveNav] = useState(1);

  useEffect(() => {
    getData();
    listenEvent();
  }, []);

  async function getData(perpage = 10, page = 1) {
    try {
      const payload = {
        page: page,
        per_page: perpage,
      };

      Axios.post(`${base_url}/transfer-stok/history`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          setListData(res.data.response_data);

          // membuat list tombol navigasi ie.1,2,3,4 etc
          const navigationList = [];
          for (let i = 0; i < res.data.total_item / amountShown; i++) {
            navigationList.push(i + 1);
          }
          setNav(navigationList);
        })
        .catch((Err) => {
          console.log(Err);
        });
    } catch (err) {
      setListData([]);
    }
  }

  function listenEvent() {
    store.subscribe(() => {
      const state = store.getState();
      if (state.type === "close_modal_preview") {
        setPreview(false);
      }
    });
  }

  return (
    <>
      <SimpleHeader name="Inventory" parentName="Admin" />
      <Container className="mt--6" fluid>
        {/* preview */}
        <PreviewHistory visible={preview} data={detailData} />
        {/*  */}
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>Transfer Stock History</h3>
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
                          <th>Kode TS</th>
                          <th>Tipe</th>
                          <th>Status Barang</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {listData.map((items, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{items.transfer_code}</td>
                            <td>{items.ts_type}</td>
                            <td>{items.status_barang}</td>
                            <td>
                              <Button
                                onClick={() => {
                                  setPreview(true);
                                  setDetailData(items);
                                }}
                                type="button"
                                color="primary"
                                size="sm"
                              >
                                detail
                              </Button>
                            </td>
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
