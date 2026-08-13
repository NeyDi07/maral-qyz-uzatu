import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScrollSection } from './ScrollSection';

describe('ScrollSection', () => {
  it('renders children inside a named reveal section', () => {
    render(
      <ScrollSection className="custom-shell" ariaLabel="Тест бөлімі">
        <p>Жасырын мәтін</p>
      </ScrollSection>,
    );

    expect(screen.getByRole('region', { name: 'Тест бөлімі' })).toHaveClass('custom-shell');
    expect(screen.getByText('Жасырын мәтін')).toBeInTheDocument();
  });
});
