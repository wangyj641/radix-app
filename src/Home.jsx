import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Divider, Typography, Anchor, Menu, Button, Spin } from "antd";
import axios from 'axios';
import styles from "./Home.module.css";
import LineChart from './LineChart.jsx';

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const Home = () => {
  const navigate = useNavigate();

  const [hour24, setHour24] = useState([]);
  const [hour48, setHour48] = useState([]);
  const [week, setWeek] = useState([]);
  const [month, setMonth] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);

    axios.get("/api/data/last24hourAvg").then(res => {
      console.log(res.data);

      // TOD: some data maybe missing, should add default value
      setHour24(res.data?.data);
      setLoading(false);
    });

    axios.get("/api/data/last48hourAvg").then(res => {
      console.log(res.data);
      setHour48(res.data?.data);
      setLoading(false);
    });

    axios.get("/api/data/lastWeekAvg").then(res => {
      console.log(res.data);
      setWeek(res.data?.data);
      setLoading(false);
    });

    axios.get("/api/data/lastMonthAvg").then(res => {
      console.log(res.data);
      setMonth(res.data?.data);
      setLoading(false);
    });
  }

  useEffect(() => {
    getData()
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login");
  }

  const handleCSV = () => {
    console.log('go to CSV');
    navigate("/uploadCSV");
  }

  return (
    loading ?
      <div>
        <Spin
          size="large"
          style={{
            marginTop: 200,
            marginBottom: 200,
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
          }}
        />
      </div> :
      <div>

        <div className={styles["title"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={1}>Radix Monitor System</Typography.Title>
            <Button style={{ marginRight: 30 }} type="primary" onClick={() => { handleCSV() }}>Upload CSV</Button>
            <Button type="primary" onClick={() => { handleLogout() }}>Logout</Button>
          </Divider>
        </div>

        <Anchor className={styles["anchor"]}>
          <Menu mode="horizontal">
            <Menu.Item key="1">
              <Anchor.Link href="#Hours24" title="Last 24 Hours"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Anchor.Link href="#Hours48" title="Last 48 Hours"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Anchor.Link href="#Week" title="Last Week"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Anchor.Link href="#Month" title="Last Month"></Anchor.Link>
            </Menu.Item>
          </Menu>
        </Anchor>

        <div id="Hours24" className={styles["item"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>Last 24 Hours</Typography.Title>
          </Divider>
          {(hour24.length === 0) ?
            <Divider orientation={"center"}>
              <Typography.Title level={1}>No Data in this Peroid</Typography.Title>
            </Divider> :
            <div>
              <LineChart data={hour24} />
            </div>
          }
        </div>

        <div id="Hours48" className={styles["item"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>Last 48 Hours</Typography.Title>
          </Divider>
          {(hour48.length === 0) ?
            <Divider orientation={"center"}>
              <Typography.Title level={1}>No Data in this Peroid</Typography.Title>
            </Divider> :
            <div>
              <LineChart data={hour48} />
            </div>
          }
        </div>

        <div id="Week" className={styles["item"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>Last Week</Typography.Title>
          </Divider>
          {(week.length === 0) ?
            <Divider orientation={"center"}>
              <Typography.Title level={1}>No Data in this Peroid</Typography.Title>
            </Divider> :
            <div>
              <LineChart data={week} />
            </div>
          }
        </div>

        <div id="Month" className={styles["item"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>Last Month</Typography.Title>
          </Divider>
          {(month.length === 0) ?
            <Divider orientation={"center"}>
              <Typography.Title level={1}>No Data in this Peroid</Typography.Title>
            </Divider> :
            <div>
              <LineChart data={month} />
            </div>
          }
        </div>
      </div>
  );
};

export default Home;
