import { codeSubmissionResultType } from "@/types/ApiResponse";

export const languageWiseSubmissionSeperate = (submission: codeSubmissionResultType[]) => {
    let c = 0, cpp = 0, py = 0, js = 0, java = 0;

    for(let i = 0; i < submission.length; i++){
        if(submission[i].language === "C++"){
            cpp++;
        }else if(submission[i].language === "C"){
            c++;
        } else if(submission[i].language === "Javascript"){
            js++;
        } else if(submission[i].language === "Python"){
            py++;
        } else{
            java++;
        }
    }

    return {c, cpp, py, js, java};
}