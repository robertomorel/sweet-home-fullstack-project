import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { CardsProps } from '../../types';

import { Card as CompCard } from './styles';

export const Card: React.FC<CardsProps> = ({
  propId,
  imageStr,
  header,
  price,
  beds,
  baths,
  address,
  zipCode,
  available,
  }) => {
  const history = useHistory()

  return (
    <CompCard>
      <a key="teste" onClick={() => history.push(`/detail/${propId}`)}>
        <div>
          <img src={require(`../../assets/${imageStr}`)} alt="Casa" />
            <div>
              <strong>{header}</strong>
              <span>{`Price: ${price}`}</span>

              <p>{`Beds: ${beds}`}</p>
              <p>{`Baths: ${baths}`}</p>
              <p>{`Adress: ${address}`}</p>
              <p>{`ZIP Code: ${zipCode}`}</p>
              <p>{`Available: ${available}`}</p>
            </div>

          <FiChevronRight size={20} />
        </div>
      </a>
    </CompCard>
  );
}
