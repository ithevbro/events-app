import style from './pagination.module.css'

function Pagination({ length, currentPageHandler }) {

    function makePagination(length) {
        let btnArr = []
        for (let i = 1; i <= length / 10; i++) {
            btnArr.push(
                <button
                    onClick={() => currentPageHandler(i)}
                    key={i + length}>{i}
                </button>
            )
        }
        return btnArr
    }


    return (
        <nav className={style.pagination_wrapper}>
            <button onClick={() => { currentPageHandler(prev => prev > 2 ? prev - 1 : 1) }}>prev</button>

            {makePagination(length)}

            <button onClick={() => { currentPageHandler(prev => prev < length / 10 ? prev + 1 : (length / 10)) }}>next</button>
        </nav >
    )
}

export default Pagination