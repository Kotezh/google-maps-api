import React, { FC } from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Main } from "../Main/Main";

const App: FC = () => {
  return (
    <div className='app'>
      <header className='app__header'>
        <a
          className='app__link'
          href='https://github.com/Kotezh/funbox.git'
          target='_blank'
          rel='noopener noreferrer'
        >
          Редактор маршрутов
        </a>
      </header>
      <Main />
      <footer className='app__footer'>
        <a
          className='app__link'
          href='https://github.com/Kotezh'
          target='_blank'
          rel='noopener noreferrer'
        >
          &copy; 2022 Nadia Kotegova
        </a>
      </footer>
    </div>
  );
};

export default App;
