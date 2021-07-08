export interface TFormFields {
    email: string
    username: string,
    password: string
}

export interface TFormFieldsAction {
    field: string
    value: string
}

export const formInit: TFormFields = {
    email: '',
    username: '',
    password: ''
}