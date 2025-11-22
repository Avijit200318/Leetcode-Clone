import { IProblem } from "@/models/Problem";

export const levelWiseProblemSeperate = (allProblems: IProblem[]) => {
    let e = 0, m = 0, h = 0;
    const uniqueTitles = new Set<string>();

    for (let i = 0; i < allProblems.length; i++) {
        if(uniqueTitles.has(allProblems[i].title)){
            continue;
        }

        uniqueTitles.add(allProblems[i].title);

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