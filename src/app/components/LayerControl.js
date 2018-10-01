import * as React from 'react';
import { loadModules } from 'react-arcgis';

export default class LayerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LayerList: null
        };
    }

    render() {
        return null;
    }

    componentWillMount() {
        loadModules(["esri/widgets/LayerList",]).then(([ LayerList]) => {


              var layerList = new LayerList({
                  view: this.props.view,

                });
            this.setState({ layerList });

            this.props.view.ui.add(layerList, {
                position: "top-right",
                index: 2
              });
          })
    }

    componentWillUnmount() {
        this.props.view.ui.remove(this.state.layerList);
    }
}
