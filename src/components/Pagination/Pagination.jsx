import style from './pagination.module.css'
import { useState } from 'react'

function Pagination({ length, currentPageHandler, currentPage }) {

    let lengthForPagination = Math.ceil(length / 12)

    function makePagination(length) {
        let btnArr = []
        for (let i = 1; i <= lengthForPagination; i++) {
            btnArr.push(
                <button
                    id={i === currentPage ? style.active : ''}
                    onClick={() => { currentPageHandler(i) }}
                    key={i + length}>{i}
                </button>
            )
        }
        return btnArr
    }

    return (
        <nav className={style.pagination_wrapper}>
            <button className={style.img_wrapper} onClick={() => { currentPageHandler(prev => prev > 2 ? prev - 1 : 1) }}>
                <img src="/arrow-left-slider.png" alt="" />
            </button>

            {makePagination(length)}

            <button className={style.img_wrapper} onClick={() => { currentPageHandler(prev => prev < lengthForPagination ? prev + 1 : lengthForPagination) }}>
                <img src="/arrow-right-slider.png" alt="" />
            </button>
        </nav >
    )
}

export default Pagination