import style from './event.item.module.css'
import { Link } from 'react-router-dom'

function EventItem({ data }) {

    return (
        <li className={style.event}>
            <h3>{data.id}</h3>
            <p>{data.body}</p>
            <div className={style.buttons}>
                <button><Link to={'/register'}>Register</Link></button>
                <button><Link to={'/'}>View</Link></button>
            </div>
        </li>
    )
}

export default EventItem