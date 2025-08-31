import { render, screen } from '@testing-library/react';
import FileUpload from '../ReusableComponents/FileUpload';

test('renders the file upload label', () => {
  render(<FileUpload label="Upload PDF" onFileChange={() => {}} />);
  expect(screen.getByText('Upload PDF')).toBeInTheDocument();
});
