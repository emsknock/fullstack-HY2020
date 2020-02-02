import React, { FC } from "react";

export const FilterForm: FC<{
    value: string,
    onChange: (newFilter: string) => void
}> = ({
    value,
    onChange,
}) => <>
    Filter shown with
    <input type="text" value={value} onChange={e => onChange(e.target.value)} />
</>;