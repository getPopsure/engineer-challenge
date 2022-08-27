import { useContext } from "react"

import { ContentContext } from "../context";

import './styles.css';

export default function Dropdown(props: any) {
    const getLocalisedContent = useContext(ContentContext);

    const options = getLocalisedContent(`filter.${props.name}.options`)
    const updateOption = (e: any) => props.onSelect(e.target.value);

    return (
        <div className={`dropdown ${props.className}`}>
            <select className="dropdown__button" id={`${props.name}Dropdown`} onChange={updateOption} value={props.value}>
                {
                    Object.entries(options)
                        .map((option: any, key: number) => <option value={option[0]} key={key}>{option[1]} </option>)
                }
            </select>
            <label htmlFor={`${props.name}Dropdown`} className="dropdown__label">
                {getLocalisedContent(`filter.${props.name}.label`)}
            </label>
        </div>
    )

}

