import React, { useEffect, useState } from "react";
import Nav from "../../NavBar";
import axios from "axios";
import { URL as ApiURL } from "../../urls/apiUrls";
import { useNavigate } from "react-router-dom";

const AddNews = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const onImageSelect = (e) => {
    setImage(e.target.files[0]);
  };

  const navigate = useNavigate();

  const submit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    axios({
      method: "post",
      url: ApiURL.ADD_NEWS,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        console.log(response);
        setLoading(false);
        navigate(-1);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div class="wrapper">
      <Nav />
      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Add News</h1>
              </div>
              <div class="col-sm-6"></div>
            </div>
          </div>
        </section>{" "}
        <div class="content">
          <div class="container-fluid">
            <section class="content">
              <div class="col-md-12">
                <div class="card card-primary">
                  <div class="card-header">
                    <h3 class="card-title">Add News</h3>
                  </div>

                  <form>
                    <div class="card-body">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Title</label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputEmail1"
                          placeholder="Enter Title"
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                        />
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Description</label>
                        <textarea
                          class="form-control"
                          rows="3"
                          placeholder=""
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                        ></textarea>
                      </div>
                      {image && (
                        <div style={{ display: "flex" }}>
                          <div style={{ padding: 10, position: "relative" }}>
                            <div
                              style={{
                                position: "absolute",
                                right: 5,
                                top: 20,
                                backgroundColor: "white",
                                color: "red",
                                height: 15,
                                width: 15,
                                borderRadius: 10,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setImage(null);
                                }}
                              >
                                x
                              </a>
                            </div>
                            <img
                              src={URL.createObjectURL(image)}
                              style={{
                                width: 100,
                                height: 100,
                                objectFit: "contain",
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <div class="form-group">
                        <label for="exampleInputFile">Image</label>
                        <div class="input-group">
                          <div class="custom-file">
                            <input
                              type="file"
                              class="custom-file-input"
                              id="exampleInputFile"
                              multiple
                              onChange={(e) => onImageSelect(e)}
                            />
                            <label
                              class="custom-file-label"
                              for="exampleInputFile"
                            >
                              {image ? image.name : "Choose Image"}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="card-footer">
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() => !loading && submit()}
                      >
                        {loading ? "..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNews;
