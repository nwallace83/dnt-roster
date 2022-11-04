import Character from '../../interfaces/character'

interface SelectRoleProps {
  fieldName: string
  character: Character
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
      <select name={props.fieldName} className="form-select" onChange={(e) => handleChange(props.fieldName,e.target.value)}>
        {props.options.map((option, index) => <Option optionText={option} key={index} fieldName={props.fieldName} character={props.character} />)}
      </select>
    </div>
  )
}

interface OptionProps {
  optionText: string
  fieldName: string
  character: Character
}
export default function Option(props: OptionProps) {
  const isSelected = props.character[props.fieldName as keyof Character] === props.optionText
  return (
    <option selected={isSelected}>{props.optionText}</option>
  )
}