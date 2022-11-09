import Character, { CharacterCrafting } from '../../types/character'

interface TradeSkillsProps {
  character: Character
  onChange: (s: string, b: boolean) => void
}
export default function TradeSkills(props: TradeSkillsProps) {
  const character = props.character
  const handleChange = props.onChange
  const tradeSkills = [
    { fieldName: 'weaponSmithing', labelText:'Weapon Smithing'},
    { fieldName: 'armoring', labelText: 'Armoring'},
    { fieldName: 'engineering', labelText: 'Engineering'},
    { fieldName: 'jewelCrafting', labelText: 'Jewel Crafting'},
    { fieldName: 'arcana', labelText: 'Arcana'},
    { fieldName: 'cooking', labelText: 'Cooking'},
    { fieldName: 'furnishing', labelText: 'Furnishing'}
  ]

  return (
    <div className="row padding-left-20">
      {tradeSkills.map((tradeSkill, index) => {
        return <TradeSkillOption fieldName={tradeSkill.fieldName} isChecked={character.crafting[tradeSkill.fieldName as keyof CharacterCrafting]} onChange={handleChange} key={index} labelText={tradeSkill.labelText} />
      })}
      <div className="col-md-12">
        <span>*only check if you have 200 + trophies + gear*</span>
      </div>
    </div>
  )
}

interface TradeSkillOptionProps {
  fieldName: string
  labelText: string
  isChecked: boolean
  onChange: (e: string, b: boolean) => void
}
function TradeSkillOption(props: TradeSkillOptionProps) {
  const handleChange = props.onChange
  return (
    <div className="form-check col-md-3">
      <input className="form-check-input" name={props.fieldName.toLowerCase()} type="checkbox" id={props.fieldName.toLowerCase()}
        checked={props.isChecked}
        onChange={(e: any) => handleChange(props.fieldName, e.target.checked)}
      />
      <label className="form-check-label" htmlFor={props.fieldName.toLowerCase()}>
        {props.labelText}
      </label>
    </div>
  )
}