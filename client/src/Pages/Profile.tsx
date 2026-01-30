import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import { useEffect } from 'react'

const Profile = () => {
    const { getToken } = useAuth()

    const fetchProfile = async () => {
        const token = await getToken()
        const res = await axios.get("http://localhost:5000/api/v1/users/profile", {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(res.data)
    }

    useEffect(() => { fetchProfile() }, [])

    return <div>Dashboard</div>
}

export default Profile