import React from 'react';
import './AboutMe.css';
import avatar from '../../../images/avatar.jpeg';

function AboutMe() {
  return (
    <section className="profile">
      <div className="profile__container">
        <div className="profile__header">Студент</div>
        <div className="profile__info">
          <h2 className="profile__title">Ирина</h2>
          <h3 className="profile__subtitle">Фронтенд-разработчик, 27 лет</h3>
          <p className="profile__description">
            Живу в Екатеринбурге, заканчиваю курс по веб-разработке от Яндекс.Практикума,
            участвую в проекте по созданию сайта для фестиваля драматургии Любимовка. В свободное
            время изучаю масляную живопись, люблю посмотреть хорошее кино.
          </p>
          <div className="profile__contacts">
            <a className="profile__contact" href="https://www.facebook.com/profile.php?id=100006194614348" target="_blank" rel="noreferrer">Facebook</a>
            <a className="profile__contact" href="https://github.com/in-the-garden" target="_blank" rel="noreferrer">Github</a>
          </div>
          <img className="profile__avatar" src={avatar} alt="Фотография студента" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;