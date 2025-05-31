import { useState } from "react";
import { toast } from "sonner";

const useBlogGenerator = () => {
    const [loading, setLoading] = useState(false);
    const [generatedContent, setGeneratedContent] = useState("");
    //const [token, setToken] = useState("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");
    //import.meta.env.VITE_OPENROUTER_API_KEY
    
    const generateContent = async (title) => {
        if (!title) {
            toast("Please add a title first!");
            return;
        }

        try {
            setLoading(true);

            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`)
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("HTTP-Referer", "https://sayso-gules.vercel.app");

            const raw = JSON.stringify({
                "model": "google/gemma-2b-it",
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a helpful blog assistant. Write engaging, informative markdown blog posts with headers, proper spacing, bullet points, and paragraphs."
                    },
                    {
                        "role": "user",
                        "content": `Generate a blog post based on the following title: "${title}". The post should be engaging, informative, and suitable for a general audience. Include an introduction, several key points, and a conclusion. Use a friendly and conversational tone.`
                    }
                ]
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };


            const res = await fetch("https://openrouter.ai/api/v1/chat/completions", requestOptions);

            const data = await res.json();

            if (!res.ok) throw new Error(data?.error || "API error");

            const content = data.choices[0].message.content;
            setGeneratedContent(content);
            return data?.choices?.[0]?.message?.content || null; // 👈 return it
        } catch (err) {
            console.error("Failed to generate content:", err);
            toast("Failed to generate content.");
        } finally {
            setLoading(false);
        }
    };

    return { loading, generatedContent, generateContent };
};

export default useBlogGenerator;
