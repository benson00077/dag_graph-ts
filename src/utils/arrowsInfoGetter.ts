import { IdagData } from "../dag/types";

type arrowsRecord = {
  [key: number]: {
    name: string;
    incommingName: string;
  };
}

export default function arrowsInfoGetter(dag: IdagData): [arrowsRecord, number] {
  if (!dag.topSorted) throw new Error("dag has no topSorted yet");
  let topSorted = [...dag.topSorted];
  let counter = 0;
  let map: arrowsRecord = {};

  topSorted.reverse().map((name, i) => {
    let incommingNames = dag["vertices"][name]["incomingNames"];
    incommingNames.map((incommingName, j) => {
      map[counter] = {
        name: name,
        incommingName: incommingName,
      };
      counter += 1;
    });
  });

  return [map, counter];
}
