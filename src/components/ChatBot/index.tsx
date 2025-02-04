import React, {useState} from 'react';
import {Form} from '@unform/web';
import * as Yup from 'yup';
import {
    ChatContainer,
    ContainerForm, ContainerIconBot, ContainerMessage,
    ErrorMessage,
    HeaderChat,
    Input,
    Message,
    Star,
    SubmitButton,
    UserResponse
} from "./styles";
import {IoMdSend} from "react-icons/io";
import {LuBot} from "react-icons/lu";

interface FormData {
    name: string;
    location: string;
    email: string;
    rating: number;
}
const ChatBot: React.FC = () => {
    const [step, setStep] = useState<number>(0);
    const [formData, setFormData] = useState<Partial<FormData>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleNextStep = async (data: Partial<FormData>, field: string) => {
        try {
            let schema;
            if (field === 'name') {
                schema = Yup.object().shape({ name: Yup.string().required('Por favor, informe seu cidade') });
            } else if (field === 'location') {
                schema = Yup.object().shape({ location: Yup.string().required('Por favor, informe sua cidade') });
            } else if (field === 'email') {
                schema = Yup.object().shape({ email: Yup.string().email('E-mail inválido').required('Por favor, informe seu E-mail') });
            }
            if (schema) await schema.validate(data, { abortEarly: false });

            setErrors({});
            setFormData((prev) => ({ ...prev, ...data }));
            setStep((prevStep) => prevStep + 1);
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                setErrors({ [field]: err.errors[0] });
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
        } else if (step === 3) {
            console.log('Dados enviados:', formData);
        }
    };

    return (
        <ChatContainer>
            <HeaderChat>Chatbot</HeaderChat>
            <ContainerForm>
                <Form onSubmit={handleSubmit} style={{ overflowY: "auto" }}>
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
                                <Input
                                    type="text"
                                    name="name"
                                    hasError={!!errors.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                            </>}
                        </>
                    )}
                    {step >= 1 && (
                        <>
                            <Message>Que satisfação {formData.name}. Agora que sei seu nome, qual a cidade e estado que você mora?</Message>
                            {step > 1 && formData.location ? (
                                <UserResponse>{formData.location}</UserResponse>
                            ) : <>
                                <Input
                                    type="text"
                                    name="location"
                                    list="cities"
                                    hasError={!!errors.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                                <datalist id="cities">
                                    <option value="São Paulo, SP" />
                                    <option value="Rio de Janeiro, RJ" />
                                    <option value="Belo Horizonte, MG" />
                                    <option value="Curitiba, PR" />
                                </datalist>
                                {errors.location && <ErrorMessage>{errors.location}</ErrorMessage>}
                            </>}
                        </>
                    )}
                    {step >= 2 && (
                        <div>
                            <Message>Agora me fala teu e-mail, por gentileza</Message>
                            {step > 2 && formData.email ? (
                                <UserResponse>{formData.email}</UserResponse>
                            ) : <>
                                <Input
                                    type="email"
                                    name="email"
                                    hasError={!!errors.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                            </>}
                        </div>
                    )}
                    {step === 3 && (
                        <div>
                            <Message>Você finalizou o teste. Faça uma avaliação sobre o processo que realizou até chegar aqui. Nós agradecemos!</Message>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} onClick={() => setFormData({ ...formData, rating: star })}>
                                    ⭐
                                </Star>
                            ))}
                        </div>
                    )}
                    <SubmitButton type="button" onClick={handleSubmit}>
                        {step < 3 ? <IoMdSend color={'#f0f'}/> : 'Enviar'}
                    </SubmitButton>
                </Form>
            </ContainerForm>
        </ChatContainer>
    );
};

export default ChatBot;
