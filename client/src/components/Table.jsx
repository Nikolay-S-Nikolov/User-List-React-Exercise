import Messages from "./Messages.jsx";
import TableThead from "./TableThead.jsx";
import UserItem from "./UserItem.jsx";

export default function Table({
    onDetailsClick,
    users,
    onEditClick,
    onDeleteClick,
    handleSortChange,
    sortOrder,
    sortField,
    showSpinner,
    showNoUsers,
    showNoContent,
    showFaildFetch
}) {

    return (
        <div className="table-wrapper">

            {(showSpinner || showNoUsers || showNoContent ||showFaildFetch) && <Messages
             showSpinner={showSpinner} 
             showNoUsers={showNoUsers}
             showNoContent={showNoContent} 
             showFaildFetch={showFaildFetch}
             />}

            <table className="table">
                <TableThead
                    handleSortChange={handleSortChange}
                    sortOrder={sortOrder}
                    sortField={sortField}
                />

                <tbody>
                    {users.map(user => <UserItem
                        key={user._id}
                        userData={user}
                        onUserDetailsClick={onDetailsClick}
                        onEditClick={onEditClick}
                        onDeleteClick={onDeleteClick}
                    />)}
                </tbody>
            </table>
        </div>
    );
};