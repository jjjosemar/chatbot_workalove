import styled from 'styled-components';


export const ChatContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 350px;
    max-height: 500px;
    min-height: 250px;
    max-width: 100%;
    background-color: #f5f8fb;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    z-index: 999;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const ContainerForm = styled.div`
    padding: 0 15px 90px;
    overflow-y: auto;
    max-height: 350px;
`;

export const HeaderChat = styled.div`
    align-items: center;
    background: #6e48aa;
    color: #fff;
    display: flex;
    height: 56px;
    overflow: hidden;
    padding-left: 15px;
    padding-right: 15px;
    font-weight: bold;
`;

export const ContainerMessage = styled.div`
    display: inline-flex;
`;

export const Message = styled.p`
    border-radius: 18px 18px 18px 0;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.15);
    display: inline-block;
    max-width: 60%;
    margin-left: 10px;
    padding: 10px 15px;
    background-color: #fff;
    color: #4a4a4a;
    position: relative;
    font-size: 14px;
    line-height: 1.4;

    opacity: 0;
    transform: translateY(10px);
    animation: fadeIn 0.5s ease-out forwards;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

export const NextStepButton = styled.button`
    position: absolute;
    right: 20px;
    bottom: 10px;
    transform: translateY(-50%);
    padding: 8px;
    background-color: transparent;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    width: 35px;
    height: 35px;
`;

export const SubmitButton = styled.button`
    background-color: #6200ea; 
    color: #fff; 
    font-size: 16px;  
    font-weight: bold;  
    padding: 10px 20px;  
    border: none;  
    border-radius: 5px;  
    cursor: pointer;  
    transition: all 0.3s ease; 
    margin: 20px auto;
    display: block;
    
    &:hover {
        background-color: #3700b3; 
    }

    &:focus {
        outline: none; 
        box-shadow: 0 0 0 3px rgba(98, 0, 234, 0.5);
    }
`;

export const UserResponse = styled.div`
    background-color: #007BFF;
    color: white;
    border-radius: 18px 18px 18px 18px;
    max-width: 60%;
    width: fit-content;
    padding: 10px 15px;
    position: relative;
    font-size: 14px;
    line-height: 1.4;
    align-self: flex-end;
    margin-left: auto;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.15);
`;

export const ContainerIconBot = styled.div`
    border-radius: 50%;
    height: 40px;
    width: 40px;
    background: #e4e4e4;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    align-self: flex-end;
    margin-block-start: 1em;
    margin-block-end: 1em;
`;

export const SuccessMessage = styled.h5`
  display: block;
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
  border: 1px solid #c3e6cb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;