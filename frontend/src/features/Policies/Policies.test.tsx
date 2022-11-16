import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Policies } from './Policies';
import { server } from 'mocks/server';
import { rest } from 'msw';
import { validCustomer } from './Policies.mocks';

describe('Features/Policies', () => {
  test('shows a loading state', () => {
    render(<Policies />);
    screen.getByText(/loading/i);
  });

  test('should correctly display a list of policies', async () => {
    render(<Policies />);
    await waitFor(() =>
      screen.getByText(`${validCustomer.firstName} ${validCustomer.lastName}`)
    );
  });

  test('should correctly handle errors', async () => {
    server.use(
      rest.get('http://localhost:4000/policies', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Policies />);
    await waitFor(() => screen.getByText(/error/i));
  });

  test.only('should search return only expected name', async () => {
    server.use(
      rest.get('http://localhost:4000/policies', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Policies />);
    const input = screen.getByLabelText(/search/i);
    fireEvent.input(input, { target: { value: validCustomer.firstName } });
    await waitFor(() =>
      screen.getByText(new RegExp(validCustomer.firstName), 'i')
    );
    expect(screen.queryAllByText(/Galvan/i)).not.toBeInTheDocument();
  });
});
