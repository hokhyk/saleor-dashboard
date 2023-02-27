import { createSvgIcon, SvgIconProps } from '@material-ui/core';
import React from 'react';

const Attributes = createSvgIcon(
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M29 3C29.5523 3 30 3.44772 30 4V8C30 8.55229 29.5523 9 29 9C28.4477 9 28 8.55229 28 8V7L12 7V8C12 8.55229 11.5523 9 11 9C10.4477 9 10 8.55229 10 8V4C10 3.44772 10.4477 3 11 3C11.5523 3 12 3.44772 12 4V5L28 5V4C28 3.44772 28.4477 3 29 3ZM2 12C2 11.4477 2.44772 11 3 11H7C7.55228 11 8 11.4477 8 12C8 12.5523 7.55228 13 7 13H6V27H7C7.55228 27 8 27.4477 8 28C8 28.5523 7.55228 29 7 29H3C2.44772 29 2 28.5523 2 28C2 27.4477 2.44772 27 3 27H4V13H3C2.44772 13 2 12.5523 2 12ZM14.2997 11C13.1142 11 12.0398 11.6982 11.5583 12.7816L10.0862 16.0939C10.0294 16.2217 10 16.3601 10 16.5V26C10 27.6569 11.3431 29 13 29H27C28.6569 29 30 27.6569 30 26V16.5C30 16.3601 29.9706 16.2217 29.9138 16.0939L28.4417 12.7816C27.9602 11.6982 26.8858 11 25.7003 11H14.2997ZM13.3859 13.5939C13.5464 13.2327 13.9046 13 14.2997 13H25.7003C26.0954 13 26.4536 13.2327 26.6141 13.5939L27.4612 15.5H12.5388L13.3859 13.5939ZM23.5 17.5H28V26C28 26.5523 27.5523 27 27 27H13C12.4477 27 12 26.5523 12 26V17.5H16.5V23C16.5 23.3603 16.6938 23.6927 17.0073 23.8702C17.3208 24.0477 17.7056 24.0429 18.0145 23.8575L20 22.6662L21.9855 23.8575C22.2944 24.0429 22.6792 24.0477 22.9927 23.8702C23.3062 23.6927 23.5 23.3603 23.5 23V17.5ZM18.5 21.2338V17.5H21.5V21.2338L20.5145 20.6425C20.1978 20.4525 19.8022 20.4525 19.4855 20.6425L18.5 21.2338Z"
    fill="currentColor"
  />,
  'Attributes',
);

export default (props: SvgIconProps) => <Attributes {...props} viewBox="0 0 32 32" />;
