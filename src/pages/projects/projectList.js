import React, { useEffect, useState } from "react";
import Nav from "../../NavBar";
import axios from "axios";
import { URL } from "../../urls/apiUrls";
import { Link } from "react-router-dom";

export default function ProjectList() {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    setLoading(true);
    axios
      .get(URL.GET_PROJECT)
      .then(function (response) {
        setProjects([...response.data.projects]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Row = ({ project_id, title, category, index }) => {
    return (
      <tr>
        <td>{index}.</td>
        <td>
          <Link to={`/add/${project_id}`}>{title}</Link>
        </td>
        <td>{category}</td>
      </tr>
    );
  };

  return (
    <div class="wrapper">
      <Nav />
      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Projects</h1>
              </div>
            </div>
          </div>
        </section>
        <div class="content">
          <div class="container-fluid">
            <section class="content">
              <div class="card">
                <div class="card-body p-0">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th style={{ width: 10 }}>#</th>
                        <th>Title</th>
                        <th style={{ width: 200 }}>
                          <Link
                            to={`/add/0`}
                            class="btn btn-sm btn-info float-right"
                          >
                            Add Project
                          </Link>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project, index) => (
                        <Row {...project} index={index + 1} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
