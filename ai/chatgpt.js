const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: "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"
});

async function askChatGPT(question) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: question
                }
            ],
            temperature: 0.5,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error asking ChatGPT:", error);
        return null;
    }
}

module.exports = { askChatGPT };
