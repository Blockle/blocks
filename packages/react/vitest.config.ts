import { defineProject, mergeConfig } from 'vitest/config';
import { sharedConfig } from '../../vitest.shared.config';

export default mergeConfig(sharedConfig, defineProject({}));
