import { input, dagEdagesInput } from "../../ts/types/app_types";

// enum Delimter {
//   Comma = ",",
//   Space = " ",
//   Period = ".",
//   Semicolon = ";",
//   Comma2 = "，",
//   Space2 = "　",
//   Period2 = "。",
// }

export default function inputParser(verticesInput: input) {
  let { incomming, vertex, outgoing } = verticesInput;
  let [incommingArr, outgoingArr] = [seperate(incomming.trim()), seperate(outgoing.trim())];
  
  let result: dagEdagesInput = {
    incomming: arrTrim(incommingArr),
    vertex: vertex.trim(),
    outgoing: arrTrim(outgoingArr),
  };

  return result
}

function seperate(str: string) {
  return str.split(/[\s,]+/);
}

function arrTrim(arr: string[]) {
  let result: string[] = []
  arr.forEach((each, i) => {
    result[i] = each.trim()
  })
  return result
}