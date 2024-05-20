import style from './event.item.module.css'

function EventItem({ data }) {

    return (
        <li className={style.event}>
            <h3>{data.id}</h3>
            <p>{data.body}</p>
            <div className={style.buttons}>
                <button>Register</button>
                <button>View</button>
            </div>
        </li>
    )
}

export default EventItem