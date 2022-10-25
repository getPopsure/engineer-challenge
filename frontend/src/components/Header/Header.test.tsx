import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Components/Header', () => {
  describe('Normal state', () => {
    it('Should correctly display a title', () => {
      const title = 'Policies';
      render(<Header>{title}</Header>);
      screen.getByRole('heading', { name: title });
    });
  });
});
