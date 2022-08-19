export default {
  // region Work Package 1
  // endregion
  // region Work Package 2
  customergroup: 'We need an entity to have data in the pos_count column',
  customergroup_relations: `Customergroup_company_grp doesnt send city_zip,city_name,country_short <br>
contactperson_customergroup_grp doesnt send all values <br>
Do we have to keep grouptickettab ?<br>
user_customergroup_grp doesnt send usertype_name and team_name`,
  company_relations: `frontend_2_1_3_2 doesnt send cotradiction_payment_received <br>`,
  contactperson: `Need entity for list. contactperson doesnt return city_name, contactdetails infos and userId`,
  // endregion
  // region Work Package 3
  area: `
Create: Impossible to associate usage_type to area, usagetype  from contains date fields`,
  area_relations: `Seem like frontend_3_2_3_1 doent return all relative contract related to an area<br>
frontend_3_2_3_1 doesnt return usagetype_id<br>
`,
  recurringpayment: `Impossible to create a recurring payment, we have an internal server error`,
  criteria_relations: `Impossible to get the criteria contract relation, we have an internal server error<br>
Contract: Missing Unit on the contract relation`,
  indexclause_relations: 'Impossible to get the recurring payment relation, we have an internal server error',
  // endregion
  // region WP4
  invoice: `We need a view to display all fields in the table <br> Filter must be implemented in the backend for this table`,
  // endregion
}
