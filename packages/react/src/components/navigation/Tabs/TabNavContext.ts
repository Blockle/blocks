'use client';

import { createContext } from 'react';

// Tells a Tab it is inside a TabNav, so it renders a link
export const TabNavContext = createContext(false);
