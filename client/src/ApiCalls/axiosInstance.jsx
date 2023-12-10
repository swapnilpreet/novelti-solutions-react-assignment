import axios from 'axios';

const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJzd2FwbmlscmFtdGVrZTAwNEBnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiJDWTlMT2F6T1VIaklPNk5vZnlNQXlmaW10N2hoRG1jeDVDdXZXdlE0RVpJVE5FOVJlb0FINnItMG5oRUJwM04yc29vIn0sImV4cCI6MTcwMjI3OTA0N30.6hHk8QfURP7aWX5kJ3v6Pfs3ziVH0kfPP35xiA908W4"
export const axiosInstance = axios.create({
    headers: {
        authorization: `Bearer ${token}`,
    }
})