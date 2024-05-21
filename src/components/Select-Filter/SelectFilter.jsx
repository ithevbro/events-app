import style from './select.filter.module.css'

function SelectFilter({ setSelectFilter }) {

    function handleChange(e) {
        setSelectFilter(e.target.value)
    }

    return (
        <select onChange={handleChange} className={style.select_wrapper} name="" id="">
            <option value="">Select Filter</option>
            <option value="EventsAtoZ">Events A-Z</option>
            <option value="EventsZtoA">Events Z-A</option>
            <option value="DateLatest">Date latest</option>
            <option value="DateOld">Date old</option>
            <option value="OrganizerAtoZ">Organizer A-Z</option>
            <option value="OrganizerZtoA">Organizer Z-A</option>
        </select>
    )
}

export default SelectFilter