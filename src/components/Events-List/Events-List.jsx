import style from './event.list.module.css'
import EventItem from '../Event-Item/Event-item'
import Pagination from '../Pagination/Pagination'
import Spiner from '../Loader/Spiner'
import { useEffect, useState } from 'react'

function EventsList() {

    const [eventsData, setEventsData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let ignore = false
        async function fetchData() {
            try {
                const res = await fetch('https://events-api-server.onrender.com/events')
                if (!ignore) {
                    const data = await res.json()
                    setEventsData(data)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        return () => { ignore = true }
    }, [])

    function makeList(start) {
        let arrList = []
        let end = (start - 1) * 12 + 12

        for (let i = (start - 1) * 12; i < end; i++) {
            let data = eventsData[i]
            if (data) {
                arrList.push(<EventItem key={data._id} data={data} />)
            }
        }

        return arrList
    }

    function currentPageHandler(number) {
        setCurrentPage(number)
    }

    return (
        <div className={style.container}>
            {loading ? <Spiner /> :
                <>
                    <h1>Events</h1>

                    <ul className={style.events_wrapper}>
                        {makeList(currentPage)}
                    </ul>

                    {eventsData.length > 12 ? <Pagination
                        currentPage={currentPage}
                        currentPageHandler={currentPageHandler}
                        length={eventsData.length} />
                        : null
                    }
                </>
            }
        </div>
    )
}

export default EventsList