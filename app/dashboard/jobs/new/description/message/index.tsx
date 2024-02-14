import parse from "html-react-parser";

interface IProps {
  type: "user" | "assistant";
  message: string;
}

function Message({ type, message }: IProps) {
  return (
    <div className="mb-3">
      {type === "assistant" && (
        <div className="bg-gray-300 p-3 inline-block max-w-[80%] rounded-xl rounded-bl-[0] text-sm">
          {parse(message)}
        </div>
      )}
    </div>
  );
}

export default Message;
