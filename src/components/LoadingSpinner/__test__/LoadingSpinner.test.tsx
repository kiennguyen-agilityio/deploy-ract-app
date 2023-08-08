import { render } from '@testing-library/react';
import LoadingSpinner from '@/components/LoadingSpinner/index';

describe('LoadingSpinner', () => {
  it('should render the loading spinner with the correct class and data-testid', () => {
    const { getByTestId } = render(<LoadingSpinner />);
    const spinnerContainer = getByTestId('loading-spinner');

    expect(spinnerContainer).toBeInTheDocument();
    expect(spinnerContainer).toHaveClass('spinner-container');

    const loadingSpinner = spinnerContainer.firstChild;
    expect(loadingSpinner).toHaveClass('loading-spinner');
  });
});
