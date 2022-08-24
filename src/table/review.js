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
  area_relations: `frontend_3_2_3_1 doesnt return usagetype_id<br>
`,
  location_relations: `does frontend_3_3_3_2 return duplicate values?<br>
`,
  contract: 'Need entity with all propertie. contract entity doent send all',
  contract_relations: `Need entity for document relation<br>
error 500 on document read-rich request<br>
Need entity for serviceobject relation<br>
contract_recurringpayment_grp doesnt send all datas<br>
contract_criteria_grp doesnt return criteriatype_name<br>
Impossible to add invoice relation . Return 'Failed executing sql: {err: "1062 (23000): Duplicate entry 'x' for key 'invoice_id'<br>`,
  serviceobject_relations: `Need entity for location relation<br>
serviceobject_contract_grp doesnt send city, country and partnercompany_name`,
  recurringpayment: `Impossible to create a recurring payment, we have an internal server error<br>
frontend_3_9_1 doesnt return indexclause_name<br>`,
  criteria_relations: `Impossible to get the criteria contract relation, we have an internal server error<br>
Contract: Missing Unit on the contract relation`,
  indexclause_relations: `Impossible to get the recurring payment relation, we have an internal server error<br>
Impossible to create the indexclause relation , returns: err: "1062 (23000): Duplicate entry '1' for key 'indexclause_id'`,
  // endregion
  // region WP4
  invoice: `We need a view to display all fields in the table <br> Filter must be implemented in the backend for this table`,
  costtype: 'frontend_4_7_1 doesnt return costtype_maingroup',
  costtype_relations: `Impossible to create new externalcosttype relation<br>`,
  // endregion
}
