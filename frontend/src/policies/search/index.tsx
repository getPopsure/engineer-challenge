import { useContext, useEffect, useState } from "react";

import Dropdown from "../../common/dropdown";
import SearchInput from "../../common/search-input-with-dropdown";

import { searchPolicies } from "../../helpers/api-helper";
import { InsuranceType, PolicyStatus } from "../../models";
import { mapAPIPoliciesToUIPolicies } from "../utils";
import { ContentContext } from "../../common/context";

import './styles.css'

const INSURANCE_TYPES: InsuranceType[] = [InsuranceType.HEALTH, InsuranceType.HOUSEHOLD, InsuranceType.LIABILITY];
const POLICY_STATUSES: PolicyStatus[] = [PolicyStatus.ACTIVE, PolicyStatus.PENDING];
const ALL = "ALL";

export default function Search(props: any) {
    const getLocalisedContent = useContext(ContentContext);
    const [searchParams, setSearchParams] = useState({
        value: "",
        field: ALL
    });
    const [insuranceType, setInsuranceType] = useState(ALL);
    const [policyStatus, setPolicyStatus] = useState(ALL);

    async function onSearch() {
        props.setError();
        props.setLoader(true);
        try {
            const data = await searchPolicies({
                value: searchParams.value,
                field: searchParams.field,
                policyStatus: policyStatus === ALL ? POLICY_STATUSES : [policyStatus],
                insuranceType: insuranceType === ALL ? INSURANCE_TYPES : [insuranceType]
            });
            props.setLoader(false);
            const policies = mapAPIPoliciesToUIPolicies(data, getLocalisedContent);
            return props.setPolicies(policies);
        } catch (err: any) {
            props.setLoader(false);
            props.setError(err.message || getLocalisedContent('error.generic'))
        }
    }

    useEffect(() => {
        onSearch();
    }, [
        insuranceType,
        policyStatus
    ])

    return (
        <div className="search-container">
            <SearchInput
                name="search"
                showDropdown={true}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                search={onSearch}/>
            <Dropdown
                name="insuranceType"
                value={insuranceType}
                onSelect={setInsuranceType} />
            <Dropdown
                name="policyStatus"
                value={policyStatus}
                onSelect={setPolicyStatus} />
        </div>
    )
}
