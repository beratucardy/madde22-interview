import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";
import { getActivities } from "../../../api/anonymous/anonymous-activity-service";
import logo from "../../../assets/img/Exclude.png";
import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlinePlusCircle, AiFillCheckCircle } from "react-icons/ai";
import { RiSearch2Fill } from "react-icons/ri";
import { RxDotsVertical } from "react-icons/rx";
import { AiFillCalendar } from "react-icons/ai";
import { toast } from "../../../helpers/functions/swal";
import Spacer from "../../common/spacer/spacer";
import { settings } from "../../../helpers/settings";
import LoadingPage from "../../../pages/common/loading-page";
import { formatDate } from "../../../helpers/functions/date-time";
import "./home.scss";

const Home = () => {
  const [activities, setActivities] = useState([]);
  const [activities2, setActivities2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addCalendar, setAddCalendar] = useState(0);
  const [readMore, setReadMore] = useState(0);
  const [findActive, setFindActive] = useState("");
  const [isReadMore, setIsReadMore] = useState(true);
  const windowSize = useRef([window.innerWidth]);

  const loadData = async () => {
    try {
      const resp = await getActivities();
      setActivities(resp.data);
      setActivities2(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleReadMore = (id) => {
    setIsReadMore(!isReadMore);
    if (!isReadMore) {
      setReadMore(-1);
    } else {
      setReadMore(id);
    }
  };

  const addToCalendar = (id) => {
    try {
      setAddCalendar(id);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setAddCalendar(-1);
      }, 2000);
    }
  };

  const handleActivities = (name) => {
    const resp = activities2;
    if (name === "Tüm Etkinlikler") {
      loadData();
      setFindActive("Tüm Etkinlikler");
    } else if (name === "Tiyatro") {
      const arr = resp.filter((item) => item.category === "Tiyatro");
      setActivities(arr);
      setFindActive("Tiyatro");
    } else if (name === "Konser") {
      const arr = resp.filter((item) => item.category === "Konser");
      setActivities(arr);
      setFindActive("Konser");
    } else if (name === "Stand Up") {
      const arr = resp.filter((item) => item.category === "Stand Up");
      setActivities(arr);
      setFindActive("Stand Up");
    } else if (name === "Sinema") {
      const arr = resp.filter((item) => item.category === "Sinema");
      setActivities(arr);
      setFindActive("Sinema");
    } else {
      const arr = resp.filter((item) => item.category === "Çocuk");
      setActivities(arr);
      setFindActive("Çocuk");
    }
  };

  const handleFilters = (lct) => {
    const resp = activities2;
    const arr = resp.filter((item) => item.location === lct);
    setActivities(arr);
  };

  const handleDates = (dt) => {
    const currentDate = new Date();
    const currentDate2 = formatDate(currentDate);
    const resp = activities2;
    if (dt === "Güncel Etkinlikler") {
      const arr = resp.filter((item) => {
        const currentDate3 = formatDate(item.date);
        return currentDate3 > currentDate2;
      });
      setActivities(arr);
    } else {
      const arr = resp.filter((item) => {
        const currentDate3 = formatDate(item.date);
        return currentDate3 < currentDate2;
      });
      setActivities(arr);
    }
  };

  const handleSearch = (e) => {
    const resp = activities2;
    const arr = resp.filter((item) =>
      item.title
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase())
    );
    setActivities(arr);
  };

  const handleTicket = () => {
    toast("Ticket Purchase Completed Successfully", "success");
  };

  const handleCalendar = () => {
    toast("This Function is Currently Not Working", "error");
  };

  useEffect(() => {
    setFindActive("Tüm Etkinlikler");
    loadData();
    //eslint-disable-next-line
  }, []);

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <header>
        <Spacer height={30} />
        <Link className="logo text-center" to="/">
          <img
            src={logo}
            alt={settings.siteName}
            className="img-fluid d-none d-xl-inline"
          />
        </Link>
        <Spacer height={50} />
        <h1 className="text-center">ETKİNLİKLER</h1>
        <Spacer height={20} />
        <Navbar bg="white" expand="xl">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">
              <img
                src={logo}
                alt={settings.siteName}
                className="img-fluid d-inline d-xl-none"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" className="text-end">
              <Nav className="me-auto ms-auto my-2 my-lg-0">
                <Nav.Link
                  onClick={() => handleActivities("Tüm Etkinlikler")}
                  active={findActive === "Tüm Etkinlikler" ? true : false}
                  className={findActive === "Tüm Etkinlikler" ? "active" : ""}
                >
                  Tüm Etkinlikler
                </Nav.Link>
                <Nav.Link
                  onClick={() => handleActivities("Tiyatro")}
                  className={findActive === "Tiyatro" ? "active" : ""}
                >
                  Tiyatro
                </Nav.Link>
                <Nav.Link
                  onClick={() => handleActivities("Konser")}
                  className={findActive === "Konser" ? "active" : ""}
                >
                  Konser
                </Nav.Link>
                <Nav.Link
                  onClick={() => handleActivities("Stand Up")}
                  className={findActive === "Stand Up" ? "active" : ""}
                >
                  Stand Up
                </Nav.Link>
                <Nav.Link
                  onClick={() => handleActivities("Sinema")}
                  className={findActive === "Sinema" ? "active" : ""}
                >
                  Sinema
                </Nav.Link>
                <Nav.Link
                  onClick={() => handleActivities("Çocuk")}
                  className={findActive === "Çocuk" ? "active" : ""}
                >
                  Çocuk
                </Nav.Link>
              </Nav>
              <div className="d-flex search-form">
                <Form.Control
                  type="search"
                  placeholder="Etkinlik Ara"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => handleSearch(e)}
                />
                <RiSearch2Fill />
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container fluid className="filter">
          <div className="filter-left">
            <OverlayTrigger
              trigger="click"
              key={"bottom"}
              placement={"bottom"}
              overlay={
                <Popover.Body>
                  <p>Etkinlik Mekanı</p>
                  <Form>
                    <div key={`Maximum UNIQ Hall`} className="mb-3">
                      <Form.Check
                        type={"radio"}
                        id={`Maximum UNIQ Hall`}
                        name="locations"
                        label={`Maximum Uniq Hall`}
                        onClick={(e) => handleFilters(e.target.id)}
                      />
                    </div>
                    <div key={`Maximum UNIQ Box`} className="mb-3">
                      <Form.Check
                        type={"radio"}
                        id={`Maximum UNIQ Box`}
                        name="locations"
                        label={`Maximum Uniq Box`}
                        onClick={(e) => handleFilters(e.target.id)}
                      />
                    </div>
                    <div key={`Maximum UNIQ Lounge`} className="mb-3">
                      <Form.Check
                        type={"radio"}
                        id={`Maximum UNIQ Lounge`}
                        name="locations"
                        label={`Maximum Uniq Lounge`}
                        onClick={(e) => handleFilters(e.target.id)}
                      />
                    </div>
                    <div key={`Maximum UNIQ Açıkhava`} className="mb-3">
                      <Form.Check
                        type={"radio"}
                        id={`Maximum UNIQ Açıkhava`}
                        name="locations"
                        label={`Maximum Uniq Açıkhava`}
                        onClick={(e) => handleFilters(e.target.id)}
                      />
                    </div>
                    <div key={`Bahçe Fuaye`} className="mb-3">
                      <Form.Check
                        type={"radio"}
                        id={`Bahçe Fuaye`}
                        name="locations"
                        label={`Bahçe Fuaye`}
                        onClick={(e) => handleFilters(e.target.id)}
                      />
                    </div>
                    <p>Etkinlik Tarihi</p>
                    <div key={`Güncel Etkinlikler`} className="mb-3">
                      <Form.Check
                        type={"radio"}
                        id={`Güncel Etkinlikler`}
                        name="locations"
                        label={`Güncel Etkinlikler`}
                        onClick={(e) => handleDates(e.target.id)}
                      />
                    </div>
                    <div key={`Geçmiş Etkinlikler`} className="mb-3">
                      <Form.Check
                        type={"radio"}
                        id={`Geçmiş Etkinlikler`}
                        name="locations"
                        label={`Geçmiş Etkinlikler`}
                        onClick={(e) => handleDates(e.target.id)}
                      />
                    </div>
                  </Form>
                </Popover.Body>
              }
            >
              <Button className="btn-filter">
                <RxDotsVertical /> Filtreler
              </Button>
            </OverlayTrigger>
          </div>
          <div className="filter-right">
            <Link onClick={handleCalendar}>
              <AiFillCalendar /> Takvimde Gör
            </Link>
          </div>
        </Container>
      </header>
      <Spacer height={40} />
      <Container className="home">
        {activities.length === 0 && (
          <Alert variant="warning" className="mt-3 text-center">
            Activity Not Found
          </Alert>
        )}
        {activities.map((activity) => (
          <Card className="my-3" key={activity.id}>
            <Row>
              <Col md={3} className="home-left">
                <div className="home-left-first">
                  <p className="d-md-flex d-none">{activity.date2}</p>
                  <div className="d-md-none d-flex">
                    <span>{activity.date2.substring(0, 1)}</span>
                    <span>{activity.date2.substring(2, 7)}</span>
                    <span>{activity.date2.substring(8, 12)}</span>
                    <span>{activity.date2.substring(13, 18)}</span>
                  </div>
                </div>
                <Card.Img src={activity.img} className="img-fluid" />
                {activity.category === "Konser" ? (
                  <span
                    style={{ backgroundColor: "#9FAE5D" }}
                    className="category"
                  >
                    {activity.category}
                  </span>
                ) : (
                  <span className="category">{activity.category}</span>
                )}
              </Col>
              <Col md={9} className="home-right">
                <Card.Body className="home-body">
                  <div className="home-body-left">
                    <Card.Title as={Link}>{activity.title}</Card.Title>
                    <p className="location">
                      <IoLocationSharp /> {activity.location}
                    </p>
                    <Card.Text className="desc">
                      {activity.id === readMore
                        ? activity.desc
                        : activity.desc.slice(
                            0,
                            windowSize.current[0] < 768 ? 20 : 145
                          )}
                      <span
                        onClick={() => toggleReadMore(activity.id)}
                        className="read-or-hide"
                      >
                        {activity.id === readMore
                          ? " Daha Az Göster"
                          : "...Detaylı Bilgi"}
                      </span>
                    </Card.Text>
                  </div>
                  <div className="home-body-right">
                    <Button variant="secondary" onClick={handleTicket}>
                      Bilet Al
                    </Button>
                    {activity.id === addCalendar ? (
                      <div className="add-calendar-active">
                        <AiFillCheckCircle /> Takvime Eklendi
                      </div>
                    ) : (
                      <div
                        className="add-calendar"
                        onClick={() => addToCalendar(activity.id)}
                      >
                        <AiOutlinePlusCircle /> Takvime Ekle
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}
      </Container>
      <Spacer height={20} />
    </>
  );
};

export default Home;
