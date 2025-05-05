declare module "*.svg" {
  const content: string;
  export default content;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
declare const jquery = (selector: string) => Node;
declare module "zha-ui/dist/zhao-ui/es/compnents/index";
declare module 'dotenv-webpack' {
}
interface Window {
  APICONFIG:string
}


