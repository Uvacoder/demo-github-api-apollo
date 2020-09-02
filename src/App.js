import React from 'react';
// import { gql, useQuery } from '@apollo/client';
import UserSchema from './UserSchema';

const handleSubmit = (event) => {
  event.preventDefault();

  console.log('you submitted the form!');
};

const App = () => {
  return (
    <>
      <h1>GitHub User Search</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user-search">
          Username
          <input type="text" name="user-search" id="user-search" />
        </label>
        <button type="submit">Search</button>
      </form>
      <hr />
      <UserSchema />
    </>
  );
};

export default App;
