import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas.js";
import Error from "./Error";

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7a7dfe;
        cursor: pointer;
    }
`;

const Formulario = ({ setMonedas }) => {
    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);

    const [moneda, SelectMonedas] = useSelectMonedas(
        "Elige tu moneda",
        monedas
    );
    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas(
        "Elige tu Criptomoneda",
        criptos
    );

    SelectMonedas();

    useEffect(() => {
        const consultarAPI = async () => {
            const url =
                "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            const arrayCripto = resultado.Data.map((cripto) => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName,
                };
                return objeto;
            });
            setCriptos(arrayCripto);
        };
        consultarAPI();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([moneda, criptomoneda].includes("")) {
            setError(true);
            return;
        }
        setError(false);
        setMonedas({
            moneda,
            criptomoneda,
        });

        setTimeout(() => {
            setError(false);
        }, 2000);
    };
    return (
        <>
            {error && <Error>Todo los campos son obligatorios</Error>}
            <form onSubmit={handleSubmit}>
                <SelectMonedas />
                <SelectCriptomoneda />
                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    );
};

export default Formulario;
