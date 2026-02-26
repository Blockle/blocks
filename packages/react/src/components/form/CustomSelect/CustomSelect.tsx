import type * as React from 'react';

import * as styles from './customSelect.css.js';

export const CustomSelect: React.FC = () => {
  return (
    <select className={styles.select}>
      <button>
        <selectedcontent></selectedcontent>
      </button>

      <div>
        <option value="urgent">
          <svg role="presentation" viewBox="0 0 24 24">
            <path d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span>Urgent</span>
        </option>
        <option value="high">
          <svg role="presentation" viewBox="0 0 24 24">
            <path d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>
          <span>High</span>
        </option>
        <option value="medium" selected>
          <svg role="presentation" viewBox="0 0 24 24">
            <path d="M5 12h14" />
          </svg>
          <span>Medium</span>
        </option>
      </div>
    </select>
  );
};
