import React, { useEffect, useState } from "react";
import Nav from "../../NavBar";
import axios from "axios";
import { URL as ApiURL } from "../../urls/apiUrls";
import { useParams } from "react-router-dom";

const AddProject = () => {
  const [category, setCategory] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [images, setImages] = useState([]);
  const [delImages, setDelImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projectDt, setProjectDt] = useState([]);

  const { project_id } = useParams();

  useEffect(() => {
    if (project_id != 0) loadProjectDt(project_id);
  }, [project_id]);

  const loadProjectDt = (project_id) => {
    axios
      .get(ApiURL.GET_PROJECT_DT, {
        params: {
          project_id,
        },
      })
      .then(function (response) {
        setProjectDt([...response.data.projectDt]);
        const proj = response.data.projectDt[0];
        setCategory(proj.category_id);
        setTitle(proj.title);
        setDescription(proj.description);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onImageSelect = (e) => {
    setImages([...e.target.files]);
  };

  const submit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("project_id", project_id);
    formData.append("category_id", category);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deleted_images", delImages);
    Array.from(images).forEach((file) => {
      formData.append("images[]", file);
    });
    axios({
      method: "post",
      url: project_id == 0 ? ApiURL.ADD_PROJECT : ApiURL.UPD_PROJECT,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        console.log(response);
        setLoading(false);
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
                <h1>Add Project</h1>
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
                    <h3 class="card-title">Add Project</h3>
                  </div>

                  <form>
                    <div class="card-body">
                      <div class="form-group">
                        <label>Category</label>
                        <select
                          class="form-control"
                          value={category}
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                        >
                          <option value={1}>INTERIOR DESIGN</option>
                          <option value={2}>ARCHITECTURE</option>
                          <option value={3}>PRODUCT DESIGN</option>
                          <option value={4}>PUBLIC DESIGN</option>
                          <option value={5}>FUNDRAISING DESIGN</option>
                          <option value={6}>GREEN DESIGN</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Title</label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputEmail1"
                          placeholder="Enter email"
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
                      <div style={{ display: "flex" }}>
                        {projectDt.map((el) => {
                          return (
                            !delImages.includes(el.image_path) && (
                              <div
                                style={{ padding: 10, position: "relative" }}
                              >
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
                                      setDelImages([
                                        ...delImages,
                                        el.image_path,
                                      ]);
                                    }}
                                  >
                                    x
                                  </a>
                                </div>
                                <img
                                  src={
                                    "https://adminextra.shoshakamal.com/uploads/projects/" +
                                    el.image_path
                                  }
                                  style={{
                                    width: 100,
                                    height: 100,
                                    objectFit: "contain",
                                  }}
                                />
                              </div>
                            )
                          );
                        })}
                        {Array.from(images).map((el, index) => {
                          return (
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
                                    let imgs = [...images];
                                    imgs.splice(index, 1);
                                    setImages([...imgs]);
                                  }}
                                >
                                  x
                                </a>
                              </div>
                              <img
                                src={URL.createObjectURL(el)}
                                style={{
                                  width: 100,
                                  height: 100,
                                  objectFit: "contain",
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div class="form-group">
                        <label for="exampleInputFile">Images</label>
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
                              {images.length > 0
                                ? Array.from(images)
                                    .map((el) => el.name)
                                    .join(",")
                                : "Choose Images"}
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

export default AddProject;
