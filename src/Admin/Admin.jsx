import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Categories from "./Categories";

const Admin = () => {
    return (
        <>
            <div class="container1">
                <div class="newTask">
                    <ul class="specificTag">
                        <li>Categories</li>
                        <li>Brands</li>
                        <li>Social</li>
                    </ul>
                </div>
                <div class="showTask">
                    <div class="navBar">
                        <div class="pagesShow">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination pt-3">
                                    <li id="openForm">Add</li>
                                    <li id="openForm">Delete</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div id="taskAll">
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin