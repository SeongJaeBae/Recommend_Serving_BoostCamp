import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { renderMatches, useNavigate } from 'react-router-dom';



function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [0, 1, 2];

let initialCounters = [
  0, 0, 0
];
const theme = createTheme();

export default function Album() {
  const navigate = useNavigate();
 
  const restaurants1 = JSON.parse(window.localStorage.getItem("restaurants1")); 
  const restaurants2 = JSON.parse(window.localStorage.getItem("restaurants2")); 
  const restaurants3 = JSON.parse(window.localStorage.getItem("restaurants3")); 
  const restaurants = [restaurants1,restaurants2,restaurants3]
  // let idx = [0,0,0]
  let [idx, setIdx] = React.useState(initialCounters);
 
  console.log(restaurants)
  console.log(idx)
  console.log(idx[0])
  
  function handleIncrementClick(index) {
    const nextIdx = idx.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return c + 1;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setIdx(nextIdx);
  }
  const handleClick1 = (event) => {
      navigate('/signin');
    };

  const handleClick4 = (event) => {
    // 일단 유저에서 열리게 
    var user = window.localStorage.getItem('link').substring(29,53)
    const card = event.target.id
    const i = restaurants[card]['id']
    const url = "https://m.place.naver.com/restaurant/"+i+"/review/visitor"
    window.open(url, "_blank", "noopener, noreferrer");
    // window.open(url, "_blank", "noopener, noreferrer");
  };
  
  const handleClick5 = (event) => {
    // 결과 리셋하는 코드 쓱쓱
    const card = event.target.id

    if (card ==0) {
      idx = [idx[0]+1,idx[1],idx[2]]
    }
    else if (card ==1) {
      idx = [idx[0],idx[1]+1,idx[2]]
    }
    else if (card ==2) {
      idx = [idx[0],idx[1],idx[2]+1]
    }
    console.log(idx)
    console.log(card)
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            네이버 맛집 추천
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              추천 목록
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {window.localStorage.getItem('link').substring(29,53)}님의 추천 목록
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Button variant="contained">더보기</Button> */}
              <Button variant="outlined" onClick={handleClick1}>
                처음 화면으로
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}

          <Grid container spacing={4}>
          {/* cards의 card 가 하나씩 들어가는 반복문 */}
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >

                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={restaurants[card][idx[card]]["img_url"]}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      이름 : {restaurants[card][idx[card]]["id"]}
                    </Typography>
                    <Typography>
                      업종 : {restaurants[card][idx[card]]["tag"]}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button id = {card} type="submit" size="small" onClick= {handleClick4}>식당 링크 열기</Button>
                    <Button id = {card} type="submit" size="small" onClick= {() => {
                        handleIncrementClick(card);
                      }}>다른 결과 보기</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}

    </ThemeProvider>
  );
}
