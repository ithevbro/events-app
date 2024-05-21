import style from './event.participants.module.css'
import Spiner from '../Loader/Spiner'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function EventParticipants() {
    const [eventData, setEventData] = useState({})
    const [loading, setLoading] = useState(true)
    let { id } = useParams()

    useEffect(() => {
        let ignore = false
        async function fetchData() {
            try {
                const res = await fetch('https://events-api-server.onrender.com/events/' + id)
                if (!ignore) {
                    const data = await res.json()
                    setEventData(data)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        return () => { ignore = true }
    }, [])

    return (
        <div className={style.wrapper}>
            {
                loading ? <Spiner /> :
                    <>
                        <h2>{`"${eventData.title}" participants`}</h2>
                        <ul className={style.participants}>
                            {eventData.participants.map(item => {
                                return (
                                    <li className={style.item} key={item.email}>
                                        <p>{item.full_name}</p>
                                        <p>{item.email}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </>
            }
        </div>
    )
}

export default EventParticipants