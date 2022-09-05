export default {
  // region Work Package 1
  // endregion
  // region Work Package 2
  customergroup_relations: `Customergroup_company_grp doesnt send city_zip,city_name,country_short <br>
contactperson_customergroup_grp doesnt send all values <br>
Do we have to keep grouptickettab ?<br>
user_customergroup_grp doesnt send usertype_name and team_name`,
  partnercompany_relations: `We need relation table to create ticket, invoice, contadiction relations<br>`,
  // endregion
  // region Work Package 3
  area_relations: `frontend_3_2_3_1 doesnt return usagetype_id<br>
`,
  contract: 'Cannot determine witch property of frontend_3_4_1_1 response is owner or manager',
  contract_relations: `Need entity for document relation<br>
error 500 on document read-rich request<br>
Need entity for serviceobject relation<br>
contract_recurringpayment_grp doesnt send all datas<br>
contract_criteria_grp doesnt return criteriatype_name<br>
Impossible to add invoice relation . Return 'Failed executing sql: {err: "1062 (23000): Duplicate entry 'x' for key 'invoice_id'<br>`,
  serviceobject_relations: `Need entity for location relation<br>
serviceobject_contract_grp doesnt send city, country and partnercompany_name`,
  recurringpayment: `frontend_3_9_1 doesnt return indexclause_name<br>`,
  // endregion
  // region WP4
  costtype: 'frontend_4_7_1 doesnt return costtype_maingroup',
  costtype_relations: `Impossible to create new externalcosttype relation<br>`,
  // endregion
}
