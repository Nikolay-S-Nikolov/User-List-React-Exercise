import { useEffect, useState } from "react";
import Table from "./Table.jsx";
import UserDetails from "./UserDetails.jsx";
import UserCreateEdit from "./UserCreateEdit.jsx";
import userService from "../services/userService.js";
import Pagination from "./Pagination.jsx";
import UserDelete from "./UserDelete.jsx";

export default function Main() {
    const [users, setUsers] = useState([]);
    const [userIdForDetails, setUserDetails] = useState(null);
    const [createUser, setCreateUser] = useState(false);
    const [userIdForEdit, setUserIdForEdit] = useState(null);
    const [userIdForDelete, setUserIdForDelete] = useState(null);

    useEffect(() => {
        userService.getAll()
            .then(result => {
                setUsers(result);
            });
    }, []);

    function onShowDetatils(user) {
        setUserDetails(user);
    };

    function onShowCloseCreateUser() {
        setCreateUser(state => !state);
    }

    function onDetailsCloseHandler() {
        setUserDetails(null);
    };

    async function onCreateUser(e) {
        e.preventDefault();
        const formData = new FormData(e.target.parentElement.parentElement);
        const userData = Object.fromEntries(formData);
        const newUser = await userService.create(userData);
        setUsers(state => [...state, newUser]);
        setCreateUser(state => !state);
    }

    function onShowEdit(id) {
        setUserIdForEdit(id);
    }

    function onHideEdit() {
        setUserIdForEdit(null);
    }

    function onShowDelete(id) {
        setUserIdForDelete(id);
    }

    function onHideDelete() {
        setUserIdForDelete(null);
    }

    async function onEditUser(e, userId, createdAt) {
        e.preventDefault();
        const formData = new FormData(e.target.parentElement.parentElement);
        const userData = Object.fromEntries(formData);
        userData._id = userId;
        userData.createdAt = createdAt;
        const editedUser = await userService.edit(userData);
        setUsers(state => state.map(user => user._id == editedUser._id ? editedUser : user));
        setUserIdForEdit(null);
    }

    async function onDeleteUser(e, userId) {
        e.preventDefault();
        await userService.delete(userId);
        setUsers(state => state.filter(user => user._id != userId));
        setUserIdForDelete(null)
    }

    return (
        <main className="main">
            <section className="card users-container">
                <div className="search-form">
                    <h2>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user"
                            className="svg-inline--fa fa-user SearchBar_icon__cXpTg" role="img" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512">
                            <path fill="currentColor"
                                d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z">
                            </path>
                        </svg>
                        <span>Users</span>
                    </h2>
                </div>

                <Table onDetailsClick={onShowDetatils} users={users} onEditClick={onShowEdit} onDeleteClick={onShowDelete} />
                {userIdForDetails && <UserDetails userId={userIdForDetails} onClose={onDetailsCloseHandler} />}
                {createUser && <UserCreateEdit onClose={onShowCloseCreateUser} createUserHandler={onCreateUser} />}
                {userIdForEdit && <UserCreateEdit onClose={onHideEdit} userId={userIdForEdit} editUserHandler={onEditUser} />}
                {userIdForDelete && <UserDelete onClose={onHideDelete} userId={userIdForDelete} onDeleteHandler={onDeleteUser} />}

                {/* <!--  New user button  --> */}
                <button className="btn-add btn" onClick={onShowCloseCreateUser}>Add new user</button>

                <Pagination />
            </section>
        </main>
    );
};