const runTransformer = async () => {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Eu vou te enviar um código HTML5 e quero que você o torne semântico seguindo as boas práticas e explique as mudanças. Faça isso com este código: ${inputtedCode}. 
          E você deve retornar usando este modelo: "{código semântico} | {explicação}"`,
        },
      ],
      model: "mixtral-8x7b-32768",
    });
    console.log(chatCompletion.choices[0]?.message?.content);
    setGeneratedCode(chatCompletion.choices[0]?.message?.content);
  };

