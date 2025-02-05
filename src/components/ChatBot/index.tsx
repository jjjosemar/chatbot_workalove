import React, {useEffect, useRef, useState} from 'react';
import {Form} from '@unform/web';
import * as Yup from 'yup';
import {ValidationError} from 'yup';
import {
    ChatContainer,
    ContainerForm,
    ContainerIconBot,
    ContainerMessage,
    HeaderChat,
    Message,
    NextStepButton,
    SubmitButton,
    SuccessMessage,
    UserResponse
} from "./styles";
import {IoMdSend} from "react-icons/io";
import {LuBot} from "react-icons/lu";
import InputCustom from "../Form/Input";
import RatingStars from "../RatingStars";
import {FormHandles} from "@unform/core";
import InputCity from "../Form/InputCity";

interface FormData {
    name: string;
    location: string;
    email: string;
    rating: number;
}
const ChatBot: React.FC = () => {
    const formRef =  useRef<FormHandles>(null);
    const [step, setStep] = useState<number>(0);
    const [formData, setFormData] = useState<Partial<FormData>>({});
    const [isRated, setIsRated] = useState<boolean>(false);
    const [isFinish, setIsFinish] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [step]);

    const handleNextStep = async (data: Partial<FormData>, field: string) => {
        try {
            let schema;
            if (field === 'name') {
                schema = Yup.object().shape({ name: Yup.string().required('Por favor, informe seu nome') });
            } else if (field === 'location') {
                schema = Yup.object().shape({ location: Yup.string().required('Por favor, informe sua cidade') });
            } else if (field === 'email') {
                schema = Yup.object().shape({ email: Yup.string().email('E-mail inválido').required('Por favor, informe seu E-mail') });
            }
            if (schema) await schema.validate(data, { abortEarly: false });

            setFormData((prev) => ({ ...prev, ...data }));
            setStep((prevStep) => prevStep + 1);
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const validationErrors: Record<string, string> = {};

                err.inner.forEach((error : ValidationError) => {
                    if (error.path) {
                        validationErrors[error.path] = error.message;
                    }
                });

                formRef.current?.setErrors(validationErrors);
            }
        }
    };

    const handleSubmit = async () => {
        if (step === 0) {
            handleNextStep({ name: formData.name }, 'name');
        } else if (step === 1) {
            handleNextStep({ location: formData.location }, 'location');
        } else if (step === 2) {
            handleNextStep({ email: formData.email }, 'email');
        }
    };

    const handleRating = (rating: number) => {
        setFormData({ ...formData, rating });
        setIsRated(true);
    };

    const handleSave = () => {
        console.log('===== informações coletadas =====');
        console.log(formData);
        setIsFinish(true);
    };


    useEffect(() => {
        document.getElementById("scroll-auto")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [step]);

    return (
        <ChatContainer>
            <HeaderChat>Chatbot</HeaderChat>
            <Form ref={formRef} onSubmit={handleSubmit} style={{ overflowY: 'auto'}}>
                <ContainerForm>
                    {step >= 0 && (
                        <>
                            <ContainerMessage>
                                <ContainerIconBot>
                                    <LuBot size={30}/>
                                </ContainerIconBot>
                                <Message>Olá, eu sou o Chatnilson, tudo bem? Para começarmos, preciso saber seu nome.</Message>
                            </ContainerMessage>
                            {step > 0 && formData.name ? (
                                <UserResponse>{formData.name}</UserResponse>
                            ) : <>
                                <InputCustom
                                    ref={inputRef}
                                    type="text"
                                    name="name"
                                    placeholder={"Informe seu nome"}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </>}
                        </>
                    )}
                    {step >= 1 && (
                        <>
                            <ContainerMessage>
                                <ContainerIconBot>
                                    <LuBot size={30}/>
                                </ContainerIconBot>
                                <Message>Que satisfação {formData.name}. Agora que sei seu nome, qual a cidade e estado que você mora?</Message>
                            </ContainerMessage>
                            {step > 1 && formData.location ? (
                                <UserResponse>{formData.location}</UserResponse>
                            ) : <>
                                <InputCity
                                    name={'location'}
                                    ref={inputRef}
                                    placeholder={"Informe sua cidade"}
                                    changeValue={(value) => setFormData({ ...formData, location: value })}
                                />
                            </>}
                        </>
                    )}
                    {step >= 2 && (
                        <div>
                            <ContainerMessage>
                                <ContainerIconBot>
                                    <LuBot size={30}/>
                                </ContainerIconBot>
                                <Message>Agora me fala teu e-mail, por gentileza</Message>
                            </ContainerMessage>
                            {step > 2 && formData.email ? (
                                <UserResponse>{formData.email}</UserResponse>
                            ) : <>
                                <InputCustom
                                    type="text"
                                    name="email"
                                    ref={inputRef}
                                    placeholder={"Informe seu e-mail"}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </>}
                        </div>
                    )}
                    {step >= 3 && (
                        <>
                            <ContainerMessage>
                                <ContainerIconBot>
                                    <LuBot size={30}/>
                                </ContainerIconBot>
                                <Message>Você finalizou o teste. Faça uma avaliação sobre o processo que realizou até chegar aqui. Nós agradecemos!</Message>
                            </ContainerMessage>
                            <RatingStars onRate={handleRating} />
                            {isRated && !isFinish && <>
                              <SubmitButton type={"button"} onClick={handleSave}>
                                Salvar
                              </SubmitButton>
                            </>}
                            {isFinish && <>
                              <SuccessMessage>
                                Seus dados foram salvos com sucesso! Agradecemos pela sua participação.
                              </SuccessMessage>
                            </>}
                        </>
                    )}
                    <div id={"scroll-auto"}></div>
                </ContainerForm>
                {step < 3 && <>
                  <NextStepButton type="button" onClick={handleSubmit}>
                    <IoMdSend color={'#f0f'}/>
                  </NextStepButton>
                </>}
            </Form>
        </ChatContainer>
    );
};

export default ChatBot;
