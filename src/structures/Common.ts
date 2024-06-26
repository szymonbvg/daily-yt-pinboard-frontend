import { AuthFuncProps } from "../types/Auth";

export const RegExp = {
  USERNAME: /^(?=.*[a-zA-Z])(?!\.)(?!.*\.$)[a-zA-Z0-9@$&._]*$/,
  URL: /^(http(s)?:\/\/)?(((?:www|m).)?youtube.com|youtu.be)\/.+$/
}

export enum MessageType {
  INVALID_USERNAME = "username must contain letter and cannot start or end with '.', allowed characters: a-z A-Z 0-9 @$&._",
  USERNAME_TOO_LONG = "max username lenght: 24",
  USERNAME_TOO_SHORT = "min username lenght: 3",
  DIFFERENT_PASSWD = "passwords are not the same",
  SPACES_IN_URL = "URL cannot contain spaces",
  URL_TOO_LONG = "URL too long",
  INVALID_URL = "invalid URL",
  PASSWD_TOO_SHORT = "min password lenght: 8",
  CAPTCHA = "confirm that you're not a bot",
  HEADING_TOO_LONG = "heading too long",
  ERROR = "something went wrong",
  SAVED = "saved",
  LOADING = "Loading...",
  NOT_FOUND = "Not Found",
  NO_RESULTS = "No more results",
}

export interface IMessageProps extends Partial<AuthFuncProps> {
  heading?: string;
  url?: string;
  dateCallback?: () => boolean;
};

const isRegister = (props: IMessageProps) => props.type === "register";

export const Messages: {
  condition: (props: IMessageProps) => unknown,
  value: MessageType
}[] = [
  { condition: (props: IMessageProps) => isRegister(props) && !props.captcha, value: MessageType.CAPTCHA },
  { condition: (props: IMessageProps) => isRegister(props) && props.username && props.username.length < 3, value: MessageType.USERNAME_TOO_SHORT },
  { condition: (props: IMessageProps) => isRegister(props) && props.username && props.username.length > 24, value: MessageType.USERNAME_TOO_LONG },
  { condition: (props: IMessageProps) => isRegister(props) && props.username && !RegExp.USERNAME.test(props?.username), value: MessageType.INVALID_USERNAME },
  { condition: (props: IMessageProps) => isRegister(props) && props.pass && props.pass.length < 8, value: MessageType.PASSWD_TOO_SHORT },
  { condition: (props: IMessageProps) => isRegister(props) && props.pass !== props.passCheck, value: MessageType.DIFFERENT_PASSWD },
  { condition: (props: IMessageProps) => props.heading && props.heading.length > 80, value: MessageType.HEADING_TOO_LONG },
  { condition: (props: IMessageProps) => props.url?.includes(" "), value: MessageType.SPACES_IN_URL },
  { condition: (props: IMessageProps) => props.url && props.url.length > 2000, value: MessageType.URL_TOO_LONG },
  { condition: (props: IMessageProps) => props.url && !RegExp.URL.test(props.url), value: MessageType.INVALID_URL },
];

export function getMessage(props: IMessageProps) {
  for (const message of Messages) {
    if (message.condition(props)) {
      return message.value;
    }
  }
}