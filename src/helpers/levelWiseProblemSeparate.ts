import { IProblem } from "@/models/Problem";

export const levelWiseProblemSeperate = (allProblems: IProblem[]) => {
    console.log("all: ", allProblems)
    let e = 0, m = 0, h = 0;
    for (let i = 0; i < allProblems.length; i++) {
        if (allProblems[i].level === "Easy") {
            e += 1;
        } else if (allProblems[i].level === "Medium") {
            m += 1;
        } else {
            h += 1;
        }
    }
    return {e, m, h};
}