import { useState, useEffect } from "react";
import FormNotification from "../../components/FormNotification/FormNotification";
import axios from "axios";
import style from "./Form.module.css";

const Form = () => {
    const [submitState, setSubmitState] = useState(true);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationStatus, setNotificationStatus] = useState({
        text: "",
        created: false,
    });
    const [form, setForm] = useState({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        type: [],
    });

    const [errors, setErrors] = useState({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        type: "",
    });

    const checkFormValidity = () => {
        const {
            name,
            image,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            type,
        } = form;

        return (
            name.trim() !== "" &&
            image.trim() !== "" &&
            hp.trim() !== "" &&
            attack.trim() !== "" &&
            defense.trim() !== "" &&
            speed.trim() !== "" &&
            height.trim() !== "" &&
            weight.trim() !== "" &&
            type.length >= 2
        );
    };

    useEffect(() => {
        setSubmitState(!checkFormValidity());
    }, [form]);

    const [optionSelected, setOptionSelected] = useState([]);

    const [countChecked, SetCountChecked] = useState(0);

    const [types, setTypes] = useState([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/type")
            .then((response) => response.json())
            .then((data) => setTypes(data.results))
            .catch((error) => console.log(error));
    }, []);
    const handleTypeChange = (event) => {
        const isChecked = event.target.checked;
        const propertyPk = event.target.name;
        console.log(event.target);

        if (countChecked >= 2) {
            if (isChecked) {
                event.preventDefault();
                event.target.checked = false;
                return;
            }

            console.log("submitState: %o", submitState);
        }

        let Checkeds = [];
        let countCheckeds = 0;

        if (isChecked) {
            console.log("submitState: %o", submitState);
            setOptionSelected([...optionSelected, event.target.value]);
            console.log(optionSelected);
            SetCountChecked(optionSelected.length + 1);

            Checkeds = [...optionSelected, event.target.value];
            countCheckeds = Checkeds.length;

            console.log("Checkeds !! : %o", Checkeds);
            console.log("countCheckeds !! : %o", countCheckeds);
        } else {
            Checkeds = optionSelected.filter(
                (value) => value !== event.target.value
            );
            countCheckeds = Checkeds.length;

            console.log("Checkeds else !! : %o", Checkeds);
            console.log("countCheckeds else !! : %o", countCheckeds);

            setOptionSelected(Checkeds);
            SetCountChecked(countCheckeds);
        }

        // agregamos los types.
        let formData = { ...form, type: Checkeds };

        setForm(formData);

        if (countCheckeds < 2) {
            setErrors({
                ...errors,
                type: "You must select at least 2 types",
            });
        } else {
            setErrors({ ...errors, type: "" });
        }
    };

    useEffect(() => {
        setSubmitState(!checkFormValidity());
    }, [form, optionSelected]);

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        if (property === "name") {
            validateName({ ...form, [property]: value });
        } else if (property === "image") {
            validateImage({ ...form, [property]: value });
        } else if (property === "hp") {
            validateHp({ ...form, [property]: value });
        } else if (property === "attack") {
            validateAttack({ ...form, [property]: value });
        } else if (property === "defense") {
            validateDefense({ ...form, [property]: value });
        } else if (property === "speed") {
            validateSpeed({ ...form, [property]: value });
        } else if (property === "height") {
            validateHeight({ ...form, [property]: value });
        } else if (property === "weight") {
            validateWeight({ ...form, [property]: value });
        }

        setForm({ ...form, [property]: value });

        //validateForm(form);
    };

    // VALIDATE:

    const validateName = (form) => {
        let hasError = false;
        if (/^[a-zA-Z]+$/.test(form.name)) {
            setErrors({ ...errors, name: "" });
        } else {
            setErrors({
                ...errors,
                name: "Name cannot contain numbers, spaces, or special characters",
            });
            hasError = true;
        }

        if (form.name === "") {
            setErrors({ ...errors, name: `Your Pokemon needs a name` });
            hasError = true;
        }

        return hasError;
    };

    const validateImage = (form) => {
        let hasError = false;
        if (/\.png$|\.jpg$/.test(form.image)) {
            setErrors({ ...errors, image: "" });
        } else {
            setErrors({
                ...errors,
                image: "Image URL must end in .png or .jpg",
            });
            hasError = true;
        }

        if (form.image === "") {
            setErrors({
                ...errors,
                image: `You need to add an image for your Pokemon`,
            });
            hasError = true;
        }

        return hasError;
    };

    const validateHp = (form) => {
        let hasError = false;
        if (form.hp <= 255) {
            setErrors({ ...errors, hp: "" });
        } else {
            setErrors({
                ...errors,
                hp: "The Pokemon can have a maximum of 255 HP",
            });
            hasError = true;
        }

        if (form.hp === "") {
            setErrors({
                ...errors,
                hp: `The "Life" field cannot be empty`,
            });
            hasError = true;
        }
        return hasError;
    };

    const validateAttack = (form) => {
        let hasError = false;
        if (form.attack <= 190) {
            setErrors({ ...errors, attack: "" });
        } else {
            setErrors({
                ...errors,
                attack: "The Pokemon can have a maximum of 190 Attack",
            });
            hasError = true;
        }

        if (form.attack === "") {
            setErrors({
                ...errors,
                attack: `The "Attack" field cannot be empty`,
            });
            hasError = true;
        }

        return hasError;
    };

    const validateDefense = (form) => {
        let hasError = false;
        if (form.defense <= 230) {
            setErrors({ ...errors, defense: "" });
        } else {
            setErrors({
                ...errors,
                defense: "The Pokemon can have a maximum of 230 Defense",
            });
            hasError = true;
        }

        if (form.defense === "") {
            setErrors({
                ...errors,
                defense: `The "Defense" field cannot be empty`,
            });
            hasError = true;
        }

        return hasError;
    };

    const validateSpeed = (form) => {
        let hasError = false;
        if (form.speed <= 180) {
            setErrors({ ...errors, speed: "" });
        } else {
            setErrors({
                ...errors,
                speed: "The Pokemon can have a maximum of 180 Speed",
            });
            hasError = true;
        }

        if (form.speed === "") {
            setErrors({
                ...errors,
                speed: `The "Speed" field cannot be empty`,
            });
            hasError = true;
        }

        return hasError;
    };

    const validateHeight = (form) => {
        let hasError = false;
        if (form.height <= 14) {
            setErrors({ ...errors, height: "" });
        } else {
            setErrors({
                ...errors,
                height: "The Pokemon can measure a maximum of 14 m.",
            });
            hasError = true;
        }

        if (form.height === "") {
            setErrors({
                ...errors,
                height: `The "Height" field cannot be empty`,
            });
            hasError = true;
        }
        return hasError;
    };

    const validateWeight = (form) => {
        let hasError = false;
        if (form.weight <= 999) {
            setErrors({ ...errors, weight: "" });
        } else {
            setErrors({
                ...errors,
                weight: "The Pokemon can weigh a maximum of 999 KG.",
            });
            hasError = true;
        }

        if (form.weight === "") {
            setErrors({
                ...errors,
                weight: `The "Weight" field cannot be empty`,
            });
            hasError = true;
        }

        return hasError;
    };

    //ENVIAR FORM:
    const submitHandler = (event) => {
        event.preventDefault();
        axios
            .post("http://localhost:3001/pokemons", form)
            .then((res) => {
                setNotificationStatus({
                    text: "Pokemon created successfully",
                    created: true,
                });
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                }, 5000);
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.error
                ) {
                    const errorMessage = error.response.data.error;
                    if (
                        errorMessage ===
                            "The Pokemon already exists in the database" ||
                        errorMessage === "The Pokemon already exists in the API"
                    ) {
                        setNotificationStatus({
                            text: "The Pokemon already exists",
                            created: false,
                        });
                    } else {
                        setNotificationStatus({
                            text: "Pokemon not created",
                            created: false,
                        });
                    }
                } else {
                    setNotificationStatus({
                        text: "Pokemon not created",
                        created: false,
                    });
                }
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                }, 5000);
            });
    };

    console.log(form);

    return (
        <form className={style["form-container"]} onSubmit={submitHandler}>
            <h2 className={style["title"]}>Create your Pokemon!</h2>
            <div>
                <label className={style["label"]}>Name: </label>
                <input
                    className={style["input"]}
                    type="text"
                    value={form.name}
                    onChange={changeHandler}
                    name="name"
                />
                {errors.name && (
                    <span className={style["error"]}>{errors.name}</span>
                )}
            </div>
            <div>
                <label className={style["label"]}>URL Image: </label>
                <input
                    className={style["input"]}
                    type="text"
                    value={form.image}
                    onChange={changeHandler}
                    name="image"
                />
                {errors.image && (
                    <span className={style["error"]}>{errors.image}</span>
                )}
            </div>
            <div>
                <label className={style["label"]}>HP: </label>
                <input
                    className={style["input"]}
                    type="number"
                    min="0"
                    value={form.hp}
                    onChange={changeHandler}
                    name="hp"
                />
                {errors.hp && (
                    <span className={style["error"]}>{errors.hp}</span>
                )}
            </div>
            <div>
                <label className={style["label"]}>Attack: </label>
                <input
                    className={style["input"]}
                    type="number"
                    min="0"
                    value={form.attack}
                    onChange={changeHandler}
                    name="attack"
                />
                {errors.attack && (
                    <span className={style["error"]}>{errors.attack}</span>
                )}
            </div>
            <div>
                <label className={style["label"]}>Defense: </label>
                <input
                    className={style["input"]}
                    type="number"
                    min="0"
                    value={form.defense}
                    onChange={changeHandler}
                    name="defense"
                />
                {errors.defense && (
                    <span className={style["error"]}>{errors.defense}</span>
                )}
            </div>
            <div>
                <label className={style["label"]}>Speed: </label>
                <input
                    className={style["input"]}
                    type="number"
                    min="0"
                    value={form.speed}
                    onChange={changeHandler}
                    name="speed"
                />
                {errors.speed && (
                    <span className={style["error"]}>{errors.speed}</span>
                )}
            </div>
            <div>
                <label className={style["label"]}>Height: </label>
                <input
                    className={style["input"]}
                    type="number"
                    min="0"
                    value={form.height}
                    onChange={changeHandler}
                    name="height"
                />
                {errors.height && (
                    <span className={style["error"]}>{errors.height}</span>
                )}
            </div>
            <div>
                <label className={style["label"]}>Weight: </label>
                <input
                    className={style["input"]}
                    type="number"
                    min="0"
                    value={form.weight}
                    onChange={changeHandler}
                    name="weight"
                />
                {errors.weight && (
                    <span className={style["error"]}>{errors.weight}</span>
                )}
            </div>
            <fieldset>
                <legend className={style["tipos-title"]}>Pokemon Type:</legend>
                {types.map((type) => (
                    <div className={style["tipo"]} key={type.name}>
                        <input
                            type="checkbox"
                            id={type.name}
                            name={type.name}
                            value={type.name}
                            onChange={handleTypeChange}
                        />

                        <label htmlFor={type.name}>{type.name}</label>
                    </div>
                ))}
                {errors.type && (
                    <span className={style["error"]}>{errors.type}</span>
                )}
            </fieldset>
            <button
                type="submit"
                disabled={submitState}
                className={`${
                    submitState
                        ? style["button-disabled"]
                        : style["button-submit"]
                }`}
            >
                CREATE
            </button>
            {showNotification && (
                <FormNotification notificationStatus={notificationStatus} />
            )}
        </form>
    );
};

export default Form;
