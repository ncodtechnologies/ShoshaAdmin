import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class App extends Component {
  state = {};

  componentDidMount() {}

  logOut() {
    localStorage.clear();
    window.location.reload();
  }

  render() {
    return (
      <div>
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
          <ul class="navbar-nav ml-auto">
            {/* <li class="nav-item">
              <a class="nav-link" href="#" onClick={()=> this.logOut()} >
                Log Out
              </a>
            </li> */}
          </ul>
        </nav>

        <aside class="main-sidebar sidebar-dark-primary elevation-4">
          <a href="index3.html" class="brand-link">
            <img
              src="dist/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              class="brand-image img-circle elevation-3"
            />
            <span class="brand-text font-weight-light">Shosha Kamal Admin</span>
          </a>

          <div class="sidebar">
            <nav class="mt-2">
              <ul
                class="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li class="nav-item">
                  <NavLink
                    to={"/"}
                    activeClassName="active"
                    className="nav-link"
                  >
                    <i class="nav-icon fas fa-home" />
                    <p>Projects </p>
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink
                    to={"/news"}
                    activeClassName="active"
                    className="nav-link"
                  >
                    <i class="nav-icon fas fa-home" />
                    <p>News </p>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    );
  }
}

export default App;
