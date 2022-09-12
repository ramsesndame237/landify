export default {
  // region Work Package 1
  // endregion
  // region Work Package 2
  partnercompany_relations: `frontend_2_5_3_5 doent send contactperson_id`,
  partnergroup_relations: 'We need views for all tab registers',
  // endregion
  // region Work Package 3
  pos: `Create works but the new entities dont show in the list with frontend_3_1_1 but show with pos entity`,
  pos_relations: `Impossible to create new area relation cause 'duplicate entry' problem<br>
`,
  area_relations: `frontend_3_2_3_1 doesnt return usagetype_id<br>`,
  location_relations: `Create impossible for Area relation cause 'Duplicate entry' error<br>
Delete problem for area location, all rows are affected after deletion of one row<br>
frontend_3_3_3_2 doesnt send all relations for a location<br>
Regex validation on location_partnercompany_partnertype_rel is a problem to create a relation<br>
Delete on partnercompany relation doesnt work`,
  contract: `Cannot determine witch property of frontend_3_4_1_1 response is owner or manager<br>
Cannot delete a row<br>`,
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
  // endregion
}
