export default {
  // region Work Package 1
  user_form: 'We need an entity to get the (customergroup_name, function_name, contactitle_name, contactsalutation_name) of a contactperson ',
  // endregion
  // region Work Package 1
  // endregion
  // region Work Package 3
  pos: 'We need an entity that send location_count and area_count',
  pos_relations: `Areas: area_pos_grp doesnt send location_id, location_name and areatype_name <br>
  Contracts: We need an entity for the list, The creation in contract_area_unit_usagetype_rel send 'internal server error' <br>
  Grouptickets: We dont know what entities to use<br>
  ContradictionPacakge, Invoices, Appointment Track: We dont know what entities to use<br>`,
  area: `We need and entitiy to fill all the columns <br>
Create: Impossible to associate usage_type to area, usagetype  from contains date fields`,
  area_relations: `Contracts: area_contract_grp send internal server error <br>
Point of sales: 'area_pos_rel' doesnt send company_name and tag_name<br>
Service Objects: area_serviceobject_grp must send serviceobjecttype_name`,
  location: `We need an entity to fill all the columns`,
  location_relations: `Area: location_area_grp send internal server error <br>
`,
  recurringpayment: `Impossible to create a recurring payment, we have an internal server error`,
  tag_relations: `pos_tag_grp entity doesnt send back the fields: company_name and area_count`,
  criteria_relations: 'Impossible to get the criteria contract relation, we have an internal server error',
  indexclause_relations: 'Impossible to get the recurring payment relation, we have an internal server error',
  // endregion
}
