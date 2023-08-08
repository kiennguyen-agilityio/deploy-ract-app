import { RenderResult, act, cleanup, fireEvent, render, screen } from '@testing-library/react';

// Components
import Input, { InputProps } from '../Input';

describe('Testing Input component', () => {
  const handleChange = jest.fn();

  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    name: 'name',
    placeholder: 'Enter topic...',
  } as InputProps;

  const setup = (overrideProps?: Partial<InputProps>): RenderResult => {
    const props: InputProps = {
      ...defaultProps,
      ...overrideProps,
    };

    return render(<Input {...props} onChange={handleChange} />);
  };

  test('Should render correctly Input component', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('Should call onChange event when change value input', () => {
    render(<Input {...defaultProps} onChange={handleChange} />);

    const input = screen.getByPlaceholderText<HTMLInputElement>('Enter topic...');

    act(() => {
      fireEvent.change(input, {
        target: { value: 'English' },
      });
    });

    expect(handleChange).toBeCalled();
    expect(input).toHaveValue('English');
  });

  it('Should render component with title correctly', () => {
    const { getByText } = render(
      <Input {...defaultProps} title="English" onChange={handleChange} />
    );

    const text = getByText('English');

    expect(text).toBeInTheDocument();
  });
});
