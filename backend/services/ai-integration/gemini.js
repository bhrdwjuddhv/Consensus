import OpenAI from "openai";
import { geminiApiKey, ANSWER_SYSTEM_PROMPT } from "../../constants.js";




const useGemini = async (messages) => {
    try{

        const openai = new OpenAI({ 
        apiKey: geminiApiKey, 
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
        });


        const response = await openai.chat.completions.create(
        {
            model: "gemini-3.5-flash",
            messages: [
                {
                    role: "system",
                    content : ANSWER_SYSTEM_PROMPT
                },
                ...messages
            ]
            
        },
        
    );

    console.log(response.choices[0].message.content)

    
    return response.choices[0].message.content;
    }catch(e){
        console.log(e)
    }
};

export { useGemini };
