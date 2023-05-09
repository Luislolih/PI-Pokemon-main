import { useSelector, useDispatch } from "react-redux";
import { nextPage, prevPage, setPage } from "../../redux/actions";
import style from "./Paginate.module.css";

const Paginate = ({ cantPages }) => {
    const { numPage } = useSelector((state) => state);
    const dispatch = useDispatch();
    const next = () => {
        dispatch(nextPage());
    };
    const prev = () => {
        dispatch(prevPage());
    };
    const number = (n) => {
        dispatch(setPage(n));
    };
    return (
        <div className={style["paginate-container"]}>
            {numPage > 1 ? <button onClick={prev}>PREV</button> : null}

            <div className={style["current-page"]}>
                {[...Array(cantPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`${style["page-number"]} ${
                            numPage === index + 1 ? style["active"] : ""
                        }`}
                        onClick={() => number(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {numPage < cantPages ? <button onClick={next}>NEXT</button> : null}
        </div>
    );
};

export default Paginate;
