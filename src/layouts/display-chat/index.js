import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { BASE_URL } from "BASE_URL";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';

export default function Displaychat() {
  const [messages, setMessages] = useState([]);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await fetch(
        `${BASE_URL}/api/admin/displayChat`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      const responseData = await response.json();
     setMessages(responseData.data);
     console.log(responseData.data)

    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };
   
  useEffect(() => {
    fetchData()
 
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Group Chat</Accordion.Header>
        <Accordion.Body>
        <div className="messages">
        {messages && messages.map((message, index) => (
          <div
            key={index}
            className="d-flex align-item-center"
          >
            <div className="name">
            <p>{message.user_details.name} :</p> 
            </div>
            <div className="chat">
            <p>{message.message}</p>
            </div>
      
          </div>
        ))}
      </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </DashboardLayout>
  );
}
