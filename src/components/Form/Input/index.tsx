import React, { InputHTMLAttributes } from 'react';
import { Input } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
}

const InputCustom: React.FC<InputProps> = ({ hasError, ...props }) => {
    return <Input hasError={hasError} {...props} />;
};

export default InputCustom;
