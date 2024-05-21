import style from './register.module.css'
import { useParams, useNavigate, json } from 'react-router-dom'
import { useFormik } from 'formik'

function Register() {

    const validate = values => {
        const errors = {};
        if (!values.full_name) {
            errors.full_name = 'Required';
        } else if (values.full_name.length < 5) {
            errors.full_name = 'Must be 5 characters or more';
        }
        else if (values.full_name.length > 15) {
            errors.full_name = 'Must be 15 characters or less';
        }

        if (!values.date_of_birth) {
            errors.date_of_birth = 'Required';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.source) {
            errors.source = 'Select one option'
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            full_name: "",
            email: "",
            date_of_birth: "",
            source: ""
        },
        validate,
        onSubmit: values => {
            alert(json.stringify(values))
            // handleSubmit(values)
        },
    });

    let { id } = useParams()
    const navigate = useNavigate()

    async function handleSubmit(value) {
        try {
            await fetch('https://events-api-server.onrender.com/events/' + id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value),
            })
            navigate('/' + id)
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form noValidate onSubmit={formik.handleSubmit} id={style.reg_form}>
            <h2>Event registration</h2>
            <label className={style.top} htmlFor="full_name">
                <span>Full name</span>
                <input onChange={formik.handleChange} value={formik.values.full_name} type="text" id="full_name" name='full_name' />
                {formik.errors.full_name ? <div style={{ color: 'rgb(153, 2, 2)' }}>{formik.errors.full_name}</div> : null}
            </label>
            <label className={style.top} htmlFor="email">
                <span>Email</span>
                <input onChange={formik.handleChange} value={formik.values.email} type="email" id="email" name='email' />
                {formik.errors.email ? <div style={{ color: 'rgb(153, 2, 2)' }}>{formik.errors.email}</div> : null}
            </label>
            <label className={style.top} htmlFor="date_of_birth">
                <span>Date of birth</span>
                <input onChange={formik.handleChange} value={formik.values.date_of_birth} type="date" id="date_of_birth" name='date_of_birth' />
                {formik.errors.date_of_birth ? <div style={{ color: 'rgb(153, 2, 2)' }}>{formik.errors.date_of_birth}</div> : null}
            </label>

            <div className={style.bott}>
                <h3>Where did you hear about this event</h3>
                <div className={style.radios_wrapper}>
                    <label className={style.radio_btn} htmlFor="socials">
                        <input checked={formik.values.source === "Social media"} onChange={formik.handleChange} value={'Social media'} type="radio" name="source" id="socials" />
                        <span>Social media</span>
                    </label>
                    <label className={style.radio_btn} htmlFor="friends">
                        <input checked={formik.values.source === "Friends"} onChange={formik.handleChange} value={'Friends'} type="radio" name="source" id="friends" />
                        <span>Friends</span>
                    </label>
                    <label className={style.radio_btn} htmlFor="myself">
                        <input checked={formik.values.source === "Found myself"} onChange={formik.handleChange} value={'Found myself'} type="radio" name="source" id="myself" />
                        <span>Found myself</span>
                    </label>

                </div>
                {formik.errors.source ? <div style={{ color: 'rgb(153, 2, 2)' }}>{formik.errors.source}</div> : null}
            </div>
            <button type='submit'>Subscribe</button>
        </form>
    )
}

export default Register