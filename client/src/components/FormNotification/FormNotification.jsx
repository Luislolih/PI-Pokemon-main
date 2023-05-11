import style from "./FormNotification.module.css";

const FormNotification = ({ notificationStatus }) => {
    return (
        <div className={style.message}>
            {notificationStatus.created ? (
                <p className={style.created}>{notificationStatus.text}</p>
            ) : (
                <p className={style.failed}>{notificationStatus.text}</p>
            )}
        </div>
    );
};
export default FormNotification;
