
interface SelectRoleProps {
  fieldName: string
  defaultValue: string,
  options: string[]
  width: string
  labelText: string
  onChange: (fieldName: string, value: string) => void
}
export function EditCharacterSelect(props: SelectRoleProps) {
  const handleChange = props.onChange
  return (
    <div className={'col-md-' + props.width}>
      <label className="form-label font-weight-bold">{props.labelText}</label>
      <select name={props.fieldName} className="form-select" value={props.defaultValue} onChange={(e) => handleChange(props.fieldName,e.target.value)}>
        {props.options.map((option, index) => <Option optionText={option} key={index} fieldName={props.fieldName} />)}
      </select>
    </div>
  )
}

interface OptionProps {
  optionText: string
  fieldName: string
}
export default function Option(props: OptionProps) {
  return (
    <option>{props.optionText}</option>
  )
}