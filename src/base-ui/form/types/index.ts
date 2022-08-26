type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  label: string
  type: IFormType
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  otherOptions?: any
  // 针对特殊的属性
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemLayout: any
}
