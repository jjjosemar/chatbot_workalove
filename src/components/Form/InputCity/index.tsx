import React, { useEffect, useRef, useState } from "react";
import { useField } from "@unform/core";
import {ErrorMessage, InputCustom} from "../Input/styles";
import {ContainerOptions} from "./styles";

interface AutocompleteCidadeProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    changeValue: (value: string) => void;
}

const InputCity: React.FC<AutocompleteCidadeProps> = ({ changeValue, name, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);
    const [search, setSearch] = useState<string>(defaultValue || "");
    const [cities, setCities] = useState<{ name: string }[]>([]);

    useEffect(() => {
        if (search.length < 3) {
            setCities([]);
            return;
        }

        const fetchCities = async () => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?city=${search}&format=json&addressdetails=1`
                );
                const data = await response.json();

                const uniqueCities = new Set<string>();
                const filteredCities = data
                    .map((city: any) => {
                        const { city: cidade, state } = city.address;
                        const cityName = `${cidade || city.name} - ${state || ""}`.trim();
                        return cityName;
                    })
                    .filter((cityName: string) => {
                        if (!cityName || uniqueCities.has(cityName)) {
                            return false;
                        }
                        uniqueCities.add(cityName);
                        return true;
                    });

                setCities(filteredCities.map((name : string) => ({ name })));
            } catch (error) {
                console.error("Erro ao buscar cidades:", error);
            }
        };

        const delayDebounce = setTimeout(fetchCities, 500); // Debounce

        return () => clearTimeout(delayDebounce);
    }, [search]);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value",
            setValue: (_, value: string) => setSearch(value),
            clearValue: () => setSearch(""),
        });
    }, [fieldName, registerField]);

    useEffect(() => {
        changeValue(search);
    }, [search, changeValue]);

    return (
        <div>
            <InputCustom
                ref={inputRef}
                type="text"
                id={fieldName}
                value={search}
                hasError={!!error}
                onChange={(e) => setSearch(e.target.value)}
                {...rest}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {cities.length > 0 && (
                <ContainerOptions>
                    {cities.map((city, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                setSearch(city.name);
                                setCities([]);
                            }}
                            style={{
                                padding: "8px",
                                cursor: "pointer",
                                borderBottom: "1px solid #ddd",
                            }}
                        >
                            {city.name}
                        </li>
                    ))}
                </ContainerOptions>
            )}
        </div>
    );
};

export default InputCity;
