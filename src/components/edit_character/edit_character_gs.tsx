import Character from '../../interfaces/character'

interface EditCharacterGSProps {
  character: Character
  fieldName: string
  onChange: (f: string, v: string) => void
}
export default function EditCharacterGS(props: EditCharacterGSProps) {
  const handleChange = props.onChange
  return (
    <div className="col-md-2">
      <label className="form-label">Gear Score</label>
      <input name="primarygs" maxLength={3} type="Number" className="form-control"
        defaultValue={props.character.primaryGS} onChange={(e) => handleChange(props.fieldName, e.target.value)}
      />
    </div>
  )
}