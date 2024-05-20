import style from './event.list.module.css'
import EventItem from '../Event-Item/Event-item'
import Pagination from '../Pagination/Pagination'
import { useEffect, useState } from 'react'

function EventsList() {

    const [eventsData, setEventsData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => setEventsData(data))
    }, [])

    function makeList(startIndex) {
        let arrList = []
        let end = (startIndex - 1) * 12 + 12

        for (let i = (startIndex - 1) * 12; i < end; i++) {
            let data = eventsData[i]
            if (data) {
                let id = eventsData[i].id + end
                arrList.push(<EventItem key={id} data={data} />)
            }
        }

        return arrList
    }

    function currentPageHandler(number) {
        setCurrentPage(number)
    }

    return (
        <div className={style.container}>
            <h1>Events</h1>

            <ul className={style.events_wrapper}>
                {makeList(currentPage)}
            </ul>
            <Pagination
                currentPage={currentPage}
                currentPageHandler={currentPageHandler}
                length={eventsData.length} />

        </div>
    )
}

export default EventsList