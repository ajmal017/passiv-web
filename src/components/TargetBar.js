import React from 'react';
import Downshift from 'downshift';

export const TargetBar = (props) => {
  if (!props.positions) {
    return 'Loading';
  }
  if (!props.symbol) {
    const items = [
      {value: 'apple'},
      {value: 'pear'},
      {value: 'orange'},
      {value: 'grape'},
      {value: 'banana'},
    ];

    return (
      <div className="flex w-full">
      <div className="w-1/6">
        <Downshift
          onChange={selection => alert(`You selected ${selection.value}`)}
          itemToString={item => (item ? item.value : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
          }) => (
            <div>
              <input {...getInputProps()} />
              <ul {...getMenuProps()}>
                {isOpen
                  ? items
                      .filter(item => !inputValue || item.value.includes(inputValue))
                      .map((item, index) => (
                        <li
                          {...getItemProps({
                            key: item.value,
                            index,
                            item,
                            style: {
                              backgroundColor:
                                highlightedIndex === index ? 'lightgray' : 'white',
                              fontWeight: selectedItem === item ? 'bold' : 'normal',
                            },
                          })}
                        >
                          {item.value}
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          )}
        </Downshift>
      </div>
    </div>
    );
  }
  const actualPercentage = props.positions.find(position => position.symbol.symbol === props.symbol).percentage || 25;
  let deltaClassName = "w-1/3 text-blue";
  let progressClassName = "bg-blue text-xs leading-none py-1 text-center text-white";
  if ((actualPercentage - props.percentage) < 0) {
    deltaClassName = "w-1/3 text-red";
    progressClassName = "bg-red text-xs leading-none py-1 text-center text-white";
  }
  return (
    <div className="flex w-full">
      <div className="w-1/6">
        {props.symbol}
      </div>
      <div className="w-1/2">
        <div className="shadow w-full bg-grey-light">
          <div className={progressClassName} style={{ width: `${props.percentage}%` }}>
            {props.percentage}%
          </div>
        </div>
      </div>
      <div className="flex w-1/3">
        <div className="w-1/3">
          {props.children}%
        </div>
        <div className="w-1/3">
          {new Intl.NumberFormat('en-CA', { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(actualPercentage)}%
        </div>
        <div className={deltaClassName}>
          {new Intl.NumberFormat('en-CA', { maximumFractionDigits: 1 }).format(actualPercentage - props.percentage)}%
        </div>
      </div>
    </div>
  );
}

const select = state => ({
  symbols: select
});

export default TargetBar;
