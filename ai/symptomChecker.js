const { askChatGPT } = require('./chatgpt');

async function checkSymptoms(symptoms) {
    if (!Array.isArray(symptoms)) {
        throw new Error('Expected symptoms to be an array.');
    }

    const question = `As a health assistant, in at most 10 words create a structured summary to a healthcare professional to a patient displaying the following symptoms:: ${symptoms.join(", ")}?`;
    const response = await askChatGPT(question);

    if (response) {
        return response;
    } else {
        return "Sorry, I couldn't process your request at this time.";
    }
}
module.exports = { checkSymptoms }
