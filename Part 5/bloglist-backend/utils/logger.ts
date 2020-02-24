export const info = (...data: any[]) => {
    if (process.env.NODE_ENV !== "test")
        console.info(...data);
}
export const error = (...data: any[]) => console.error(...data);