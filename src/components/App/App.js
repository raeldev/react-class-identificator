import React, { useState } from 'react';
import './App.css';
import Helmet from 'react-helmet';
import {
  Button,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Tooltip,
  TextField,
} from '@material-ui/core';

function App() {
  const [filterdClasses, setFiltredClasses] = useState([]);
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

  const anotherDisciplineNames = [
    'art',
    'physics',
    'science',
    'geography',
    'chemistry',
  ];

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

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
    let newFiltredClassesList = [];
    newClassList.forEach((c, index) => {
      let leftNumberOfMinutes = Math.floor(c.startMinute / 10);
      if (leftNumberOfMinutes % 2 !== 0) {
        newClassList[index].border = true;
        newFiltredClassesList.push(c);
      }
    });

    setClasses(newClassList);
    setFiltredClasses(newFiltredClassesList);
    return newFiltredClassesList;
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
            </CardContent>
          </Card>
        </Box>
      );
    });
  };

  const renderJsonClasses = () => {
    let listToShow = filterdClasses.map((fc) => {
      delete fc.border;
      return fc;
    });

    if (!listToShow?.length) return '';

    return JSON.stringify(listToShow, null, 4);
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
          <TextField
            multiline
            fullWidth
            variant="filled"
            value={renderJsonClasses()}
          />
        </Card>
      </header>
    </div>
  );
}

export default App;
