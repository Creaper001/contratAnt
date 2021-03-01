const BASE_API = 'http://localhost:3333/';

export default () => {
  showUser: async () => {};
  getUsers: async () => {};
  checkToken: async ({token}) => {
    const req = await fetch(`${BASE_API}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token}),
    });
    const json = await req.json();
    return json;
  };
  signIn: async ({email, password}) => {
    const req = await fetch(`${BASE_API}/auth/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
    const json = await req.json();
    return json;
  };
  signUp: async ({
    name,
    email,
    password,
    habilities,
    image,
    uf,
    city,
    description,
    celphone,
  }) => {
    const req = await fetch(`${BASE_API}/auth/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        habilities,
        image,
        uf,
        city,
        description,
        celphone,
      }),
    });
    const json = await req.json();
    return json;
  };
};
