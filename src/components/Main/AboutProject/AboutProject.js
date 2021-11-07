import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="info">
      <div className="info_container">
        <div className="info__header">О проекте</div>
        <div className="info_content">
          <article className="info__item">
            <h2 className="info__title">Дипломный проект включал 5 этапов</h2>
            <p className="info__paragraph">
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </article>
          <article className="info__item">
            <h2 className="info__title">На выполнение диплома ушло 5 недель</h2>
            <p className="info__paragraph">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </article>
        </div>
        <div className="info__timetable">
          <div className="info__scale">
            <div className="info__step info__step_first">1 неделя</div>
            <div className="info__step info__step_second">4 недели</div>
          </div>
          <div className="info__comments">
            <p className="info__comment info__comment_first">Back-end</p>
            <p className="info__comment info__comment_second">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;