export interface I_Course {
    id: number,
    name: string,
    parts: I_Part[],
}
export interface I_Part {
    id: number,
    name: string,
    exercises: number,
}