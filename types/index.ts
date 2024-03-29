export interface IChat {
  role: "user" | "assistant";
  content: string;
}

export interface IApplicationFormInputField {
  id: string;
  label: string;
  type: "" | "text" | "textarea" | "radio" | "checkbox";
  options?: string[];
  required: boolean;
}
