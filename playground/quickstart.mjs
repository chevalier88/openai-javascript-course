import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { PlanAndExecuteAgentExecutor } from "langchain/experimental/plan_and_execute";
import { exec } from "child_process";

// export OPENAI_API_KEY=<>
// export SERPAPI_API_KEY=<>
// Replace with your API keys!

// to run, go to terminal and enter: cd playground
// then enter: node quickstart.mjs

console.log(
  "Welcome to the LangChain Quickstart Module! Commencing chain gen..."
);

const template =
  "Please give me some ideas for content I should write about regarding {topic}? The content is for {socialplatform}. Translate to {language}.";
const prompt = new PromptTemplate({
  template: template,
  inputVariables: ["topic", "socialplatform", "language"],
});

// This allows us to format the template into a string, which is finally passed to the LLM
const formattedTemplate = await prompt.format({
  topic: "artificial intelligence",
  socialplatform: "twitter",
  language: "english",
});
console.log(formattedTemplate);

const model = new OpenAI({
  temperature: 0.9,
  modelName: "gpt-3.5-turbo-instruct",
  openAIApiKey: process.env.OPENAI_API_KEY,
});
console.log("model", model);
const chain = new LLMChain({ llm: model, prompt: prompt });

// Now that we've defined the chain, we can call the LLMChain, which does two steps:

// First it properly formats the prompt according to the user input variables

// Then it makes the call to Open AI's API!
const resChain = await chain.call({
  topic: "artificial intelligence",
  socialplatform: "twitter",
  language: "english",
});

console.log({ resChain });
