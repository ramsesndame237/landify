import { successToast } from '@/libs/toastification'
import { api } from '@/libs/axios'

export async function updateInvoiceFlatRate(data) {
  console.log('change', data)
  await api({
    entity: 'invoiceposition',
    action: 'update',
    data: [
      {
        invoiceposition_id: data.item.invoiceposition_id,
        invoiceposition_flat_rate: data.value,
      },
    ],
  })
  successToast('Value updated')
}

export async function updateInvoiceApportionable(data) {
  console.log('change', data)
  await api({
    entity: 'invoiceposition',
    action: 'update',
    data: [
      {
        invoiceposition_id: data.item.invoiceposition_id,
        invoiceposition_apportionable: data.value,
      },
    ],
  })
  successToast('Value updated')
}

export function getContractCriteriaFields() {
  return [
    {
      key: 'contract_criteria_value',
      unit_key: 'contract_criteria_unit_id',
      unit_label: 'unit_name',
      isUnitOnLeft: false,
    },
    {
      key: 'choice_id',
      type: 'list',
      list: 'frontend_3_6_4',
      relationEntity: 'contract_criteria_choice_rel',
      with: ['criteria_id', 'contract_id'],
      listLabel: 'choice_name',
      hideOnIndex: true,
      filter_key: 'criteria_id',
      filter_value: null,
      mandatoryIfListEmpty: true,
    },
    {
      key: 'contract_criteria_valid_from_date', type: 'date', composite: true, disableOnUpdate: true,
    },
    { key: 'contract_criteria_valid_to_date', type: 'date' },
    { key: 'contract_criteria_exists', type: 'boolean' },
    { key: 'contract_criteria_is_obsolete', type: 'boolean' },
    { key: 'criteriatype_name', hideOnForm: true },
    { key: 'contract_criteria_unit_name', hideOnForm: true },
    { key: 'contract_criteria_comment', type: 'textarea', required: false },
    { key: 'choice_name', hideOnForm: true },
  ]
}
