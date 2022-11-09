import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import ContentBody from '../../components/content-body'
import { Provider } from 'react-redux'
import store from '../../store'
import { changeTab } from '../../reducers/menu-slice'
import renderer from 'react-test-renderer'
import { act } from 'react-dom/test-utils'

jest.mock('../../components/edit-character/edit-character', () => () => {  
        return <div data-testid="edit-character" />
    }
)

jest.mock('../../components/crafters', (): any => (): any => {  
        return <div data-testid="crafters" />
    }
)

jest.mock('../../components/roster/roster', () => () => {  
        return <div data-testid="roster" />
    }
)

describe('ContentBody',() => {
    let container: renderer.ReactTestRenderer

    const setup = () => {
        render(<Provider store={store}><ContentBody /></Provider>)
        container = renderer.create(<Provider store={store}><ContentBody /></Provider>)
    }

    test('editCharacter is rendered', () => {
        setup()
        act(() => {
            store.dispatch(changeTab('editCharacter'))
        })
        expect(screen.getByTestId('edit-character')).toBeInTheDocument()
        expect(container.toJSON()).toMatchSnapshot()
    })
    
    test('crafters is rendered', () => {
        setup()
        act(() => {
            store.dispatch(changeTab('crafters'))
        })
        expect(screen.getByTestId('crafters')).toBeInTheDocument()
        expect(container.toJSON()).toMatchSnapshot()
    })
    
    test('roster is rendered', () => {
        setup()
        act(() => {
            store.dispatch(changeTab(''))
        })
        expect(screen.getByTestId('roster')).toBeInTheDocument()
        expect(container.toJSON()).toMatchSnapshot()
    })

})
