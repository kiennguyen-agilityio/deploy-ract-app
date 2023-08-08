import { render, screen } from '@testing-library/react';

// Components
import TableRow from '../TableRow';

describe('Testing Table row component', () => {
  const children = (
    <>
      <td>English</td>
      <td>Indian</td>
    </>
  );

  it('Should renders children correctly', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <TableRow>{children}</TableRow>
        </tbody>
      </table>
    );

    expect(getByText('English')).toBeInTheDocument();
    expect(getByText('Indian')).toBeInTheDocument();
  });

  it('Should renders table row with header class', () => {
    render(
      <table>
        <tbody data-testid="table-body">
          <TableRow classTableRow="header">{children}</TableRow>
        </tbody>
      </table>
    );
    const tableBody = screen.getByTestId('table-body');

    expect(tableBody.firstChild).toHaveClass('table-row');
  });
});
