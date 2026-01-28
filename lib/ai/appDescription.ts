import { generateText } from 'ai';
import { groq } from '@ai-sdk/groq';

export const appDescription = async ( h1: string[], h2: string[], p: string[]): Promise<string> => {
        const { text } = await generateText({
            model: groq('llama-3.3-70b-versatile'),
            prompt: `Generate a clear 100 words description of the website.
        H1: ${h1},
        H2:${h2}
        Paragraph: ${p}`,
        });
        return text


}