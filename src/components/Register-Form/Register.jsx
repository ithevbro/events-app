import style from './register.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Register() {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        date_of_birth: "",
        source: ""
    })

    let { id } = useParams()
    const navigate = useNavigate()

    function formDataHandler(e) {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch('https://events-api-server.onrender.com/events' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then(
            navigate('/' + id)
        )
    };

    return (
        <form onSubmit={handleSubmit} id={style.reg_form}>
            <h2>Event registration</h2>
            <label className={style.top} htmlFor="full_name">
                <span>Full name</span>
                <input onChange={formDataHandler} type="text" id="full_name" name='full_name' />
            </label>
            <label className={style.top} htmlFor="email">
                <span>Email</span>
                <input onChange={formDataHandler} type="email" id="email" name='email' />
            </label>
            <label className={style.top} htmlFor="date_of_birth">
                <span>Date of birth</span>
                <input onChange={formDataHandler} type="date" id="date_of_birth" name='date_of_birth' />
            </label>

            <div className={style.bott}>
                <h3>Where did you hear about this event</h3>
                <div className={style.radios_wrapper}>
                    <label className={style.radio_btn} htmlFor="socials">
                        <input onChange={formDataHandler} value={'Social media'} type="radio" name="source" id="socials" />
                        <span>Social media</span>
                    </label>
                    <label className={style.radio_btn} htmlFor="friends">
                        <input onChange={formDataHandler} value={'Friends'} type="radio" name="source" id="friends" />
                        <span>Friends</span>
                    </label>
                    <label className={style.radio_btn} htmlFor="myself">
                        <input onChange={formDataHandler} value={'Found myself'} type="radio" name="source" id="myself" />
                        <span>Found myself</span>
                    </label>
                </div>
            </div>
            <button type='submit'>Subscribe</button>
        </form>
    )
}

export default Register