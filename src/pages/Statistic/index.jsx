import './index.less'
import { useSelector } from 'react-redux'

export default function StatisticBoard() {
    // const allStatistics = useLoaderData()
    const { user } = useSelector(state => state.user)
    console.log(user.id);
    return (
        <div className='content-mainbox'>

        </div>
    )
}
