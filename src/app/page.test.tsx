import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from './page';

describe('Home invitation page', () => {
  it('renders the full static invitation skeleton', () => {
    render(<Home />);

    expect(screen.getAllByRole('heading', { name: 'Марал' })[0]).toBeInTheDocument();
    expect(screen.getAllByText('Қыз ұзату')[0]).toBeInTheDocument();
    expect(screen.getByText('04.10.26')).toBeInTheDocument();
    expect(screen.getByText(/Құрметті ағайын-туыс/)).toBeInTheDocument();
    expect(screen.getByText('қазан, жексенбі')).toBeInTheDocument();
    expect(screen.getByText('17:00')).toBeInTheDocument();
    expect(screen.getByText('Қазан 2026')).toBeInTheDocument();
    expect(screen.getByText('"Aisha"')).toBeInTheDocument();
    expect(screen.getByText('мейрамханасы')).toBeInTheDocument();
    expect(screen.getByText('Өскемен қаласы, Виноградов көшесі, 33')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Картаға өту/ })).toHaveAttribute(
      'href',
      'https://2gis.kz/ustkam/geo/70000001021695272/82.592973,49.966792',
    );
    expect(screen.getByText('Тойға дейін')).toBeInTheDocument();
    expect(screen.getByText('Дресс-код')).toBeInTheDocument();
    expect(screen.getByText('Сауалнама')).toBeInTheDocument();
    expect(screen.queryByLabelText('1-қонақтың есімі')).not.toBeInTheDocument();
    expect(screen.getByText('Иә, міндетті түрде келемін')).toBeInTheDocument();
    expect(screen.getByText('Өкінішке орай, келе алмаймын')).toBeInTheDocument();
    expect(screen.getByText(/Дәурен - Римма/)).toBeInTheDocument();
  });
});
