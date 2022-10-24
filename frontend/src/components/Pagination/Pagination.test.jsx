import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import { Pagination } from './index'
import userEvent from '@testing-library/user-event'

describe('Pagination', () => {
  const mockFunction =  jest.fn()

  beforeEach(() => {
    render(<Pagination pages={2} currentPage={1} setCurrentPage={mockFunction} />)
  })

  it('Render the Pagination Component', async () => {
    const prevBtn = screen.getByText(/Prev/i)
    const nextBtn = screen.getByText(/Next/i)

    expect(prevBtn).toBeVisible()
    expect(nextBtn).toBeVisible()
  })

  it('Triggers a pagination change', async () => {
    const nextBtn = screen.getByText(/Next/i)

    userEvent.click(nextBtn)
    expect(mockFunction).toHaveBeenCalled()
  })
})