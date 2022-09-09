import React from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    firstName: yup.string().required("First Name should be required please"),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().required(),
    password: yup.string().min(4).max(15).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

function Form() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = (data) => {
        console.log(data);
        reset()
    };
    return (
        <div className="Form">
            <h1>Sign Up</h1>

            <form onSubmit={handleSubmit(submitForm)}>
                <fieldset>
                    <input
                        type="text"
                        name="firstName"
                        {...register("firstName")}
                        placeholder="First Name..."
                    />
                    <p className="error"> {errors.firstName?.message} </p>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name..."
                        {...register("lastName")}
                    />
                    <p className="error"> {errors.lastName?.message} </p>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email..."
                        {...register("email")}
                    />
                    <p className="error"> {errors.email?.message} </p>
                    <input type="text" name="age" placeholder="Age..." {...register("age")} />
                    <p className="error"> {errors.age?.message} </p>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password..."
                        {...register("password")}
                    />
                    <p className="error"> {errors.password?.message} </p>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password..."
                        {...register("confirmPassword")}
                    />
                    <p className="error"> {errors.confirmPassword && "Passwords Should Match!"} </p>
                </fieldset>
                <button type="submit" id="submit">Submit</button>
            </form>

        </div>
    );
}

export default Form;