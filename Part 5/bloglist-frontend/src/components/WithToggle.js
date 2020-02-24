import React, { useState, forwardRef, useImperativeHandle } from "react";

export const WithToggle = forwardRef(({ label, children }, ref) => {

    const [isOpen, setOpen] = useState(false);

    useImperativeHandle(
        ref,
        () => ({ setOpen })
    );

    if (!isOpen) return <div>
        <button onClick={() => setOpen(true)}>{label}</button>
    </div>

    return <>
        <div>{children}</div>
        <div>
            <button onClick={() => setOpen(false)}>Cancel</button>
        </div>
    </>;

});