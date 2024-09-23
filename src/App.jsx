import { useState } from "react";
import { Groq } from "groq-sdk";



function App() {
  const [input, setInput] = useState('');
  const [generatedResponse, setResponse] = useState([])
  
  const runTransformer = async () => {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: input,
        },
      ],
      model: "mixtral-8x7b-32768",
    });
    const newContent = chatCompletion.choices[0]?.message?.content
    setResponse((prevGen) =>[...prevGen,newContent,]);
    console.log(generatedResponse);
  };


  return (
    <>
      <div className="w-full min-h-svh flex items-center flex-col bg-cyan-950">
        <header className=" h-12 w-full flex items-center justify-around text-green-400">
          <h1 className=" text-3xl">HyperChat</h1>
          <img src="" alt="git icon" />
        </header>
        <div className="container mx-auto overflow-y-scroll text-white" style={{ maxHeight: '70svh', minHeight:'70svh' }} >
          {generatedResponse.map((resp,idx) => (
            <p key={idx}  className=" m-7">{resp}</p>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_auto] items-center gap-4 m-2">
          <input onChange={(e) => setInput(e.target.value)} className="rounded-md p-2 border border-gray-300" type="text" placeholder="Escreva Sua Mensagem" />
          <button className="bg-green-400 p-2 rounded" onClick={runTransformer}>Enviar</button>
        </div>
      </div>
    </>
  )
}

export default App
