import style from './event.list.module.css'
import EventItem from '../Event-Item/Event-item'
import Pagination from '../Pagination/Pagination'
import Spiner from '../Loader/Spiner'
import SelectFilter from '../Select-Filter/SelectFilter'
import { useEffect, useState } from 'react'

function EventsList() {

    const [eventsData, setEventsData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [selectFilter, setSelectFilter] = useState(null)

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

    useEffect(() => {
        if (!loading) {
            sortHandler()
        }
    }, [selectFilter, loading])

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

    function sortHandler() {
        let sortedData = [...eventsData]

        switch (selectFilter) {
            case 'DateLatest':
                sortedData.sort((a, b) => new Date(b.event_date) - new Date(a.event_date))
                break
            case 'DateOld':
                sortedData.sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
                break
            case 'EventsAtoZ':
                sortedData.sort((a, b) => a.title.localeCompare(b.title))
                break
            case 'EventsZtoA':
                sortedData.sort((a, b) => b.title.localeCompare(a.title))
                break
            case 'OrganizerAtoZ':
                sortedData.sort((a, b) => a.organizer.localeCompare(b.organizer))
                break
            case 'OrganizerZtoA':
                sortedData.sort((a, b) => b.organizer.localeCompare(a.organizer))
                break
            default:
                break;
        }

        setEventsData(sortedData)
    }

    return (
        <div className={style.container}>
            {loading ? <Spiner /> :
                <>
                    <header>
                        <h1>Events</h1>
                        <SelectFilter setSelectFilter={setSelectFilter} />
                    </header>

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
