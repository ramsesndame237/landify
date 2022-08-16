export default {
  // region Work Package 1
  // endregion
  // region Work Package 1
  // endregion
  // region Work Package 3
  area: `We need and entitiy to fill all the columns <br>
Create: Impossible to associate usage_type to area, usagetype  from contains date fields`,
  area_relations: `Contracts: area_contract_grp send internal server error <br>
Point of sales: 'area_pos_rel' doesnt send company_name and tag_name<br>
Service Objects: area_serviceobject_grp must send serviceobjecttype_name<br>`,
  location: `We need an entity to fill all the columns`,
  location_relations: `Area: location_area_grp send internal server error <br>
`,
  recurringpayment: `Impossible to create a recurring payment, we have an internal server error`,
  tag_relations: `pos_tag_grp entity doesnt send back the fields: company_name and area_count`,
  criteria_relations: `Impossible to get the criteria contract relation, we have an internal server error<br>
Contract: Missing Unit on the contract relation`,
  indexclause_relations: 'Impossible to get the recurring payment relation, we have an internal server error',
  company: 'The delete action doesnt work fine',
  // endregion
  // region WP4
  invoice: `We need a view to display all fields in the table <br> Filter must be implemented in the backend for this table`,
  // endregion
}
