import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import { InputCustom, ErrorMessage } from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    ref?: React.Ref<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({ name, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value",
        });

        inputRef.current?.focus();
    }, [fieldName, registerField]);

    return (
        <>
            <InputCustom
                ref={inputRef}
                id={fieldName}
                defaultValue={defaultValue}
                hasError={!!error}
                {...rest}
            />

            {error && <ErrorMessage>{error}</ErrorMessage>}
        </>
    );
};

export default Input;
