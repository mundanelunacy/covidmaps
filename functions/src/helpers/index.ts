export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const objToParams = (obj: any) => {
    return Object.entries(obj)
        .map(([key, val]) => `${key}=${val}`)
        .join("&");
};

export const minTwoDigits = (n: number) => {
    return (n < 10 ? "0" : "") + n;
};
