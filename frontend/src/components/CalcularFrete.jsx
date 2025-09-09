import { useState } from "react"

const CalcularFrete = () => {

    // Hook-useStage manipula o estado do componente
    const [distancia,setDistancia] = useState("");
    const [tipoTransporte,setTipoTransporte] = useState("bicicleta");
    const [valorFrete,setValorFrete] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    //Criando a função handleSubmit 
    const handleSubmit = async (e) =>{
        e.preventDefault(); // evita o carregamento da pagina automaticamente
        setLoading(true);
        setValorFrete(null);
        setError(null);

        // Tratamento de erros
        try{
        //Buscandoa api do servidor 
        const api = await fetch("http://localhost:3001/calular-frete",{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({distancia:parseFloat,tipoTransporte}),
        })
        if(!api.ok){
            const erroData = await api.json();
            throw new Error(erroData.error || "Erro ao calcular o frete");
        }
        const data = await api.json();
        setValorFrete(data.valorTotal)

        }catch(error){
            setError(error.message);       
        }finally{
            setLoading(false);       
        }
    }


  return (
    <div className="bg-gray-100 flex flex-col justify-between min-h-screen p-4">
        <div className="bg-blue-100 p-8 rounded-2xl w-full max-w-md text-center mx-auto">
            <h1 className="text-3xl font-bold text-blue-600">Calculadora de Frete</h1>
            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="space-y-2 text-left">
                    <label htmlFor="distancia" className="block text-gray-700 font-bold">
                        Distância(Km)
                    </label>
                    <input
                        type="number"
                        id="distancia"
                        value={distancia}   
                        onChange={(e) => setDistancia(e.target.value)}
                        min="0"
                        required
                        className="w-full px-4 py-3 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-2 text-left">
                    <label htmlFor="transporte" className="block text-gray-700 font-bold">
                        Transporte
                    </label>
                    <select
                        id="transport"
                        value={tipoTransporte}  
                        onChange={(e) => setTipoTransporte(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option>Bicicleta</option>
                        <option>Carro</option>
                        <option>Drone</option>

                    </select>
                    
                </div>
                <button className="w-full py-3 bg-blue-700 rounded-2xl text-black text-2xl hover:bg-amber-200  transition-colors duration-300">
                {loading ? "Calculando..." : "Calcular"} 
                </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {valorFrete !== null && (
                <div className=" mt-6 p-4 bg-cyan-300 border border-blue-600 rounded-2xl">
                <h2 className="text-2xl font-bold text-blue-700">Valor do Frete R$</h2>
            </div>
            )}
            
        </div>
        <p className="text-center mt-8">&copy; 2025 - todos dirietos reservados</p>
    </div>
  )
}

export default CalcularFrete