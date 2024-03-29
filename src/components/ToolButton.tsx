import CircularProgress from '@material-ui/core/CircularProgress';
import { grey } from '@material-ui/core/colors';
import React from 'react';
import { Tool } from '../models';
import styles from './ToolButton.module.css';

type Props = {
  tool: Tool;
  disabled?: boolean;
  onClick: () => void;
  active?: boolean;
};

const ToolButton: React.FC<Props> = ({
  tool,
  onClick,
  disabled,
  active,
}: Props) => (
  <button
    disabled={disabled}
    className={styles.button}
    onClick={onClick}
    style={{ backgroundColor: active ? '#008ffe' : '#fcfcfc' }}
  >
    {tool.id === 'location' && disabled ? (
      <CircularProgress size={24} />
    ) : (
      <tool.icon style={{ color: active ? '#fff' : grey[900] }} />
    )}
  </button>
);

export default ToolButton;
