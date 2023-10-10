import { createContext } from 'react';
import { Theme } from '../../lib/theme/makeTheme';

export const BlocksProviderContext = createContext<Theme | null>(null);
