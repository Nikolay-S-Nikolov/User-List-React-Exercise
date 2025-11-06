const baseUrl = 'http://localhost:3030/jsonstore/users';

export default {
    async getAll() {
        const res = await fetch(baseUrl);
        const data = await res.json()
        const users = Object.values(data)
        return users;
    }


}