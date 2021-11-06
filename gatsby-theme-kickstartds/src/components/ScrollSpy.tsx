import React from 'react';
import { FunctionComponent } from 'react';

import { ReadingProgress } from "@makotot/ghostui";

export const ScrollSpy: FunctionComponent<any> = () =>
  <ReadingProgress>
    {({ value }) => <ProgressBar fgcolor="#ecff00" bgcolor="#06566a" completed={value} />}
  </ReadingProgress>;

export const ProgressBar: FunctionComponent<any> = ({
  fgcolor, bgcolor, completed
}) => {
  const containerStyles = {
    height: 10,
    width: '100%',
    backgroundColor: bgcolor,
    position: 'fixed' as 'fixed',
    zIndex: 100,
    bottom: 0,
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: fgcolor,
    transition: 'width .5s ease-in-out',
  }

  const labelStyles = {
    padding: 5,
    color: bgcolor,
    fontWeight: 700,
    top: -40,
    left: 10,
    position: 'relative' as 'relative',
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
      <span style={labelStyles}>{`${completed}%`}</span>
    </div>
  );
};