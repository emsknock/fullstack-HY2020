import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

export const FilterForm = () => {

    const dispatch = useDispatch();
    const handleChange = e => {
        e.preventDefault();
        dispatch(setFilter(e.target.value));
    }

    return <div>
        Filter <input type="text" onChange={handleChange} />
    </div>

}