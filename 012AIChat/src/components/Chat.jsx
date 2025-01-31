import useMessageStore from '../store/store';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Chat() {
  const { messages } = useMessageStore();
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour12: false });
  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat ${
            message.role === 'user'
              ? 'chat-end'
              : message.role === 'assistant'
              ? 'chat-start'
              : 'hidden'
          }`}
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Allen Yang
            <time className="text-xs opacity-50">{time}</time>
          </div>
          <div className="chat-bubble">
            <Markdown
              remarkPlugins={[remarkGfm]}
              className="table table-xs lg:table-md md:table-lg text-base table-zebra tracking-wide leading-loose text-white text-wrap"
            >
              {message.content}
            </Markdown>
          </div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      ))}
    </>
  );
}
