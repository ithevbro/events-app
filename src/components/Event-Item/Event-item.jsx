import style from './event.item.module.css'
import { Link } from 'react-router-dom'

function EventItem({ data }) {
 
    return (
        <li className={style.event}>
            <h3>{data.title}</h3>
            <div className={style.info}>
                <span>{data.organizer}</span>
                <span>{data.event_date}</span>
            </div>
            <p>{data.description}</p>
            <div className={style.buttons}>
                <button><Link to={'/register/' + data._id}>Register</Link></button>
                <button><Link to={'/' + data._id}>View</Link></button>
            </div>
        </li>
    )
}

export default EventItem