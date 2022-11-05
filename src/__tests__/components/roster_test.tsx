import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Roster from '../../components/roster/roster'
import { Provider } from 'react-redux'
import store from '../../store'
import { setRoster } from '../../reducers/roster-slice'
import renderer from 'react-test-renderer'
import Character from '../../interfaces/character'

describe('Roster',() => {
    let container: renderer.ReactTestRenderer

    let testPlayers: Array<Character> =[
        {characterName: 'test2', discordUserName: 'discordusername',primaryWeapon1: 'Life Staff', primaryWeapon2: 'Sword', 
        primaryArmor: 'Light', primaryRole: 'dps', primaryGS: '600', secondaryWeapon1: 'Life Staff', secondaryWeapon2: 'Sword', 
        secondaryArmor: 'Light', secondaryRole: 'dps', secondaryGS: '600', inactive:false,id: '2', crafting: {
            weaponSmithing: false, armoring: false, engineering: false, jewelCrafting: false, arcana: false, cooking: false, furnishing: false
        }},
        {characterName: 'test1', discordUserName: 'discordusername',primaryWeapon1: 'Life Staff', primaryWeapon2: 'Sword', 
        primaryArmor: 'Light', primaryRole: 'dps', primaryGS: '600', secondaryWeapon1: 'Life Staff', secondaryWeapon2: 'Sword', 
        secondaryArmor: 'Light', secondaryRole: 'dps', secondaryGS: '600',inactive:false, id: '3', crafting: {
            weaponSmithing: false, armoring: false, engineering: false, jewelCrafting: false, arcana: false, cooking: false, furnishing: false
        }},
        {characterName: 'test3', discordUserName: 'discordusername',primaryWeapon1: 'Life Staff', primaryWeapon2: 'Sword', 
        primaryArmor: 'Light', primaryRole: 'dps', primaryGS: '600', secondaryWeapon1: 'Life Staff', secondaryWeapon2: 'Sword', 
        secondaryArmor: 'Light', secondaryRole: 'dps', secondaryGS: '600',inactive:false, id: '4', crafting: {
            weaponSmithing: false, armoring: false, engineering: false, jewelCrafting: false, arcana: false,cooking: false, furnishing: false
        }},
        {characterName: 'testinactive', discordUserName: 'discordinactiveuser',primaryWeapon1: 'Life Staff', primaryWeapon2: 'Sword', 
        primaryArmor: 'Light', primaryRole: 'dps', primaryGS: '600', secondaryWeapon1: 'Life Staff', secondaryWeapon2: 'Sword', 
        secondaryArmor: 'Light', secondaryRole: 'dps', secondaryGS: '600',inactive:true, id: '5', crafting: {
            weaponSmithing: false, armoring: false, engineering: false, jewelCrafting: false, arcana: false, cooking: false, furnishing: false
        }}
    ]

    store.dispatch(setRoster(testPlayers))

    const setup = () => {
        render(<Provider store={store}><Roster /></Provider>)
        container = renderer.create(<Provider store={store}><Roster /></Provider>)
    }

    beforeEach(() => {
        console.error = jest.fn()
    })

    test('Headers are displayed',() => {
        setup()
        expect(screen.getByRole('columnheader',{name: /name/i})).toBeInTheDocument()
        expect(screen.getByRole('columnheader',{name: /discord/i})).toBeInTheDocument()
        expect(screen.getByRole('columnheader',{name: /main/i})).toBeInTheDocument()
        expect(screen.getByRole('columnheader',{name: /alt/i})).toBeInTheDocument()
        expect(screen.getByRole('columnheader',{name: /active/i})).toBeInTheDocument()
        expect(container.toJSON()).toMatchSnapshot()
    })

    test('Players are displayed',() => {
        setup()
        expect(screen.getAllByRole('row').length).toEqual(4)
        expect(container.toJSON()).toMatchSnapshot()
    })

    test('Players are sorted',() => {
        setup()
        expect(screen.getAllByRole('row')[1].innerHTML).toContain('test1')
        expect(screen.getAllByRole('row')[2].innerHTML).toContain('test2')
        expect(screen.getAllByRole('row')[3].innerHTML).toContain('test3')
        expect(container.toJSON()).toMatchSnapshot()
    })

    test('Show inactive players',() => {
        setup()
        expect(screen.getAllByRole('row').length).toEqual(4)
        fireEvent.click(screen.getByRole('checkbox',{name: 'Show Inactive'}))
        expect(screen.getAllByRole('row').length).toEqual(5)
        expect(container.toJSON()).toMatchSnapshot()
    })

    test('Filter players',async () => {
        setup()
            fireEvent.change(screen.getByLabelText(/filter:/i),{target: {value: 'discordusername'}})
            await new Promise((r) => setTimeout(r, 500))
            expect(screen.getAllByRole('row').length).toEqual(4)
            expect(container.toJSON()).toMatchSnapshot()
    })

})

