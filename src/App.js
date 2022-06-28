import { FiSearch } from 'react-icons/fi'
import './styles.css'
import { useState } from 'react';
import api from './services/api';

function App() {

    const [input, setInput] = useState('')
    const [cep, setCEP] = useState({})

    async function handleSearch() {
        if (input === "") {
            alert('Preencha o campo de CEP')
            return
        }
        try {
            const response = await api.get(`${input}/json`)
            setCEP(response.data)
            setInput('')
        } catch (error) {
            alert("Ops, erro ao buscar o CEP")
            setInput('')
        }


    }

    return (

        <div className="container" >
            <h1 className="title">Buscador CEP</h1>

            <div className="containerInput">
                <input type="text"
                    placeholder="Digite seu CEP..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="buttonSearch" onClick={handleSearch}>
                    <FiSearch size={25} color="#FFF" />
                </button>
            </div>

            {Object.keys(cep).length > 0 && (
                <main className='main'>
                    <h2>CEP: {cep.cep}</h2>
                    <span>Rua: {cep.logradouro}</span>
                    <span>Complemento: {cep.complemento}</span>
                    <span>Bairro: {cep.bairro}</span>
                    <span>{cep.localidade} - {cep.uf}</span>
                </main>
            )}


        </div>
    );
}

export default App;