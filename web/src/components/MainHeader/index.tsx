import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Storage } from '../../utils/storage';
import imgProfile from '../../assets/logo.jpeg';

import {
  Header,
  HeaderContent,
  Profile,
} from './styles';

const localStoragePrefix = 'app_sweet_home#';

export const MainHeader: React.FC = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const getUserFromStorage = async () => {
      const storagedUser = await Storage.get(localStoragePrefix+'user');
      if (storagedUser) setUser(storagedUser);
    }

    getUserFromStorage();

    if(!user) {
      axios
        .get('https://api.ipify.org/?format=jsonp?callback=?')
        .then(async response => {
          setUser(response.data);
          await Storage.set(localStoragePrefix+'user', response.data);
        });
      }
  }, []);

  return (
    <Header>
      <HeaderContent>
        <Profile>
          <img src={imgProfile} alt="Profile" />

          <div>
            <span>Wellcome,</span>
            <strong data-testid="user_ip">{user}</strong>
          </div>
        </Profile>
      </HeaderContent>
    </Header>
  );
}

