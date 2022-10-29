import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import ContentBody from '../../components/contentBody'
import { Provider } from 'react-redux'
import store from '../../store'
import { changeTab } from '../../reducers/menuSlice'
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils'

jest.mock("../../components/editCharacter", () => () => {  
        return <mock-editCharacter data-testid="edit-character" />
    }
)

jest.mock("../../components/crafters", () => () => {  
        return <mock-crafters data-testid="crafters" />
    }
)

jest.mock("../../components/roster", () => () => {  
        return <mock-roster data-testid="roster" />
    }
)

describe('ContentBody',() => {
    let container

    beforeEach(() => {
        render(<Provider store={store}><ContentBody /></Provider>)
        container = renderer.create(<Provider store={store}><ContentBody /></Provider>)
    })

    test('editCharacter is rendered', () => {
        act(() => {
            store.dispatch(changeTab('editCharacter'))
        })
        expect(screen.getByTestId('edit-character')).toBeInTheDocument()
        expect(container.toJSON()).toMatchSnapshot()
    })
    
    test('crafters is rendered', () => {
        act(() => {
            store.dispatch(changeTab('crafters'))
        })
        expect(screen.getByTestId('crafters')).toBeInTheDocument()
        expect(container.toJSON()).toMatchSnapshot()
    })
    
    test('roster is rendered', () => {
        act(() => {
            store.dispatch(changeTab(''))
        })
        expect(screen.getByTestId('roster')).toBeInTheDocument()
        expect(container.toJSON()).toMatchSnapshot()
    })

})
