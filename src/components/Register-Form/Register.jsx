import style from './register.module.css'

function Register() {
    return (
        <form id={style.reg_form}>
            <h2>Event registration</h2>
            <label className={style.top} htmlFor="fname">
                <span>Full name</span>
                <input type="text" id="fname" />
            </label>
            <label className={style.top} htmlFor="email">
                <span>Email</span>
                <input type="email" id="email" />
            </label>
            <label className={style.top} htmlFor="calendar">
                <span>Date of birth</span>
                <input type="date" id="calendar" />
            </label>

            <div className={style.bott}>
                <h3>Where did you hear about this event</h3>
                <div className={style.radios_wrapper}>
                    <label className={style.radio_btn} htmlFor="socials">
                        <input type="radio" name="question" id="socials" />
                        <span>Social media</span>
                    </label>
                    <label className={style.radio_btn} htmlFor="friends">
                        <input type="radio" name="question" id="friends" />
                        <span>Friends</span>
                    </label>
                    <label className={style.radio_btn} htmlFor="myself">
                        <input type="radio" name="question" id="myself" />
                        <span>Found myself</span>
                    </label>
                </div>
            </div>
            <button type='submit'>Subscribe</button>
        </form>
    )
}

export default Register