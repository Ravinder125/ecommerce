
import { useGetProfileQuery } from '../store/api/syncProfileAPI'

const Profile = () => {
    const { isError, data, isLoading } = useGetProfileQuery()
    console.log(data)
    if (isError) return <div>Something went wrong1</div>
    if (isLoading) return <div>Loading...</div>
    return <div>Dashboard</div>
}

export default Profile