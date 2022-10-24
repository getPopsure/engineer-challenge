import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import { AppContext } from "../../context/apiContext";
import {Table} from "./Table";
import { mockState } from '../../testHelpers'
import userEvent from '@testing-library/user-event'

describe('Table', () => {
  const mockFunction =  jest.fn()
  const nameFilterMockFn =  jest.fn()

  beforeEach(() => {
    render(<AppContext.Provider value={{
      state: mockState,
      addFilter: mockFunction,
      handleNameFilter: nameFilterMockFn
    }}>
      <Table />
    </AppContext.Provider>)
  })
  
  it('Renders the the data correctly', async () => {
    expect(screen.getAllByRole('row')).toHaveLength(4)
  })

  it('Renders the Name Filter', async () => {
    const nameFilterInput = screen.getByRole('textbox')
    expect(nameFilterInput).toBeVisible()

    userEvent.type(nameFilterInput, 'Muller')
    expect(nameFilterMockFn).toHaveBeenCalled()
  })

  it('Renders the Dropdowns', async () => {
    expect(screen.getAllByRole('option')).toHaveLength(9)
  })

  it('Fires the addFilter function when dropdown is changed', async () => {
    const providerFilter = screen.getByRole('combobox', {
      name: /Provider/i
    })

    expect(providerFilter).toHaveValue('BARMER')

    userEvent.selectOptions(providerFilter, 'AOK')
    expect(mockFunction).toHaveBeenCalled()
  })
})