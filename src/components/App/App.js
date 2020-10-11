import React, { useState } from 'react';
import './App.css';
import Helmet from 'react-helmet';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Tooltip,
  Box,
} from '@material-ui/core';

function App() {
  const [classes, setClasses] = useState([
    {
      discipline: 'math',
      startHour: 11,
      startMinute: 0,
    },
    {
      discipline: 'biology',
      startHour: 12,
      startMinute: 15,
    },
  ]);

  let classesWithfirstDigit;

  const anotherDisciplineNames = [
    'art',
    'physics',
    'science',
    'geography',
    'chemistry',
  ];

  const generateRandomClasses = () => {
    let newClassList = [...classes];
    anotherDisciplineNames.forEach((adn) => {
      let lastIndex = newClassList.findIndex((c) => c?.discipline === adn);
      if (lastIndex !== -1) {
        newClassList[lastIndex] = {
          discipline: adn,
          startHour: getRandomInt(7, 17),
          startMinute: getRandomInt(0, 60),
        };
      } else {
        newClassList.push({
          discipline: adn,
          startHour: getRandomInt(7, 17),
          startMinute: getRandomInt(0, 60),
        });
      }
    });
    setClasses(newClassList);
  };

  // Início Resposta do desafio
  // Escreva uma função capaz de retornar, a partir de uma lista de aulas, aquelas que se iniciam em minuto ímpar

  const identifyClasses = (classList) => {
    if (!classList) return [];

    let newClassList = [...classList];
    newClassList.forEach((c, index) => {
      let leftNumberOfMinutes = Math.floor(c.startMinute / 10);
      if (leftNumberOfMinutes % 2 !== 0) {
        newClassList[index].border = true;
      }
    });

    setClasses(newClassList);
    return classList;
  };

  // FIM Resposta do desafio

  const renderDisciplinesList = () => {
    return classes.map((c, index) => {
      return (
        <Box
          key={index}
          className="card"
          borderColor={c.border ? 'primary.main' : ''}
          borderRadius={5}
          border={c.border ? 2 : 0}
        >
          <Card>
            <CardHeader title={c.discipline.toUpperCase()}></CardHeader>
            <CardContent>
              <span className="start-time">
                Início:
                {` ${('00' + c.startHour).slice(-2)}:${(
                  '00' + c.startMinute
                ).slice(-2)}`}
              </span>
              {/* {JSON.stringify(c)
              .split(',')
              .map((codeFragment) => {
                return (
                  <code>
                  {codeFragment + ','}
                  <br />
                  </code>
                  );
                })} */}
            </CardContent>
          </Card>
        </Box>
      );
    });
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  return (
    <div className="App">
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Helmet>
      <header className="App-header">
        <Card className="card-principal">
          <CardHeader title="Organizador de Aulas"></CardHeader>
          <CardContent className="content">
            <Typography variant="body2" color="textSecondary" component="p">
              Gere mais algumas aulas
              <br />
              {'Em seguida, filtre as que começam com minutos ímpares.'}
            </Typography>
            {renderDisciplinesList()}
          </CardContent>
          <CardActions className="footer-button">
            <Button variant="contained" onClick={() => generateRandomClasses()}>
              Gerar disciplinas
            </Button>
            <Tooltip title="Identifique as disciplinas que iniciam no minuto impar">
              <Button
                variant="contained"
                color="primary"
                onClick={() => identifyClasses(classes)}
              >
                Identificar
              </Button>
            </Tooltip>
          </CardActions>
        </Card>
      </header>
    </div>
  );
}

export default App;
