import React from 'react';


const POLICIES_CONTENT = {
    insuranceType: {
        LIABILITY: 'Liability',
        HEALTH: 'Health',
        HOUSEHOLD: 'Household'
    },
    policyStatus: {
        ACTIVE: 'Active',
        PENDING: 'Pending'
    },
    filter: {
        insuranceType: {
            label: 'Insurance type',
            options: {
                ALL: 'All',
                LIABILITY: 'Liability',
                HEALTH: 'Health',
                HOUSEHOLD: 'Household'
            }
        },
        policyStatus: {
            label: 'Policy status',
            options: {
                ALL: 'All',
                ACTIVE: 'Active',
                PENDING: 'Pending'
            }
        }
    },
    search: {
        label: 'Search by',
        placeholder: 'Enter search text',
        options: {
            ALL: 'All',
            CLIENT_FIRSTNAME: 'Client firstname',
            CLIENT_LASTNAME: 'Client lastname',
            DEPENDANT_FIRSTNAME: 'Dependant firstname',
            DEPENDANT_LASTNAME: 'Dependant lastname'
        }
    },
    table: {
        headers: [
            "Name",
            "Provider",
            "Type",
            "Status",
            "Family Members"
        ]
    },
    error: {
        generic: "Sorry something went wrong, Please try again later."
    }
};

const getLocalisedContent = (key: string): string => {
    if (!key) {
        return '';
    }

    const keys = key.split('.');
    // @ts-ignore
    return keys.reduce((acc, key) => acc ? acc[key] : '', POLICIES_CONTENT);
}
  
const ContentContext = React.createContext(getLocalisedContent);

export {
    ContentContext,
    getLocalisedContent
}