const baseUrl = 'http://localhost:3030/jsonstore/users';

export default {
    async getAll() {
        const res = await fetch(baseUrl);
        const data = await res.json()
        const users = Object.values(data)
        return users;
    },

    async getOne(userId) {
        const res = await fetch(`${baseUrl}/${userId}`);
        const user = await res.json()
        return user;
    },

    async create(userData) {
        const data = transfromUserData(userData);
        data.createdAt = new Date().toISOString();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(baseUrl, options);
        const result = await response.json();
        return result;
    },

    async edit(userData) {
        const data = transfromUserData(userData);
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(`${baseUrl}/${userData._id}`, options);
        const result = await response.json();
        return result;
    },

    async delete(userId) {
        const options = {
            method: "DELETE",
        };
        await fetch(`${baseUrl}/${userId}`, options);
    }
}

function transfromUserData(userData) {
    const { country, city, street, streetNumber, ...transformedData } = userData;
    transformedData.address = { country, city, street, streetNumber };
    transformedData.updatedAt = new Date().toISOString();
    return transformedData;
}