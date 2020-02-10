import React, {FC} from "react";

const successStyle: React.CSSProperties = {
    backgroundColor: "#229922",
    color: "white",
};
const errorStyle: React.CSSProperties = {
    backgroundColor: "#992222",
    color: "white",
};

export const Toaster: FC<{
    success: string | null,
    error: string | null,
}> = ({
    success,
    error,
}) => {
    return <>
        { success && <div style={successStyle}>{success}</div> }
        { error && <div style={errorStyle}>{error}</div> }
    </>
};