import React from 'react';
import { FunctionComponent } from 'react';

import { ReadingProgress } from "@makotot/ghostui";

export const ScrollSpy: FunctionComponent<any> = ({
  readingTime
}) =>
  <ReadingProgress>
    {({ value }) => <ProgressBar fgcolor="#ecff00" bgcolor="#06566a" completed={value} readingTime={readingTime} />}
  </ReadingProgress>;

export const ProgressBar: FunctionComponent<any> = ({
  fgcolor, bgcolor, completed, readingTime
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

  const labelLeftStyles = {
    padding: 5,
    color: bgcolor,
    fontWeight: 700,
    top: -40,
    left: 10,
    position: 'relative' as 'relative',
  }

  const labelRightStyles = {
    padding: 5,
    color: bgcolor,
    fontWeight: 700,
    top: -40,
    right: 10,
    position: 'absolute' as 'absolute',
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
      <span style={labelLeftStyles}>{`${completed}%`}</span>
      <span style={labelRightStyles}>{`${Math.ceil(readingTime-completed*readingTime/100)}min`}</span>
    </div>
  );
};