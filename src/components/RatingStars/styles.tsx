import styled from 'styled-components';

export const StarContainer = styled.div`
    display: flex;
    gap: 5px;
    margin-top: 10px;
    justify-content: center;
    margin-bottom: 20px;
`;

export const Star = styled.span<{ filled: boolean }>`
    cursor: pointer;
    font-size: 30px;
    color: ${({ filled }) => (filled ? '#ffcc00' : '#ccc')};
    transition: color 0.2s;

    &:hover {
        color: #ffcc00;
    }
`;