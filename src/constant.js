export const generate_feedback_prompt = (company, question) =>
  `Hello! Imagine you are a recruiter interviewing a candidate at ${company}. Consider the interview question to be ${question}. I am giving you the candidate's response. Please look into it and check for it's quality in terms of formality, formatting, sentencing, flow of information and provide me with a refactored and improved answer that I can share with the candidate for feedback. Please just give me back the improved answer as your response. Don't return anything except the improved answer since I am going to use that response string to show the candidate. Also, don't have any bolded words in your response. Here's the original answer: `;
export const PROMPT_ERROR_PREFIX =
  "Now, please read a response provided below and look for grammar and tense errors. Please return the string 'grammar error' if there are grammar mistakes. Please return the string 'tense error' if there are tense mistakes. Please could the number of `um` or 'uh` in the response and return a string like `stuttered 3 times` if there are 3 occurances of um or uh. Lastly, please return the string `repetition` if there are any information repeated. I will look for those strings `grammar error` and `tense error` and `stuttered x times` and `repetition` in your response to the detect errors. Don't include anything else in your response besides these strings separated by commas. Please make sure to just look at the response for evaluation. Exclude punctuations and cases. Just look at the sentence content. The response: ";

export const EMOTIONS = {
  neutral: "🙂",
  sad: "😟",
  happy: "😄",
  surprised: "😲",
  angry: "😠",
  disgusted: "🫤",
};
