import { useEffect, useState } from "react";
import Table from "./Table.jsx";
import UserDetails from "./UserDetails.jsx";
import UserCreateEdit from "./UserCreateEdit.jsx";
import userService from "../services/userService.js";
import Pagination from "./Pagination.jsx";
import UserDelete from "./UserDelete.jsx";
import SearchForm from "./searchForm.jsx";

export default function Main() {
    const [users, setUsers] = useState([]);
    const [userIdForDetails, setUserDetails] = useState(null);
    const [createUser, setCreateUser] = useState(false);
    const [userIdForEdit, setUserIdForEdit] = useState(null);
    const [userIdForDelete, setUserIdForDelete] = useState(null);
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('asc');
    const [allUsers, setAllUsers] = useState([]);
    const [showSpinner, setShowSpinner] = useState(false);
    const [showNoUsers, setShowNoUsers] = useState(false);
    const [showNoContent, setShowNoContent] = useState(false);
    const [showFaildFetch, setShowFaildFetch] = useState(false);


    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = users.slice(startIndex, endIndex);
    const total = users.length;
    const totalPages = Math.ceil(total / limit);

    useEffect(() => {
        setShowSpinner(true);
        userService.getAll()
            .then(result => {
                setUsers(result);
                setAllUsers(result);
                setShowSpinner(false);
                if (result.length == 0) {
                    setShowNoUsers(true);
                } else {
                    setShowNoUsers(false);
                }
            })
            .catch((err) => {
                setShowSpinner(false);
                setShowFaildFetch(true);
                console.log(err.message);
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
        if (showNoUsers) { setShowNoUsers(false); };
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
        const updatedUsers = users.filter(user => user._id != userId)
        setUsers(updatedUsers);
        setUserIdForDelete(null);
        setShowNoUsers(updatedUsers.length == 0);
    }

    function handleSortChange(fieldName) {
        setUsers(prevUsers => {
            let newOrder = 'asc';
            if (fieldName === sortField) {
                newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
                setSortOrder(newOrder);
            } else {
                setSortField(fieldName);
                setSortOrder('asc');
            }

            const sortedUsers = [...prevUsers].sort((a, b) =>
                newOrder === 'asc'
                    ? a[fieldName].localeCompare(b[fieldName])
                    : b[fieldName].localeCompare(a[fieldName])
            );

            return sortedUsers;
        });
    }

    function handleSearch(e, searchText, searchCriteria) {
        e.preventDefault();
        if (showNoContent) {
            setShowNoContent(false);
        }

        if (!searchCriteria || !searchText) {
            setUsers(allUsers);
            return;
        }

        const searchResult = [...allUsers].filter(
            (u) => u[searchCriteria].toLowerCase().includes(searchText.toLowerCase())
        )
        setUsers(searchResult);

        if (searchResult.length == 0) {
            setShowNoContent(true);
        }

    }

    return (
        <main className="main">
            <section className="card users-container">
                <SearchForm onSearchHandler={handleSearch} />

                <Table
                    onDetailsClick={onShowDetatils}
                    users={paginatedUsers}
                    onEditClick={onShowEdit}
                    onDeleteClick={onShowDelete}
                    // ontableSort={[setSortField, setSortOrder, handleSortChange, sortOrder, sortField]}
                    handleSortChange={handleSortChange}
                    sortOrder={sortOrder}
                    sortField={sortField}
                    showSpinner={showSpinner}
                    showNoUsers={showNoUsers}
                    showNoContent={showNoContent}
                    showFaildFetch={showFaildFetch}
                />

                {userIdForDetails && <UserDetails userId={userIdForDetails} onClose={onDetailsCloseHandler} />}
                {createUser && <UserCreateEdit onClose={onShowCloseCreateUser} createUserHandler={onCreateUser} />}
                {userIdForEdit && <UserCreateEdit onClose={onHideEdit} userId={userIdForEdit} editUserHandler={onEditUser} />}
                {userIdForDelete && <UserDelete onClose={onHideDelete} userId={userIdForDelete} onDeleteHandler={onDeleteUser} />}

                <button className="btn-add btn" onClick={onShowCloseCreateUser}>Add new user</button>

                <Pagination
                    limit={limit}
                    setLimit={setLimit}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    start={startIndex}
                    end={endIndex}
                    total={total}
                />

            </section>
        </main>
    );
};