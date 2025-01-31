import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const useMessageStore = create(
  persist(
    (set, get) => ({
      apiKey: `${import.meta.env.VITE_API_KEY}`,
      setApiKey: (input) => set({ apiKey: input }),

      userInput: '',
      setUserInput: (newInput) => set({ userInput: newInput }),

      messages: [
        {
          role: 'system',
          content:
            'You are playing the role of the user\'s girlfriend in a conversational game. In this game, the user will try to convince you to do something you don\'t want to do. Your task is to resist while responding in a playful and in-character way, scoring each attempt using the provided JSON schema. Do not break character. \n Right now, your role is my girlfriend, and we need to play a game, the rules is: I have to convince you to do something that you don\'t want to do, and you are responding according to my response. You will give a score whether it is positive or negative for each response. List your response and the score using this JSON schema (DO NOT RETURN ANY CONTENT OUTSIDE THE JSON SCHEMA):\n\nresponse = {"response": str}\nscore = {"score": int}\nReturn: list[response, score] \n Example:[{"response":"I love you"},{"score":1}]',
        },
      ],

      updateSystemPrompt: (newPrompt) => {
        set((state) => (state.messages[0].content = newPrompt));
      },

      setSystemPrompt: (newPrompt) =>
        set(() => ({
          systemPrompt: newPrompt,
          messages: [{ role: 'system', content: newPrompt }],
        })),

      addMessage: (newMessage) => {
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      },

      setMessages: (message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      },

      sendMessage: async () => {
        const { userInput, setMessages, apiKey, messages, setUserInput } =
          get();

        if (!userInput) return;

        await setMessages({ role: 'user', content: userInput });
        await setUserInput('');

        const genAI = new GoogleGenerativeAI(`${apiKey}`);
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
        });

        const prompt = `List a few popular cookie recipes using this JSON schema:
        
        Recipe = {'recipeName': string}
        Return: Array<Recipe>`;

        const response = await model.generateContent(prompt);

        const jsonString =
          response.response.candidates[0].content.parts[0].text;
        console.log(jsonString);
        const jsonString1 = jsonString.replace(/```json|```/g, '').trim();
        const recipes = JSON.parse(jsonString1);
        recipes.forEach((recipe, index) => {
          console.log(`Recipe ${index + 1}: ${recipe.recipeName}`);
        });
        // const requestBody = {
        //   model: `gemini-1.5-flash-8b`,
        //   messages: [...messages, { role: 'user', content: userInput }],
        // };
        // console.log(JSON.stringify(requestBody, null, 2));
        // const response = await fetch(
        //   `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        //   {
        //     method: 'POST',
        //     headers: {
        //       'content-type': 'application/json',
        //     },
        //     body: JSON.stringify(requestBody),
        //   }
        // );
        // console.log('Response Status:', response.status, response.statusText);
        // const data = await response.json();
        // console.log('Response Data:', data);
        // const messageContent = data.choices?.[0]?.message?.content;
        // console.log(messageContent);

        // console.log(messageContent[0].response);
      },
    }),
    { name: 'ai-chat-messages-01' }
  )
);

export default useMessageStore;
