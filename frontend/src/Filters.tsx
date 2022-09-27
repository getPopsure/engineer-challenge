import {Input} from "@popsure/dirty-swan";
import Select from "./Select"
import { Policy } from './types'

interface FilterProps {
  policies: Array<Policy>
}
export default function Filters({policies}: FilterProps) {
  return (
    <section>
     <h2 className="p-h2 mt24 mb24">Filters</h2>
     <div className="fd-row ai-center jc-center">
      <Input placeholder="name" name="name" className="mr24 mt24 mb24 w25 d-inline-block"></Input>
      <Select className="mt24 mb24 w25 mr24 " label="Provider" id="provier" />
      <Select className="mt24 mb24 w25 mr24 " label="Type" id="type"/>
      <Select className="mt24 mb24 w25 mr24 " label="Status" id="status"/>
   
     </div>
     </section>
   )
}
