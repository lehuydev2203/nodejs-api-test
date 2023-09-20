export interface responseType {
  status: 0 | 1;
  data:
    | {}
    | {
        message: String;
      };
}
