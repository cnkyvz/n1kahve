import React from 'react';

const LoginPage = () => {
  return (
    <div className="container">
      <h1>Giriş Yap</h1>
      <p>Lütfen giriş yapmak için kullanıcı adı ve şifrenizi girin.</p>
      <form>
        <input type="text" placeholder="Kullanıcı Adı" /><br />
        <input type="password" placeholder="Şifre" /><br />
        <button type="submit">Giriş</button>
      </form>
    </div>
  );
};

export default LoginPage;
