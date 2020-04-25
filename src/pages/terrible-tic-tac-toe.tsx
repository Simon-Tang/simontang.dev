import Helmet from 'react-helmet';
import * as React from 'react';
import { TerribleTicTacToe } from 'src/components/terrible-tic-tac-toe/terrible-tic-tac-toe.components';
import { Cell } from 'src/components/terrible-tic-tac-toe/terrible-tic-tac-toe.types';
import { Program } from 'src/components/desktop/program/program.components';
import { BasePageProps, Programs } from 'src/layouts/page-content';

export default (props: BasePageProps) => {
  const [isTwitchChatActive, setTwitchChatActive] = React.useState(false);
  const setTwitchChatActiveWithMove = (winner: Cell) =>
    setTwitchChatActive(true);
  return (
    <>
      <Helmet>
        <title>Terrible Tic-Tac-Toe</title>
      </Helmet>
      <Programs columns={2}>
        <Program title='Terrible Tic-Tac-Toe'>
          <TerribleTicTacToe
            setTwitchChatActive={setTwitchChatActiveWithMove}
          />
        </Program>
        <Program title='Chat' nopadding={true}>
          <img
            style={{ opacity: isTwitchChatActive ? 1 : 0 }}
            alt={
              isTwitchChatActive
                ? 'Twitch chat with a flood of messages'
                : 'Twitch chat with no messages'
            }
            src='https://media.tenor.com/images/e6392a13a450dcac83df81403b1c6d5c/tenor.gif'
          ></img>
        </Program>
      </Programs>
    </>
  );
};
