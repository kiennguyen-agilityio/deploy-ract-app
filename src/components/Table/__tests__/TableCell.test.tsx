import { render } from '@testing-library/react';
import TableCell from '../TableCell';

describe('TableCell test', () => {
  it('Should renders children correctly', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <tr>
            <TableCell>Test</TableCell>
          </tr>
        </tbody>
      </table>
    );
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('renders the children prop', () => {
    const children = <div>Child content</div>;

    const { getByText } = render(
      <table>
        <tbody>
          <tr>
            <TableCell>{children}</TableCell>
          </tr>
        </tbody>
      </table>
    );

    expect(getByText('Child content')).toBeInTheDocument();
  });

  it('renders both the value and children props', () => {
    // Arrange
    const value = 'Cell value';
    const children = <div>Child content</div>;

    const { getByText } = render(
      <table>
        <tbody>
          <tr>
            <TableCell value={value}>{children}</TableCell>
          </tr>
        </tbody>
      </table>
    );

    expect(getByText('Cell value')).toBeInTheDocument();
    expect(getByText('Child content')).toBeInTheDocument();
  });
});
