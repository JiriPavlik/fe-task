import { createGlobalStyle } from 'styled-components';
import { sanitizeReset } from '../sanitizeReset';
import { sanitizeForms } from '../sanitizeForms';

export const SanitizeResetStyle = createGlobalStyle`
  ${sanitizeReset}
  ${sanitizeForms}
`;

export default SanitizeResetStyle;
