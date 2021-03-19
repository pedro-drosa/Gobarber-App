import React from 'react';
import {RectButtonProperties} from 'react-native-gesture-handler';

import {Container, Buttontext} from './styles';

interface ButtonProps extends RectButtonProperties{
  children: string;
}

const Button: React.FC<ButtonProps> = ({children, ...rest}) => {
  return (
    <Container {...rest}>
      <Buttontext>{children}</Buttontext>
    </Container>
  )
}

export default Button;
