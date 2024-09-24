import { useEffect, useRef, useState } from "react";
import { Groq } from "groq-sdk";
import "./index.css"
import gitLogo from "./assets/images/giticon.svg"

function App() {
  const [input, setInput] = useState('');
  const [requestLoading, setRequestLoading] = useState(false)
  const [generatedResponse, setResponse] = useState([])


  const messagesEndRef = useRef(null);

  const runTransformer = async () => {
    try {
      setRequestLoading(true)
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
      const newContent = { response: chatCompletion.choices[0]?.message?.content, question: input }
      setResponse((prevGen) => [...prevGen, newContent,]);
      setInput('')
      console.log(generatedResponse);
    } catch (error) {
      alert('erro na api ' + error + ' :(')
    }finally{
      setRequestLoading(false)
    }

  };

  const handleChange = (e) => {
    setInput(e.target.value)
    

  }


  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    });

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [generatedResponse]);


  return (
    <>
      <div className="w-full min-h-svh flex items-center flex-col bg-cyan-950">
        <header className=" h-24 w-full flex items-center justify-around text-green-400">
          <h1 className=" text-3xl">HyperChat</h1>
          <a href="https://github.com/Andernial/HyperChat" target="_blank" ><img src={gitLogo} alt="git icon" className=" w-20 h-20" /></a>
        </header>
        <div className="container mx-auto overflow-y-scroll text-white mt-20" style={{ maxHeight: '60svh', minHeight: '60svh' }}>
          {generatedResponse.map((resp, idx) => (
            <div key={idx} ref={messagesEndRef} className="fade-in mb-4" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' }}>
              <div className="flex justify-end m-2">
                <div className="bg-slate-600 text-white p-3 rounded-lg max-w-xs text-right">
                  <p className="m-0">{resp.question}</p>
                </div>
              </div>

              <div className="flex justify-start m-2">
                <div className="bg-green-600 text-white p-3 rounded-lg max-w-xs text-left">
                  <p className="m-0">{resp.response}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_auto] items-center gap-4 m-2">
          <input onKeyDown={(e) =>{if(e.key === 'Enter'){runTransformer()}}} onChange={handleChange} value={input} className="rounded-md p-2 border border-gray-300" type="text" placeholder="Escreva Sua Mensagem" disabled={requestLoading} />
          <button className="bg-green-400 p-2 rounded hover:bg-green-500 transform hover:scale-105 transition-transform duration-200" onClick={runTransformer} disabled={requestLoading} >Enviar</button>
        </div>
      </div>
    </>
  )
}

export default App
