import { useState, useRef, useContext, useEffect } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import { OperationsContext } from './contexts/OperationsContext';


function App() {
  const [valor1, setValor1] = useState('0');
  const [valor2, setValor2] = useState('0');
  const [estado, setEstado] = useState(true);
  const [visor, setVisor] = useState('0');
  const [operador, setOperador] = useState('');
  const { soma, subtracao, multiplicacao, divisao } = useContext(OperationsContext);

  function defineValor(event, valorBotao){
    if (estado){
      if (!valor1.includes('.') || valorBotao != '.'){
        // Usando a função callback do setValor para garantir que o setVisor só vai agir quando o valor for de fato alterado.
        setValor1((prevValor1) => {
          const novoValor1 = prevValor1 !== '0' ? prevValor1 + valorBotao : valorBotao;
          setVisor(novoValor1);
          return novoValor1;
        });
      }
    } else {
      if (!valor2.includes('.') || valorBotao != '.'){
        setValor2((prevValor2) => {
          const novoValor2 = prevValor2 !== '0' ? prevValor2 + valorBotao : valorBotao;
          setVisor(novoValor2);
          return novoValor2;
        });
      }
    }
    // console.log("Valor1: " + valor1);
    // console.log("Valor2: " + valor2);
  }

  function definePi(event){
    if (estado){
      setValor1(() => {
        const novoValor1 = Math.PI;
        setVisor(novoValor1);
        return novoValor1;
      });
    } else {
      setValor2(() => {
        const novoValor2 = Math.PI;
        setVisor(novoValor2);
        return novoValor2;
      });
    }
  }

  function resultado(){
    let valorOperacao;

    switch(operador){
      case '+':
        valorOperacao = soma(Number(valor1), Number(valor2));
        break;
      case '-':
        valorOperacao = subtracao(Number(valor1), Number(valor2));
        break;
      case '*':
        valorOperacao = multiplicacao(Number(valor1), Number(valor2));
        break;
      case '/':
        valorOperacao = divisao(Number(valor1), Number(valor2));
        break;
      default:
        valorOperacao = 0;
        break;
    }

    setVisor(valorOperacao);
    setEstado(true);
    setOperador('');
    setValor1(valorOperacao);
    setValor2('0');
  }

  function alteraOperador(event, simbolo){
    setOperador(simbolo);
    setEstado(!estado);
  }

  function limpaTudo(){
    setValor1('0');
    setValor2('0');
    setEstado(true);
    setVisor('0');
    setOperador('');
  }

  function deletaUltimoElemento(){
    if (estado){ // Se eu estiver modificando o valor1:
      if (valor1.length > 1){ // Caso tenha mais de um número (3312) delete o ultimo digito desse número, caso tenha apenas 1 número, não faço nada.
        setValor1(() => {
          const novoValor1 = valor1.slice(0, -1);
          setVisor(novoValor1);
          return novoValor1;
        });
      } else if(valor1.length == 1 && valor1 != '0'){ // Se eu tiver apenas um número e clicar em del, transformo o valor1 em 0
        setValor1(() => {
          const novoValor1 = '0';
          setVisor(novoValor1);
          return novoValor1;
        });
      }
    } else{ // Se eu estiver modificando o valor2:
      if (valor2.length > 1){ // Caso tenha mais de um número (3312) delete o ultimo digito desse número, caso tenha apenas 1 número, não faço nada.
        setValor2(() => {
          const novoValor2 = valor2.slice(0, -1);
          setVisor(novoValor2);
          return novoValor2;
        });
      } else if(valor2.length == 1 && valor2 != '0'){ // Se eu tiver apenas um número e clicar em del, transformo o valor2 em 0
        setValor2(() => {
          const novoValor2 = '0';
          setVisor(novoValor2);
          return novoValor2;
        });
      }
    }
  }

  function alerta(){
    toast.warning('Calculadora Versão 1.0');
  }
  
  return (
    <div className='pagina'>
      <ToastContainer/>
      <div className='estruturaCalculadora'>
        <div className='estruturaVisor'>
          <input type='text' value={visor}></input>
        </div>
        <div className='estruturaTeclado'>
          <button onClick={limpaTudo}>C</button>
          <button onClick={e => definePi(e)}>pi</button>
          <button onClick={deletaUltimoElemento}>Del</button>
          <button onClick={e => alteraOperador(e, '/')}>/</button>
          <button onClick={e => defineValor(e, "7")}>7</button>
          <button onClick={e => defineValor(e, "8")}>8</button>
          <button onClick={e => defineValor(e, "9")}>9</button>
          <button onClick={e => alteraOperador(e, '*')}>x</button>
          <button onClick={e => defineValor(e, "4")}>4</button>
          <button onClick={e => defineValor(e, "5")}>5</button>
          <button onClick={e => defineValor(e, "6")}>6</button>
          <button onClick={e => alteraOperador(e, '-')}>-</button>
          <button onClick={e => defineValor(e, "1")}>1</button>
          <button onClick={e => defineValor(e, "2")}>2</button>
          <button onClick={e => defineValor(e, "3")}>3</button>
          <button onClick={e => alteraOperador(e, '+')}>+</button>
          <button onClick={alerta}>?</button>
          <button onClick={e => defineValor(e, 0)}>0</button>
          <button onClick={e => defineValor(e, '.')}>,</button>
          <button onClick={resultado}>=</button>
        </div>
      </div>
    </div>
  )
}

export default App
