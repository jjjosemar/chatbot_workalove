import styled from 'styled-components';


export const ContainerOptions = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #fff;
    max-height: 200px;
    overflow-y: auto;
    position: absolute;
    width: 100%;
    z-index: 1000;
`;

export const ErrorMessage = styled.span`
    color: red;
    font-size: 12px;
    position: absolute;
    bottom: 8px;
    left: 0;
    margin-left: 15px;
`;
