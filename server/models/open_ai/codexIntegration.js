const { Configuration, OpenAIApi } = require("openai");

// Initialize OpenAI with your API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,  // Store your API key in a .env file
});
const openai = new OpenAIApi(configuration);

// Function to call OpenAI Codex
const analyzeCode = async (codeSnippet) => {
  try {
    const response = await openai.createCompletion({
      model: "code-davinci-002",  // Codex model
      prompt: codeSnippet,        // Input code for analysis
      max_tokens: 150,            // Limit on output size
    });
    return response.data.choices[0].text; // Get the generated output
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return "Error analyzing code.";
  }
};

module.exports = { analyzeCode };
