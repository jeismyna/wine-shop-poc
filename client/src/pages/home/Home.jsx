import React from "react";
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { Col } from "react-bootstrap";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'fixed',
    height: '100vh',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style

    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundRepeat: 'no-repeat',
    backgroundOrigin: "padding-box",
    backgroundSize: 'cover',
    backgroundPosition: 'right 34%',
    [theme.breakpoints.down('xs')]: {
      backgroundPositionX: "45%",
      backgroundPositionY: "30%",
      backgroundSize: "380%"
    }
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageCredit: {
    position: 'absolute',
    bottom: 0,
    textAlign: 'right',
    color: '#fff',
    zIndex: 1,
    '& a': {
      color: theme.palette.grey[600],
      textDecoration: 'none',
      '&:hover':{
        color: theme.palette.grey[400]
      }
    },
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));


export default function Home({ auth }) {

  const imagePath = process.env.PUBLIC_URL + '/images/45587.jpg';

  const images = [
    {
      url: imagePath,
      title: auth.isLoggedIn ? 'Start shopping' : 'Log In',
      width: '100%',
      to: auth.isLoggedIn ? "/shopping" : "/login",
      style: auth.isLoggedIn ? { marginLeft: 240 } : { marginLeft: 0 }
    },
  ];

  const classes = useStyles();

  return (
    <div className={classes.root}>

      <React.Fragment>
        {images.map((image) => (
          <ButtonBase
            component={Link} to={image.to}
            focusRipple
            key={image.title}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width,
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton} style={image.style}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        ))}
        <Col md={12} className={classes.imageCredit}><a target="_blank" rel="noreferrer" href="https://www.freepik.com/free-ai-image/wine-bottle-collection-rustic-winery-table-generated-by-ai_47199406.htm">Image by vecstock on Freepik</a></Col>
      </React.Fragment>

    </div>
  );
}
