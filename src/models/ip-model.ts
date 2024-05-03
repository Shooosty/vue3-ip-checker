export default {
  columns: [
    {
      label: 'IP',
      prop: 'query',
      width: '200',
      slot: { type: 'Ip' }
    },
    {
      label: 'Country',
      prop: 'country',
      filter: 'bottom-end',
      width: '200',
      slot: { type: 'Default' }
    },
    {
      label: 'CityTown',
      prop: 'city',
      width: '200',
      slot: { type: 'Default' }
    },
    {
      label: '',
      prop: 'status',
      width: '38',
      slot: { type: 'Status' }
    }
  ]
}
