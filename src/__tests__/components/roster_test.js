import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Roster from '../../components/roster'
import { Provider } from 'react-redux'
import store from '../../store'
import { setRoster } from '../../reducers/rosterSlice'
import renderer from 'react-test-renderer';

describe('Roster',() => {
    let container
    let testPlayers=[
        {characterName: 'test1', discordUserName: 'discordusername',primaryWeapon1: 'Life Staff', primaryWeapon2: 'Sword', 
        primaryArmor: 'Light', primaryRole: 'dps', primaryGS: 600, secondaryWeapon1: 'Life Staff', secondaryWeapon2: 'Sword', 
        secondaryArmor: 'Light', secondaryRole: 'dps', secondaryGS: 600, inactive:false},
        {characterName: 'test2', discordUserName: 'discordusername',primaryWeapon1: 'Life Staff', primaryWeapon2: 'Sword', 
        primaryArmor: 'Light', primaryRole: 'dps', primaryGS: 600, secondaryWeapon1: 'Life Staff', secondaryWeapon2: 'Sword', 
        secondaryArmor: 'Light', secondaryRole: 'dps', secondaryGS: 600,inactive:false},
        {characterName: 'test3', discordUserName: 'discordusername',primaryWeapon1: 'Life Staff', primaryWeapon2: 'Sword', 
        primaryArmor: 'Light', primaryRole: 'dps', primaryGS: 600, secondaryWeapon1: 'Life Staff', secondaryWeapon2: 'Sword', 
        secondaryArmor: 'Light', secondaryRole: 'dps', secondaryGS: 600,inactive:false},
        {characterName: 'testinactive', discordUserName: 'discordinactiveuser',primaryWeapon1: 'Life Staff', primaryWeapon2: 'Sword', 
        primaryArmor: 'Light', primaryRole: 'dps', primaryGS: 600, secondaryWeapon1: 'Life Staff', secondaryWeapon2: 'Sword', 
        secondaryArmor: 'Light', secondaryRole: 'dps', secondaryGS: 600,inactive:true}
    ]

    store.dispatch(setRoster(testPlayers))

    beforeEach(() => {
        render(<Provider store={store}><Roster /></Provider>)
        container = renderer.create(<Provider store={store}><Roster /></Provider>)
    })

    test('Headers are displayed',() => {
        expect(screen.getByRole('columnheader',{name: /name/i})).toBeInTheDocument()
        expect(screen.getByRole('columnheader',{name: /discord/i})).toBeInTheDocument()
        expect(screen.getByRole('columnheader',{name: /main/i})).toBeInTheDocument()
        expect(screen.getByRole('columnheader',{name: /alt/i})).toBeInTheDocument()
        expect(screen.getByRole('columnheader',{name: /active/i})).toBeInTheDocument()
        expect(container.toJSON()).toMatchSnapshot()
    })

    test('Players are displayed',() => {
        expect(screen.getAllByRole('row').length).toEqual(4)
        expect(container.toJSON()).toMatchSnapshot()
    })

    test('Players are sorted',() => {
        expect(screen.getAllByRole('row')[1].innerHTML).toContain('test1')
        expect(screen.getAllByRole('row')[2].innerHTML).toContain('test2')
        expect(screen.getAllByRole('row')[3].innerHTML).toContain('test3')
        expect(container.toJSON()).toMatchSnapshot()
    })

    test('Show inactive players',() => {
        fireEvent.click(screen.getByRole('checkbox',{name: 'Show Inactive'}))
        expect(screen.getAllByRole('row').length).toEqual(5)
        expect(container.toJSON()).toMatchSnapshot()
    })

    test('Filter players',() => {
            fireEvent.change(screen.getByLabelText(/filter:/i),{target: {value: 'discordusername'}})
            setTimeout(() => {
                expect(screen.getAllByRole('row').length).toEqual(4)
                expect(container.toJSON()).toMatchSnapshot()
            }, 300);
        
    })

})

