import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AddNews from "../pages/news/addNews";
import NewsList from "../pages/news/newsList";
import AddProject from "../pages/projects/addProject";
import ProjectList from "../pages/projects/projectList";

export default function AppRoutes() {
  const session = localStorage.getItem("JRMUser") || "";

  return (
    <Routes>
      <Route path="/" element={<ProjectList />} />
      <Route path="/add/:project_id" element={<AddProject />} />
      <Route path="/news" element={<NewsList />} />
      <Route path="/news/add" element={<AddNews />} />
    </Routes>
  );
}
