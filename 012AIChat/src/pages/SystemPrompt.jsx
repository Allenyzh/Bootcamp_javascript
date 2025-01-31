import useMessageStore from '../store/store';

export default function SystemPrompt() {
  const { setSystemPrompt, messages } = useMessageStore();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <textarea
        className="textarea textarea-bordered textarea-lg w-full max-w-xs"
        placeholder="Bio"
        value={messages[0].role === 'system' ? messages[0].content : ''}
      ></textarea>
      <button className="btn btn-accent">Accent</button>
    </div>
  );
}
