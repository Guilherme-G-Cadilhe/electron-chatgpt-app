import { useEffect, useState } from "react";
import { IMessageType, MessageItemProps } from "./interface";

function MessageItem({ message }: MessageItemProps) {
  const [text, setText] = useState(message.author === "ai" ? "" : message.text);

  useEffect(() => {
    // Typewriter effect
    setTimeout(() => {
      if (message.text) {
        setText(message.text.slice(0, text.length + 1));
      }
    }, 30);
  }, [text, message.text]);

  return (
    <div className="answer">
      <div className={`author author-${message.author}`}>{message.author}:</div>
      <div className="message">{text}</div>
    </div>
  );
}
//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
export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<IMessageType[]>([]);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (prompt.trim().length === 0) return;

    setMessages((messages) => [
      ...messages,
      {
        text: prompt,
        id: new Date().toISOString() + Math.random(),
        author: "human",
      },
    ]);
    const chatGPTResponse = await electron.chatGPTApi.getCompletion(prompt);

    if (chatGPTResponse.error) {
      setMessages((messages) => [
        ...messages,
        {
          text: chatGPTResponse.error,
          id: new Date().toISOString(),
          author: "ai",
        },
      ]);
    } else {
      setMessages((messages) => [
        ...messages,
        {
          text: chatGPTResponse.message,
          id: new Date().toISOString(),
          author: "ai",
        },
      ]);
    }

    // Simulate response

    setPrompt("");
  };

  return (
    <div className="container">
      <div className="inputContainer">
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask a question" rows={3} />
        <button className="submit" onClick={onSubmit}>
          Submit
        </button>
      </div>
      <div className="answers">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}
