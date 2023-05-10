import { useState, useEffect } from "react";
import axios from "axios";
import style from "./Form.module.css";

const Form = () => {
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
        console.log(event.target.value);
        let updatedTypes;
        if (countChecked >= 2) {
            event.preventDefault();
            console.log("cancelando");
        } else if (isChecked) {
            setOptionSelected([...optionSelected, event.target.value]);
            console.log(optionSelected);
            SetCountChecked(optionSelected.length + 1);
            console.log("countChecked if: %o", countChecked);
        } else {
            setOptionSelected(
                optionSelected.filter((value) => value !== event.target.value)
            );
            SetCountChecked(optionSelected.length - 1);
            console.log("countChecked else: %o", countChecked);
        }

        if (countChecked < 2) {
            setErrors({
                ...errors,
                type: "Debes seleccionar al menos 2 tipos",
            });
        } else {
            setErrors({ ...errors, type: "" });
        }

        // if (isChecked) {
        //     if (form.type.length < 2) {
        //         updatedTypes = [...form.type, propertyPk];
        //     } else {
        //         return;
        //     }
        // } else {
        //     updatedTypes = form.type.filter((type) => type !== propertyPk);
        // }

        setForm({ ...form, type: updatedTypes });
    };

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
    };

    // VALIDATE:

    const validateName = (form) => {
        if (/^[a-z]+$/.test(form.name)) {
            setErrors({ ...errors, name: "" });
        } else {
            setErrors({
                ...errors,
                name: "El nombre no puede contener mayúsculas, números ni carácteres especiales",
            });
        }

        if (form.name === "")
            setErrors({ ...errors, name: `Tu Pokémon necesita un nombre` });
    };

    const validateImage = (form) => {
        if (/\.png$|\.jpg$/.test(form.image)) {
            setErrors({ ...errors, image: "" });
        } else {
            setErrors({
                ...errors,
                image: "La URL de la imagen debe terminar en .png o .jpg",
            });
        }

        if (form.image === "")
            setErrors({
                ...errors,
                image: `Necesitas agregar una imagen para tu Pokémon`,
            });
    };

    const validateHp = (form) => {
        if (form.hp <= 255) {
            setErrors({ ...errors, hp: "" });
        } else {
            setErrors({
                ...errors,
                hp: "El Pokémon puede tener como máximo 255 de HP",
            });
        }

        if (form.hp === "")
            setErrors({
                ...errors,
                hp: `El campo "Vida" no puede estar vacío`,
            });
    };

    const validateAttack = (form) => {
        if (form.attack <= 190) {
            setErrors({ ...errors, attack: "" });
        } else {
            setErrors({
                ...errors,
                attack: "El Pokémon puede tener como máximo 190 de Ataque",
            });
        }

        if (form.attack === "")
            setErrors({
                ...errors,
                attack: `El campo "Ataque" no puede estar vacío`,
            });
    };

    const validateDefense = (form) => {
        if (form.defense <= 230) {
            setErrors({ ...errors, defense: "" });
        } else {
            setErrors({
                ...errors,
                defense: "El Pokémon puede tener como máximo 230 de Defensa",
            });
        }

        if (form.defense === "")
            setErrors({
                ...errors,
                defense: `El campo "Defensa" no puede estar vacío`,
            });
    };

    const validateSpeed = (form) => {
        if (form.speed <= 180) {
            setErrors({ ...errors, speed: "" });
        } else {
            setErrors({
                ...errors,
                speed: "El Pokémon puede tener como máximo 180 de Velocidad",
            });
        }

        if (form.speed === "")
            setErrors({
                ...errors,
                speed: `El campo "Velocidad" no puede estar vacío`,
            });
    };

    const validateHeight = (form) => {
        if (form.height <= 14.5) {
            setErrors({ ...errors, height: "" });
        } else {
            setErrors({
                ...errors,
                height: "El Pokémon puede medir como máximo 14.5 m.",
            });
        }

        if (form.height === "")
            setErrors({
                ...errors,
                height: `El campo "Altura" no puede estar vacío`,
            });
    };

    const validateWeight = (form) => {
        if (form.weight <= 999.9) {
            setErrors({ ...errors, weight: "" });
        } else {
            setErrors({
                ...errors,
                weight: "El Pokémon puede pesar como máximo 999.9 KG.",
            });
        }

        if (form.weight === "")
            setErrors({
                ...errors,
                weight: `El campo "Peso" no puede estar vacío`,
            });
    };

    //ENVIAR FORM:
    const submitHandler = (event) => {
        event.preventDefault();
        axios
            .post("http://localhost:3001/pokemons", form)
            .then((res) => alert(res));
    };

    console.log(form);

    ///RETURN:

    return (
        <form className={style["form-container"]} onSubmit={submitHandler}>
            <h2 className={style["title"]}>Crea tu Pokémon!</h2>
            <div>
                <label className={style["label"]}>Nombre: </label>
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
                <label className={style["label"]}>Imagen URL: </label>
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
                <label className={style["label"]}>Vida: </label>
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
                <label className={style["label"]}>Ataque: </label>
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
                <label className={style["label"]}>Defensa: </label>
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
                <label className={style["label"]}>Velocidad: </label>
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
                <label className={style["label"]}>Altura: </label>
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
                <label className={style["label"]}>Peso: </label>
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
                <legend className={style["tipos-title"]}>
                    Tipo de Pokemon:
                </legend>
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

            <button className={style["button-submit"]} type="submit">
                CREAR
            </button>
        </form>
    );
};

export default Form;
