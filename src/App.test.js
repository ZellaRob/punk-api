import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App />);
});

test('Test random beer search', () => {
  render(<App />);
  const button = screen.getByText(/Random Beer/i);
  expect(button).toBeInTheDocument();
});

test('Test multiple beer search', () => {
  render(<App />);
  const button = screen.getByText(/Search/i);
  expect(button).toBeInTheDocument();
});
