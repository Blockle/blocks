import { HTMLProps } from 'react';
import { Atoms } from '../css/atoms';

export type HTMLElementProps<E extends Element> = Omit<HTMLProps<E>, keyof Atoms | 'as' | 'ref'>;
