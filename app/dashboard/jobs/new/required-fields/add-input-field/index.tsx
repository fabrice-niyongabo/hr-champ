import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";

import { BadgeInfoIcon, Delete } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { IApplicationFormInputField } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface IProps {
  showDialog: boolean;
  setShowDialog: any;
  setApplicationFormInputs: any;
  applicationFormInputs: IApplicationFormInputField[];
}
const initialState: IApplicationFormInputField = {
  id: "0",
  label: "",
  type: "",
  required: true,
};
function AddInputField({
  setShowDialog,
  showDialog,
  setApplicationFormInputs,
  applicationFormInputs,
}: IProps) {
  const { toast } = useToast();
  const [input, setInput] = useState<IApplicationFormInputField>(initialState);
  const [inputOptions, setInputOptions] = useState<string[]>([""]);
  const handleRemoveInputOption = (index: number) => {
    if (inputOptions.length == 1) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Input options can not be empty",
      });
      return;
    }
    const newState = [...inputOptions];
    newState.splice(index, 1);
    setInputOptions(newState);
  };
  const handleInputOptionChange = (value: string, index: number) => {
    const newState = [...inputOptions];
    newState[index] = value;
    setInputOptions(newState);
  };
  const handleAdd = (e: any) => {
    e.preventDefault();
    //validation
    if (
      input.type !== "" &&
      input.type !== "text" &&
      input.type !== "textarea"
    ) {
      let hasEmptyOption = false;
      for (let i = 0; i < inputOptions.length; i++) {
        if (inputOptions[i].trim() === "") {
          hasEmptyOption = true;
          break;
        }
      }
      if (hasEmptyOption) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "Found an empty input option, Please remove it or add some text",
        });
        return;
      }
    }
    if (
      input.type !== "" &&
      input.type !== "text" &&
      input.type !== "textarea"
    ) {
      setApplicationFormInputs((prev: any) => [
        ...prev,
        { ...input, id: "item-" + applicationFormInputs.length },
      ]);
    } else {
      setApplicationFormInputs((prev: any) => [
        ...prev,
        {
          ...input,
          id: "item-" + applicationFormInputs.length,
          options: inputOptions,
        },
      ]);
    }
    setInput(initialState);
    setInputOptions([]);
    setShowDialog(false);
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add input field</DialogTitle>
          <form className="flex flex-col gap-2 pt-3" onSubmit={handleAdd}>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <span className="text-xs">Input Label</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <BadgeInfoIcon size={16} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <small>
                        This is the text that will be displayed at the top of
                        input field inorder to let applicant know which kind of
                        information to provide. Make sure to provide a
                        meaningufull text
                      </small>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                placeholder="Enter input label"
                value={input.label}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInput((prev) => ({ ...prev, label: e.target.value }))
                }
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs">Input Type</span>
              <Select
                required
                value={input.type}
                onValueChange={(e: string) =>
                  setInput((prev) => ({ ...prev, type: e as any }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose Input Type" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="text">
                    Text (for entering only 1 paragraph)
                  </SelectItem>
                  <SelectItem value="textarea">
                    Textarea (for entering more than 1 paragram)
                  </SelectItem>
                  <SelectItem value="radio">Radio button</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {input.type !== "" &&
              input.type !== "text" &&
              input.type !== "textarea" && (
                <div className="flex flex-col gap-2 border p-3 rounded-md">
                  <div className="flex items-center gap-1">
                    <span className="text-xs">Input options</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <BadgeInfoIcon size={16} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <small>
                            Enter all possible options that an applicant can
                            choose from
                          </small>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {inputOptions.map((value, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2"
                    >
                      <Input
                        value={value}
                        placeholder="Enter option text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputOptionChange(e.target.value, index)
                        }
                      />
                      <Button
                        type="button"
                        size={"sm"}
                        variant={"destructive"}
                        onClick={() => handleRemoveInputOption(index)}
                      >
                        <Delete />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    size={"sm"}
                    className="w-[30%] rounded-full bg-gray-700"
                    onClick={() => setInputOptions((prev) => [...prev, ""])}
                  >
                    Add Option
                  </Button>
                </div>
              )}

            <div className="flex items-center gap-1">
              <Switch
                checked={input.required}
                onCheckedChange={() =>
                  setInput((prev) => ({ ...prev, required: !prev.required }))
                }
              />
              <span>Required, applicant can not skip this field</span>
            </div>
            <Button
              type="submit"
              size={"sm"}
              className="mt-3"
              onClick={handleAdd}
            >
              Save
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddInputField;
