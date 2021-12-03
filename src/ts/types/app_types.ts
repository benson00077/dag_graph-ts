export type input = {
  vertex: string;
  incomming: string;
  outgoing: string;
};

export type dagEdagesInput = {
  incomming: string | string[]
  vertex: string
  outgoing: string | string[]
}