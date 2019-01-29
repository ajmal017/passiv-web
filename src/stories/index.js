import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '../styled/Button';
import { DisabledButton } from '../styled/DisabledButton';
import { LogoutButton } from '../styled/LogoutButton';
import { AccountTargets } from '../components/AccountTargets';
import GlobalStyle from '../styled/global';

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>);

storiesOf('Button', module)
  .add('log out', () => <LogoutButton onClick={action('clicked')}>Logout</LogoutButton>);

  storiesOf('Button', module)
    .add('disabled', () => <DisabledButton onClick={action('clicked')}>Submit</DisabledButton>);

storiesOf('AccountTargets', module)
  .add('Loading', () => <AccountTargets />)
  .add('Simple', () => (
    <React.Fragment>
      <GlobalStyle />
      <AccountTargets
        groupId={1}
        target={[{
          id: 1,
          actualPercentage: 10,
          percent: 15,
          excluded: false,
          symbol: 1,
          fullSymbol: {
            id: 1,
            symbol: 'PASS'
          }
        }]}
      />
    </React.Fragment>
  ));
