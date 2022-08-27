import { useContext } from "react"

import { ContentContext } from "../context";

import './styles.css';

export default function SearchInput(props: any) {
    const getLocalisedContent = useContext(ContentContext);

    const updateSearchValue = (e:any) => {
        props.setSearchParams((searchParams: any) => ({
            ...searchParams,
            value: e.target.value
        }))
    }

    const searchOptions = getLocalisedContent("search.options");
    const updateSearchField = (e: any) => {
        props.setSearchParams((searchParams: any) => ({
            ...searchParams,
            field: e.target.value
        }))
    }

    const search = (e: any) => {
        e.preventDefault();
        props.search();
    }

    return (
        <form className={`search ${props.className}`} onSubmit={search}>
            {
                props.showDropdown &&
                <div className="search__dropdown">
                    <select className="search__dropdown__button" id={`${props.name}Dropdown`} onChange={updateSearchField} value={props.searchParams.field}>
                        {
                            Object.entries(searchOptions)
                                .map((option: any, key: number) => <option value={option[0]} key={key}>{option[1]} </option>)
                        }
                    </select>
                    <label htmlFor={`${props.name}Dropdown`} className="search__dropdown__label">
                        {getLocalisedContent(`search.label`)}
                    </label>
                </div>
            }
            <input className="search__text-input" type="text" placeholder={getLocalisedContent("search.placeholder")} value={props.searchParams.value} onChange={updateSearchValue} />
            <button className="search__button" type="submit" >
                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </button>
        </form>
    )

}

