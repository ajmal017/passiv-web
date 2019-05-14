import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '../../styled/Button';
import { initialLoad } from '../../actions';
import { postData } from '../../api';
import { InputNonFormik } from '../../styled/Form';
import { selectCanCreatePortfolioGroup } from '../../selectors/subscription';
import { AppState } from '../../store';

type Props = {
  reloadAllState: any;
  canCreatePortfolioGroup: any;
};

const AddPortfolioGroup = ({
  reloadAllState,
  canCreatePortfolioGroup,
}: Props) => {
  const [adding, setAdding] = useState(false);
  const [groupName, setGroupName] = useState('');

  const addGroup = () => {
    postData('/api/v1/portfolioGroups', { name: groupName }).then(() =>
      reloadAllState(),
    );
  };
  return (
    <React.Fragment>
      {!adding ? (
        <Button onClick={() => setAdding(true)}>Add Portfolio Group</Button>
      ) : !canCreatePortfolioGroup ? (
        <span>
          <Button onClick={() => setAdding(false)}>Cancel</Button>
          <React.Fragment>
            Upgrade your create a portfolio group!
          </React.Fragment>
        </span>
      ) : (
        <React.Fragment>
          <InputNonFormik
            type="text"
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
          />
          <Button
            onClick={() => {
              addGroup();
              setAdding(false);
            }}
          >
            Add
          </Button>
          <Button onClick={() => setAdding(false)}>Cancel</Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const select = (state: AppState) => ({
  canCreatePortfolioGroup: selectCanCreatePortfolioGroup(state),
});

const actions = {
  reloadAllState: initialLoad,
};

export default connect(
  select,
  actions,
)(AddPortfolioGroup);