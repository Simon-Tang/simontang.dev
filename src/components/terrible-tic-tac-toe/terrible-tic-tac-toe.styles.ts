import styled from 'styled-components';
import { Input } from 'src/components/atoms/input/input.components';

export const StyledTicTacToeTable = styled.table`
  .cell-wrapper {
    display: flex;
    margin: 0 4px 4px 0;
  }

  .cell-wrapper ${Input} {
    width: 12px;
    margin-right: 4px;
  }
`;
