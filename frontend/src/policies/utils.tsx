import Badge from "../common/Badge";

import { SearchPoliciesResponseBody } from "../models";
import { Policy } from "./models";


const STATUS_BADGE_STYLES = {
    ACTIVE: { textColor: 'tc-green-100', backgroundColor: 'bg-green-100' },
    PENDING: { textColor: 'tc-yellow-600', backgroundColor: 'bg-yellow-100' },
    CANCELLED: { textColor: 'tc-red-100', backgroundColor: 'bg-red-100' },
    DROPPED_OUT: { textColor: 'tc-red-100', backgroundColor: 'bg-red-100' },
}


function mapAPIPoliciesToUIPolicies(data: SearchPoliciesResponseBody[], getLocalisedContent: Function): Policy[] {
    return data.map((policy: SearchPoliciesResponseBody) => ([
      `${policy.client.firstName} ${policy.client.lastName}`,
      policy.provider,
      getLocalisedContent(`insuranceType.${policy.insuranceType}`),
      <Badge status={getLocalisedContent(`policyStatus.${policy.status}`)} styles={STATUS_BADGE_STYLES[policy.status]} />,
      <span>
        {policy.dependants.reduce((acc, dependant) =>`${dependant.firstName} ${dependant.lastName}${acc ? `, ${acc}` : ""}`, "")}
      </span>
    ]))
}

export {
  mapAPIPoliciesToUIPolicies
}
  
