import React, { useState, useEffect } from 'react';

const FormDados = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submited, setSubmited] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      setSubmited(data)
      }
      fetchData();
     
  }, [])


  const handleSubmit = (e) => {
    e.prevent.Default()
    submited(true)    

  };

  return (
    <div className='formCad'>
    <h1>Cadastro</h1>
    <h1>Alguma coisa</h1>
    <h1>Outra coisa</h1>
    <h1>outra coisa</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          E-mail:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Senha:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button>Inserir</button>
      </form>
    </div>
  );
};

export default FormDados;
