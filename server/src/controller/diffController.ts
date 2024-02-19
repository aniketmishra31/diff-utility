import { type Request, type Response } from "express";

const LCS = (s1: string, s2: string): number[][] => {
    const m = s1.length;
    const n = s2.length;
    let dp: number[][] = [];
    for (let i = 0; i <= m; i++) {
        dp[i] = Array(n + 1).fill(0);
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            }
            else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp;
}
const getLcs = (s1: string, s2: string, dp: number[][]): string => {
    let i = s1.length;
    let j = s2.length;
    let lcs = "";
    while (i > 0 && j > 0) {
        if (s1[i - 1] == s2[j - 1]) {
            lcs = s1[i - 1] + lcs;
            i--;
            j--;
        }
        else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        }
        else {
            j--;
        }
    }
    return lcs;
}
export const diffController = (req: Request, res: Response) => {
    try {
        const { input, compare } = req.body;
        if (input && compare) {
            let m: number = input.length;
            let n: number = compare.length;
            let dp = LCS(input, compare);
            let lcs = getLcs(input, compare, dp);
            res.status(200).json({ result: dp[m][n], lcsStr: lcs });
        }
        else {
            throw { status: 400, message: "Invalid input" };
        }
    }
    catch (err: any) {
        res.status(err.status || 500).json({ error: err.message } || { error: "Some error occured" });
    }
};