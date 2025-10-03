import { defineProject, mergeConfig } from 'vitest/config';
import { sharedConfig } from '../../vitest.shared.config.js';

export default mergeConfig(sharedConfig, defineProject({}));
