import React, { useEffect, useState } from "react";
import Nav from "../../NavBar";
import axios from "axios";
import { URL } from "../../urls/apiUrls";
import { Link } from "react-router-dom";
import moment from "moment";

export default function NewsList() {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = () => {
    setLoading(true);
    axios
      .get(URL.GET_NEWS)
      .then(function (response) {
        setNews([...response.data.news]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Row = ({ date, title, index }) => {
    return (
      <tr>
        <td>{index}.</td>
        <td>{title}</td>
        <td>{moment(date).format("DD/MM/YYYY")}</td>
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
                <h1>News</h1>
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
                            to={`/news/add`}
                            class="btn btn-sm btn-info float-right"
                          >
                            Add News
                          </Link>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {news.map((el, index) => (
                        <Row {...el} index={index + 1} />
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
