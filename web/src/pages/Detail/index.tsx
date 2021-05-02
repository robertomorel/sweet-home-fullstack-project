import React, { useEffect, useMemo, useState } from 'react';
import 'react-day-picker/lib/style.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectProperty } from '../../store';
import { CardsProps, PropertyProps, WidgetsProps } from '../../types';
import { numberFormat, priceFormatter } from '../../utils/format';
import { MainHeader, Spinner, SpinnerWrapper, Widget, Card } from '../../components';

import {
  Container,
  Content,
} from './styles';

export const Detail: React.FC = () => {
  const { loading: loadingState, property, error } = useSelector(selectProperty);
  const { propertyId } = useParams<{ propertyId: string }>()
  const [chosenProperty, setChosenProperty] = useState<PropertyProps>({} as PropertyProps);

  useEffect(() => {
    if(property && propertyId) {
      const foundProperty = property.find(prop => prop.id === propertyId)
      if (foundProperty){
        setChosenProperty({...foundProperty});
      }
    }
  }, [propertyId])

  return (
    <Container data-testid="detail_page">
      <MainHeader hideMenu={true}/>

      {loadingState ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <Content>
          Teste
        </Content>
      )}
    </Container>
  );
};
