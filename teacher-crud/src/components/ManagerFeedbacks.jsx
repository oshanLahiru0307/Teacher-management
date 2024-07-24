import React, { useState, useEffect } from "react";
import FeedbackController from "../services/feedbackController";
import { Button, Row, Table } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../assets/logo.jpg"; // Import your logo file

const ManagerFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const fetchedFeedbacks = await FeedbackController.getAllFeedbacks();
      setFeedbacks(fetchedFeedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const generatePdf = () => {
    const doc = new jsPDF();
    
    // Add logo and header
    const imgData = logo;
    doc.addImage(imgData, "JPG", 15, 10, 50, 20); // Adjust position and size as needed
    doc.text("Feedbacks Of Teachers", 70, 20); // Adjust position as needed

    // Generate table
    const feedbackData = feedbacks.map((feedback, index) => [
      index + 1,
      feedback.teacher.name,
      feedback.content,
    ]);

    doc.autoTable({
      startY: 40, // Adjust starting position below header
      head: [["No", "Teacher's Name", "Feedback"]],
      body: feedbackData,
    });

    doc.save("feedbacks.pdf");
  };

  const columns = [
    {
      title: "Teacher's Name",
      dataIndex: "teacherName",
      key: "teacherName",
      render: (_, record) => record.teacher.name,
    },
    {
      title: "Feedback",
      dataIndex: "content",
      key: "content",
    },
  ];

  return (
    <div>
      <Row justify={"space-between"}>
        <h1>Manager Feedbacks</h1>
        <Button onClick={generatePdf}>Generate Pdf</Button>
      </Row>
      <Table dataSource={feedbacks} columns={columns} rowKey="_id" />
    </div>
  );
};

export default ManagerFeedbacks;
