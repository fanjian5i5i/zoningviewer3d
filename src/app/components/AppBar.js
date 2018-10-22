import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LayersICon from '@material-ui/icons/Layers';
import LegendICon from '@material-ui/icons/Category';
import Tooltip from '@material-ui/core/Tooltip';
import { MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { showHideLegend,showHideLayers } from '../redux/actions';

const theme = createMuiTheme({
  palette: {
    primary: {
      main:"#003c50"
    },
    secondary: {
      main: '#ff8d60'
    }
  },
});
const styles = theme =>({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});
class MapAppBar extends React.Component {
  state = {
    showLegend:true,
    legendVariant:"secondary",
    layerVariant:"inherit",
  };
  showHideLegend = event =>{
    // console.log(event)var that = this;
      var that = this;
    this.setState({legendVariant:that.state.legendVariant=="inherit"?"secondary":"inherit"})
    this.props.dispatch(showHideLegend());
  }
  showHideLayers = event =>{
    // console.log(event.target.color)
    var that = this;
    this.setState({layerVariant:that.state.layerVariant=="inherit"?"secondary":"inherit"})
    this.props.dispatch(showHideLayers());
  }

   render() {
     const { classes } = this.props;
     return (
       <MuiThemeProvider theme={theme}>
       <div className={classes.root}>
         <AppBar position="static">
           <Toolbar>
             <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
               <MenuIcon />
             </IconButton>
             <Typography variant="title" color="inherit" className={classes.flex}>
               Article 80
             </Typography>

             <Tooltip title="Legend" placement="bottom-end">
               <IconButton
                 className={classes.button}
                 onClick={this.showHideLegend}
                 color={this.state.legendVariant}
               >
                 <LegendICon  />
               </IconButton>
             </Tooltip>
              <Tooltip title="Layers" placement="bottom-end">
                <IconButton
                  className={classes.button}
                  onClick={this.showHideLayers}
                  color={this.state.layerVariant}
                >
                  <LayersICon  />
                </IconButton>
              </Tooltip>

           </Toolbar>
         </AppBar>
       </div>
        </MuiThemeProvider>
     )
   }
}


MapAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  appBarState: state.appBar,
});
export default withStyles(styles)(connect(mapStateToProps)(MapAppBar));
