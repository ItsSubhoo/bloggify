const { YoutubeTranscript } = require('youtube-transcript') ;

const { GoogleGenerativeAI } = require("@google/generative-ai");
const video= "https://youtu.be/_HNMEGkjzsE?si=qmCRGEhJh7hOciZq"

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBYpC9l0aFXo9kXLIUTwkwX3wOtraVS700");

var text="hi"


async function main(){



   let  response= await YoutubeTranscript.fetchTranscript('https://www.youtube.com/watch?v=4QJq2h8tCv8&t=2s').then(console.log("hi"));


    const concatenatedText = response.map(item => item.text).join(' ');
    // console.log(concatenatedText);


    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = concatenatedText+"Using this context from a video make a professional blog ";
  
    const result = await model.generateContent(prompt);
    const responseGemini = await result.response;
     text = responseGemini.text();
  console.log(text);

}

main();
module.exports = text;














