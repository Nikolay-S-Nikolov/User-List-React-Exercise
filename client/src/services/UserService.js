const baseUrl = 'http://localhost:3030/jsonstore/users';

export default {
    async getAll() {
        const res = await fetch(baseUrl);
        const data = await res.json()
        const users = Object.values(data)
        return users;
    },

    async getOne(userId){
        const res = await fetch(`${baseUrl}/${userId}`);
        const user = await res.json()
        return user;
    }
}