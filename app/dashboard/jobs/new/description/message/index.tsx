import { Button } from "@/components/ui/button";
import parse from "html-react-parser";

interface IProps {
  type: "user" | "assistant";
  message: string;
  index: number;
  setSelectedDescription?: any;
  setShowAlert?: any;
}

function boldText(message: string) {
  // Define the pattern to match the text to replace
  var pattern = /\*\*(.*?)\*\*/g;

  // Replace the text with the bold HTML tags
  var outputString = message.replace(pattern, "<b>$1</b>");

  return outputString;
}

const formatMessage = (msg: string): string => {
  const brMessage = msg.replaceAll("\n", "<br />");
  const boldMessage = boldText(brMessage);
  return boldMessage;
};

function Message({
  type,
  message,
  index,
  setSelectedDescription,
  setShowAlert,
}: IProps) {
  const handleClick = () => {
    if (setSelectedDescription && setShowAlert) {
      setSelectedDescription(formatMessage(message));
      setShowAlert(true);
    }
  };
  // console.log({ message });
  return (
    <div className="mb-3">
      {type === "assistant" ? (
        <div>
          <div className="bg-gray-300 p-3 inline-block max-w-[80%] rounded-3xl rounded-bl-[0] text-sm">
            {parse(message.replaceAll("\n", "<br />"))}
          </div>
          {index !== 0 && (
            <div className="mt-3">
              <Button onClick={() => handleClick()} className="text-xs">
                Continue with this template
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-end justify-end">
          <div className="bg-blue-600 p-3 inline-block max-w-[80%] rounded-3xl rounded-br-[0] text-sm text-white">
            {parse(message)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
