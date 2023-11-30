import React, { ReactNode, createContext } from 'react';

type ChildrenProps = {
    children: ReactNode;
}

export const OperationsContext = createContext({});

export const OperationsProvider = ({ children }: ChildrenProps) => {

    function soma(a: number, b: number){
        return a + b;
    }

    function subtracao(a: number, b: number) {
        return a - b;
    } 

    function multiplicacao(a: number, b: number){
        return a * b;
    }

    function divisao(a: number, b: number){
        return a / b;
    }

    return <OperationsContext.Provider value={{ soma, subtracao, multiplicacao, divisao }}>{children}</OperationsContext.Provider>
}

export default OperationsProvider;