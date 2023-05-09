import style from './Card.module.css';

const Card = (props)=>{
    return(
        <div className={style.card}>
            <div className={style.cardHeader}>
                <p className={style.name}>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</p>
            </div>
            <img src={props.image} className={style.image} alt={'Avatar de Pokemon'} />
            <div className={style.cardFooter}>
                <p className={style.typeTitle}>Type:</p>
                <div className={style.types}>
                    {props.type.map((t, index) => <p className={style.type} key={index}>{t}</p>)}
                </div>
            </div>
        </div>
    )
}

export default Card;
