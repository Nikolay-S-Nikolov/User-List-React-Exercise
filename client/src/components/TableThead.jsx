import ArrowIcon from "./arrowIcon.jsx";

export default function TableThead({
    handleSortChange,
    sortOrder,
    sortField
}) {
    return (
        <thead>
            <tr>
                <th>
                    Image
                </th>
                <th onClick={() => { handleSortChange('firstName'); }}>
                    First name
                    <ArrowIcon sortOrder={sortOrder} active={sortField == 'firstName' ? true : false} />
                </th>
                <th onClick={() => { handleSortChange('lastName'); }}>
                    Last name
                    <ArrowIcon sortOrder={sortOrder} active={sortField == 'lastName' ? true : false} />
                </th>
                <th onClick={() => { handleSortChange('email'); }}>
                    Email
                    <ArrowIcon sortOrder={sortOrder} active={sortField == 'email' ? true : false} />
                </th>
                <th onClick={() => { handleSortChange('phoneNumber'); }}>
                    Phone
                    <ArrowIcon sortOrder={sortOrder} active={sortField == 'phoneNumber' ? true : false} />
                </th>
                <th onClick={() => { handleSortChange('createdAt'); }}>
                    Created
                    <ArrowIcon sortOrder={sortOrder} active={sortField == 'createdAt' ? true : false} />
                </th>
                <th>Actions</th>
            </tr>
        </thead>
    );
};