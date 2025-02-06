import styled from 'styled-components';
export const InputCustom = styled.input<{ hasError?: boolean }>`
    width: 72%;
    padding: 12px 15% 12px 15px;
    border: 1px solid ${({hasError}) => (hasError ? 'red' : '#ddd')};
    border-radius: 20px;
    font-size: 14px;
    background-color: #f9f9f9;
    position: absolute;
    bottom: 10px;
    left: 0;
    margin: 18px 15px 15px;

    &:focus {
        border-color: ${({hasError}) => (hasError ? 'red' : '#007BFF')};
        outline: none;
    }
`;

export const ErrorMessage = styled.span`
    color: red;
    font-size: 12px;
    position: absolute;
    bottom: 8px;
    left: 0;
    margin-left: 15px;
`;
