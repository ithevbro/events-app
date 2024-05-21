import style from './event.participants.module.css'
import Spiner from '../Loader/Spiner'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function EventParticipants() {
    const [eventData, setEventData] = useState({})
    const [loading, setLoading] = useState(true)
    const [filteredData, setFilteredData] = useState([])
    const [searchValue, setSearchValue] = useState('')
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

    function filterHandler(e) {
        const value = e.target.value.toLowerCase()
        setSearchValue(value)
        const filtered = eventData.participants.filter(item => {
            return (
                item.full_name.toLowerCase().includes(value) ||
                item.email.toLowerCase().includes(value)
            )
        })
        setFilteredData(filtered)
    }

    let participants = searchValue.length > 0 ? filteredData : eventData.participants

    return (
        <div className={style.wrapper}>
            {
                loading ? <Spiner /> :
                    <>
                        <div className={style.top_panal}>
                            <h2>{`"${eventData.title}" participants`}</h2>
                            <label htmlFor="search">
                                <span>Search participants:</span>
                                <input onChange={filterHandler} value={searchValue} placeholder='enter email or name...' type="search" name="search" id="search" />
                            </label>
                        </div>
                        <ul className={style.participants}>
                            {participants.map(item => {
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
